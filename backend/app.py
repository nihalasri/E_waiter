from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database Configuration
db_config = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', ''),
    'database': os.getenv('DB_NAME', 'virtual_waiter')
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

@app.route('/api/menu', methods=['GET'])
def get_menu():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM menu_items")
        items = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(items)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/order', methods=['POST'])
def place_order():
    try:
        data = request.json
        customer_name = data.get('name')
        customer_mobile = data.get('mobile')
        items = data.get('items') # List of {id, quantity}
        
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Get item prices to calculate total
        total_amount = 0
        for item in items:
            cursor.execute("SELECT price FROM menu_items WHERE id = %s", (item['id'],))
            menu_item = cursor.fetchone()
            if menu_item:
                total_amount += menu_item['price'] * item['quantity']
        
        # Insert customer/order
        cursor.execute("INSERT INTO orders (customer_name, customer_mobile, total_amount, status) VALUES (%s, %s, %s, %s)", 
                       (customer_name, customer_mobile, total_amount, 'Preparing'))
        order_id = cursor.lastrowid
        
        # Insert order items
        for item in items:
            cursor.execute("INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES (%s, %s, %s)",
                           (order_id, item['id'], item['quantity']))
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({"message": "Order placed successfully", "order_id": order_id, "prep_time": "15-20 mins", "total": total_amount})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/order/status/<int:order_id>', methods=['GET'])
def get_order_status(order_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT status, TIMESTAMPDIFF(SECOND, created_at, NOW()) as time_elapsed FROM orders WHERE id = %s", (order_id,))
        order = cursor.fetchone()
        cursor.close()
        conn.close()
        
        if not order:
            return jsonify({"error": "Order not found"}), 404
            
        remaining_cancel_time = max(0, 60 - order['time_elapsed'])
        return jsonify({
            "order_id": order_id,
            "status": order['status'],
            "remaining_cancel_time": remaining_cancel_time
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/order/cancel', methods=['POST'])
def cancel_order():
    try:
        data = request.json
        order_id = data.get('order_id')
        
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Check if the order exists and its status
        cursor.execute("SELECT status, TIMESTAMPDIFF(SECOND, created_at, NOW()) as time_elapsed FROM orders WHERE id = %s", (order_id,))
        order = cursor.fetchone()
        
        if not order:
            return jsonify({"error": "Order not found"}), 404
            
        if order['status'] == 'Cancelled':
            return jsonify({"error": "Order is already cancelled"}), 400
            
        if order['time_elapsed'] > 60:
            return jsonify({"error": "Order cancellation period (1 minute) has expired"}), 400
            
        # Update status to Cancelled
        cursor.execute("UPDATE orders SET status = 'Cancelled' WHERE id = %s", (order_id,))
        conn.commit()
        
        cursor.close()
        conn.close()
        
        return jsonify({"message": "Order cancelled successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/admin/orders', methods=['GET'])
def get_all_orders():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        # Fetch all orders ordered by newest first
        cursor.execute("SELECT id, customer_name, customer_mobile, total_amount, status, created_at FROM orders ORDER BY created_at DESC")
        orders = cursor.fetchall()
        
        # For each order, fetch items
        for order in orders:
            cursor.execute("""
                SELECT oi.quantity, mi.name, mi.price
                FROM order_items oi
                JOIN menu_items mi ON oi.menu_item_id = mi.id
                WHERE oi.order_id = %s
            """, (order['id'],))
            order['items'] = cursor.fetchall()
            
        cursor.close()
        conn.close()
        return jsonify(orders)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/admin/order/<int:order_id>/status', methods=['PUT'])
def update_order_status(order_id):
    try:
        data = request.json
        new_status = data.get('status')
        if not new_status:
            return jsonify({"error": "Status is required"}), 400
            
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("UPDATE orders SET status = %s WHERE id = %s", (new_status, order_id))
        conn.commit()
        
        cursor.close()
        conn.close()
        
        return jsonify({"message": "Status updated successfully", "status": new_status})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/admin/users', methods=['GET'])
def get_all_users():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('''
            SELECT customer_name as name, customer_mobile as mobile, 
                   COUNT(id) as total_orders, SUM(total_amount) as total_spent,
                   MAX(created_at) as last_order_date
            FROM orders 
            WHERE customer_mobile IS NOT NULL AND customer_mobile != ''
            GROUP BY customer_mobile, customer_name
            ORDER BY last_order_date DESC
        ''')
        users = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(users)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/admin/menu/<int:item_id>/availability', methods=['PUT'])
def update_item_availability(item_id):
    try:
        data = request.json
        is_available = data.get('is_available')
        
        if is_available is None:
            return jsonify({"error": "is_available is required"}), 400
            
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("UPDATE menu_items SET is_available = %s WHERE id = %s", (is_available, item_id))
        conn.commit()
        
        cursor.close()
        conn.close()
        
        return jsonify({"message": "Availability updated successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/admin/menu', methods=['POST'])
def add_menu_item():
    try:
        name = request.form.get('name')
        category = request.form.get('category')
        price = request.form.get('price')
        description = request.form.get('description', '')
        image_url = request.form.get('image_url', '')
        
        if not name or not category or not price:
            return jsonify({"error": "Name, category, and price are required"}), 400
            
        # Check if file was uploaded
        uploaded_file = request.files.get('image_file')
        if uploaded_file and uploaded_file.filename != '':
            import uuid
            upload_dir = os.path.join(app.root_path, 'static', 'uploads')
            os.makedirs(upload_dir, exist_ok=True)
            
            _, ext = os.path.splitext(uploaded_file.filename)
            filename = f"{uuid.uuid4().hex}{ext}"
            file_path = os.path.join(upload_dir, filename)
            uploaded_file.save(file_path)
            
            # Construct the absolute URL path
            image_url = f"{request.host_url}static/uploads/{filename}"
            
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Generate new unique ID
        cursor.execute("SELECT MAX(id) FROM menu_items")
        max_id = cursor.fetchone()[0]
        new_id = (max_id or 0) + 1
        
        cursor.execute(
            "INSERT INTO menu_items (id, name, category, price, image_url, description, is_available) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            (new_id, name, category, price, image_url, description, 1)
        )
        conn.commit()
        
        cursor.close()
        conn.close()
        
        return jsonify({
            "message": "Menu item added successfully",
            "item": {
                "id": new_id,
                "name": name,
                "category": category,
                "price": float(price),
                "image_url": image_url,
                "description": description,
                "is_available": True
            }
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

