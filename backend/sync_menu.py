import re
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv('d:/MCA/virtual-waiter/backend/.env')

db_config = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', ''),
    'database': 'virtual_waiter'
}

with open('d:/MCA/virtual-waiter/frontend-react/src/components/MenuSection.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

match = re.search(r'const MOCK_ITEMS = \[(.*?)\];', text, re.DOTALL)
if not match:
    print('No MOCK_ITEMS found')
    exit()

mock_items_text = match.group(1)

items = []
# Find all { id: ..., name: "...", category: "...", price: ... }
for obj in re.finditer(r'\{\s*id:\s*(\d+),\s*name:\s*\"([^\"]+)\",\s*category:\s*\"([^\"]+)\",\s*price:\s*(\d+).*?\}', mock_items_text):
    iid = int(obj.group(1))
    name = obj.group(2)
    cat = obj.group(3)
    price = float(obj.group(4))
    items.append((iid, name, cat, None, price, None, name))

try:
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute('SET FOREIGN_KEY_CHECKS = 0')
    cursor.execute('TRUNCATE TABLE menu_items')
    cursor.executemany('INSERT INTO menu_items (id, name, category, sub_category, price, image_url, description) VALUES (%s, %s, %s, %s, %s, %s, %s)', items)
    conn.commit()
    print(f'Successfully synced {cursor.rowcount} items to db!')
    cursor.execute('SET FOREIGN_KEY_CHECKS = 1')
    cursor.close()
    conn.close()
except Exception as e:
    print('DB Error:', e)
