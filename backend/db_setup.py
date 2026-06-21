import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

db_config = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', '')
}

def setup_database():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        
        # Create Database
        cursor.execute("CREATE DATABASE IF NOT EXISTS virtual_waiter")
        cursor.execute("USE virtual_waiter")
        
        # Drop and recreate tables to ensure clean state
        cursor.execute("SET FOREIGN_KEY_CHECKS = 0")
        cursor.execute("DROP TABLE IF EXISTS order_items")
        cursor.execute("DROP TABLE IF EXISTS menu_items")
        cursor.execute("DROP TABLE IF EXISTS orders")
        cursor.execute("SET FOREIGN_KEY_CHECKS = 1")
        
        # Create Tables
        cursor.execute("""
            CREATE TABLE menu_items (
                id INT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                category VARCHAR(100) NOT NULL,
                sub_category VARCHAR(100),
                price DECIMAL(10, 2) NOT NULL,
                image_url VARCHAR(500),
                description TEXT,
                is_available TINYINT(1) DEFAULT 1
            )
        """)
        
        cursor.execute("""
            CREATE TABLE orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                customer_name VARCHAR(255),
                customer_mobile VARCHAR(20),
                total_amount DECIMAL(10, 2),
                status VARCHAR(50) DEFAULT 'Preparing',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        cursor.execute("""
            CREATE TABLE order_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT,
                menu_item_id INT,
                quantity INT,
                FOREIGN KEY (order_id) REFERENCES orders(id),
                FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
            )
        """)
        
        # Menu Data from MenuSection.jsx
        menu_data = [
            # Chef Signature (101-107)
            (101, "Butter Chicken Masala", "Chef Signature", None, 290.00, "https://masalaandchai.com/wp-content/uploads/2022/03/Butter-Chicken.jpg", "Gourmet rich butter chicken"),
            (102, "Paneer Lababdar", "Chef Signature", None, 280.00, "https://thewhiskaddict.com/wp-content/uploads/2022/06/paneer-recipes.jpg", "Rich paneer in cream gravy"),
            (103, "Dal Bukhara", "Chef Signature", None, 220.00, "https://images.unsplash.com/photo-1546833999-b9f581a1996d", "Slow cooked black lentils"),
            (104, "Hyderabadi Chicken Dum Biryani", "Chef Signature", None, 350.00, "https://images.unsplash.com/photo-1631515243349-e19c9b428d27", "Aromatic chicken biryani"),
            (105, "Dynamite Shrimp", "Chef Signature", None, 420.00, "https://therecipecritic.com/wp-content/uploads/2023/07/dynamite-shrimp-1.jpg", "Spicy batter fried shrimp"),
            (106, "Szechuan Chilli Fish", "Chef Signature", None, 290.00, "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2", "Authentic spicy Szechuan fish"),
            (107, "Peking Duck Rolls", "Chef Signature", None, 320.00, "https://images.unsplash.com/photo-1563379926898-05f4575a45d8", "Classic roasted duck wraps"),

            # Veg Soup (201-206)
            (201, "Tomato Basil Soup", "Veg Soup", None, 110.00, "https://images.unsplash.com/photo-1547592166-23ac45744acd", "Classic tomato soup"),
            (202, "Cream of Mushroom", "Veg Soup", None, 150.00, "https://tse2.mm.bing.net/th/id/OIP.C6d5wOec0xUKASKBhHowrAHaLH", "Rich mushroom cream"),
            (203, "Sweet Corn Veg", "Veg Soup", None, 130.00, None, "Creamy sweet corn"),
            (204, "Hot & Sour Veg", "Veg Soup", None, 130.00, None, "Spicy and tangy"),
            (205, "Spinach & Garlic Soup", "Veg Soup", None, 140.00, None, "Healthy spinach soup"),
            (206, "Pumpkin Ginger Soup", "Veg Soup", None, 120.00, None, "Warm pumpkin soup"),

            # Non-Veg Soup (301-305)
            (301, "Chicken Manchow", "Non-Veg Soup", None, 170.00, "https://tse1.mm.bing.net/th/id/OIP.OIxVKDNd76yv2xCziSYocAHaLG", "Spicy chicken manchow"),
            (302, "Mutton Bone Soup", "Non-Veg Soup", None, 250.00, "https://www.foodfusion.com/wp-content/uploads/2018/12/Mutton-bone-soup-Recipe-by-Food-fusion-3-300x225.jpg", "Rich mutton broth"),
            (303, "Cream of Chicken", "Non-Veg Soup", None, 220.00, "https://tse2.mm.bing.net/th/id/OIP.Sl46qnFLHam6vN6JzfX6ZAHaHa", "Thick chicken cream"),
            (304, "Crab Soup", "Non-Veg Soup", None, 220.00, "https://images.pexels.com/photos/28559504/pexels-photo-28559504.jpeg", "Authentic crab meat soup"),
            (305, "Chicken Lemon Coriander", "Non-Veg Soup", None, 210.00, "https://cdn.grofers.com/assets/search/usecase/banner/chicken_lemon_coriander_soup_01.png", "Zesty chicken soup"),

            # Veg Starter (401-411)
            (401, "Paneer Tikka Royale", "Veg Starter", None, 280.00, "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0", "Grilled paneer"),
            (402, "Crispy Chilly Babycorn", "Veg Starter", None, 190.00, "https://mayurgroup.com/blog/wp-content/uploads/2021/07/CHINESE-CHILLI-BABY-CORN-mayur.jpg", "Fried babycorn"),
            (403, "Gobi Manchurian", "Veg Starter", None, 220.00, "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/gobi-manchurian-cauliflower-manchurian.jpg", "Cauliflower in glaze"),
            (404, "Paneer 65", "Veg Starter", None, 240.00, "https://purendesi.in/wp-content/uploads/2024/07/Paneer-65-recipe-2.jpg", "Spicy paneer fry"),
            (405, "Mushroom Duplex", "Veg Starter", None, 260.00, None, "Stuffed mushrooms"),
            (406, "Dragon Paneer", "Veg Starter", None, 270.00, "https://i.ytimg.com/vi/flLY3YJ_bL0/maxresdefault.jpg", "Spicy dragon style paneer"),
            (407, "Hariyali Paneer Tikka", "Veg Starter", None, 290.00, "https://mykitchendiaries.com/wp-content/uploads/2025/08/Thumbnail.webp", "Green herb paneer"),
            (408, "Dragon Mushroom", "Veg Starter", None, 260.00, "https://www.bitensip.com/wp-content/uploads/2023/11/dragon-mushroom-1024x614.jpg", "Spicy mushroom"),
            (409, "Gobi 65", "Veg Starter", None, 210.00, "https://i0.wp.com/gomathirecipes.com/wp-content/uploads/2022/06/1966.png", "Spicy gobi fry"),
            (410, "Mushroom Tikka", "Veg Starter", None, 270.00, "https://tse1.mm.bing.net/th/id/OIP.XF6IgFzOe4-Jl-OMfmLhrgHaLG", "Grilled mushrooms"),
            (411, "Corn Cheese Ball", "Veg Starter", None, 230.00, "https://www.cookingcarnival.com/wp-content/uploads/2017/08/Cheese-corn-balls-5-1024x1024.jpg", "Cheesy corn balls"),

            # Non-Veg Starter (501-514)
            (501, "Chicken 65 Special", "Non-Veg Starter", None, 260.00, "https://www.shutterstock.com/image-photo/chicken-fry-kebab-kabab-65-600nw-1774422587.jpg", "Spicy fried chicken"),
            (502, "Lemon Garlic Chicken", "Non-Veg Starter", None, 280.00, "https://jamiesitalian.sg/wp-content/uploads/2025/03/italian-chicken-with-garlic-and-lemon-recipe-1742016017.jpeg", "Zesty chicken"),
            (503, "Mutton Seekh Kabab", "Non-Veg Starter", None, 420.00, "https://www.licious.in/blog/wp-content/uploads/2022/11/blog-image-01-1-750x750.jpg", "Minced mutton skewers"),
            (504, "Dragon Chicken", "Non-Veg Starter", None, 270.00, "https://aromaticessence.co/wp-content/uploads/2022/04/dragon_chicken_dry_version_featured.jpg", "Spicy Indo-Chinese"),
            (505, "Thai Basil Chicken", "Non-Veg Starter", None, 280.00, "https://i.pinimg.com/736x/60/08/d2/6008d24dadacf61af607a566f4dff651.jpg", "Basil flavored chicken"),
            (506, "Murg Malai Tikka", "Non-Veg Starter", None, 290.00, "https://tse1.mm.bing.net/th/id/OIP.Ai9Mpm9ORLV9CkrNpMFeBgHaLH", "Creamy chicken tikka"),
            (507, "Mutton Pepper Fry", "Non-Veg Starter", None, 320.00, "https://www.spiceindiaonline.com/wp-content/uploads/2021/09/Mutton-Pepper-Fry-2.jpg", "Spicy mutton pepper"),
            (508, "Crispy Chilli Beef", "Non-Veg Starter", None, 360.00, "https://tse4.mm.bing.net/th/id/OIP.WZa46XsqlhWf6zqXkWhOoAHaHa", "Crispy beef chilli"),
            (509, "Mutton Chukka", "Non-Veg Starter", None, 340.00, "https://www.lekhafoods.com/media/1051277/virudhunagar-mutton-sukka.jpg", "Traditional mutton sukka"),
            (510, "Chicken Manchurian Dry", "Non-Veg Starter", None, 260.00, "https://orders.popskitchen.in/storage/2024/09/image-148.png", "Dry manchurian chicken"),
            (511, "Chicken Lollipop Saucy", "Non-Veg Starter", None, 280.00, "https://th.bing.com/th/id/R.3fbf4ff93fd0d12c1830e7462594efd8", "Saucy chicken lollipop"),
            (512, "Honey Chicken", "Non-Veg Starter", None, 270.00, "https://mydailybites.com/wp-content/uploads/2025/02/number00004_58940_Crispy_Baked_Hot_Honey_Chicken_Amateur_photo__b5a6ac6b-ba4c-4d24-a62a-bd2603f1f17f.png", "Sweet honey chicken"),
            (513, "Chicken Majestic", "Non-Veg Starter", None, 290.00, "https://tse1.mm.bing.net/th/id/OIP.-kw-JG0UFss_dQUK1eJD1gHaLK", "Majestic styled chicken"),
            (514, "Smokey Chicken Cigar", "Non-Veg Starter", None, 280.00, "https://i.ytimg.com/vi/yoETINXpdKw/maxresdefault.jpg", "Smokey chicken rolls"),

            # Sea Food Starter (601-613)
            (601, "Golden Fried Prawns", "Sea Food Starter", None, 380.00, "https://tse2.mm.bing.net/th/id/OIP.UjGueOvPdeuMGQUl7V79pAHaE8", "Crispy fried prawns"),
            (602, "Apollo Fish", "Sea Food Starter", None, 350.00, "https://www.licious.in/blog/wp-content/uploads/2020/12/Hyderabadi-Apollo-Fish-750x750.jpg", "Indo-Chinese fish"),
            (603, "Butter Garlic Prawns", "Sea Food Starter", None, 420.00, "https://www.jocooks.com/wp-content/uploads/2021/09/garlic-butter-shrimp-1-10.jpg", "Garlic butter prawns"),
            (604, "Crispy Calamari Rings", "Sea Food Starter", None, 320.00, "https://nykdaily.com/wp-content/uploads/2021/08/Untitled-design-27-640x640.png", "Fried squid rings"),
            (605, "Tandoori Fish Tikka", "Sea Food Starter", None, 380.00, "https://i0.wp.com/spiceandcolour.com/wp-content/uploads/2020/06/fish-tandoori-1.jpg", "Spicy grilled fish"),
            (606, "Crab meat omlette", "Sea Food Starter", None, 170.00, None, "Fluffy crab omlette"),
            (607, "Crispy Fish Finger", "Sea Food Starter", None, 200.00, None, "Classic fish fingers"),
            (608, "Prawn 65", "Sea Food Starter", None, 310.00, None, "Spicy prawn fry"),
            (609, "Phuket fish", "Sea Food Starter", None, 320.00, None, "Phuket styled fish"),
            (610, "Tandoori Prawn", "Sea Food Starter", None, 350.00, None, "Grilled spicy prawns"),
            (611, "Calamari Pepper Fry (Squid)", "Sea Food Starter", None, 280.00, None, "Pepper fry squid"),
            (612, "Calamari 65 (Squid)", "Sea Food Starter", None, 280.00, None, "Spicy squid fry"),
            (613, "Crab Lollipop", "Sea Food Starter", None, 350.00, None, "Delicious crab lollipop"),

            # Veg Rice (701-711)
            (701, "Veg Fried Rice", "Veg Rice", None, 220.00, "https://enjoyinfourseason.com/wp-content/uploads/2022/05/Fourseason-VEG-FRIED-RICE.jpg", "Classic veg rice"),
            (702, "Schezwan Veg Rice", "Veg Rice", None, 240.00, "https://currytown.ca/wp-content/uploads/2024/04/SchezwanFriedRice5-600x717.jpg", "Spicy veg rice"),
            (703, "Mushroom Fried Rice", "Veg Rice", None, 260.00, "https://i0.wp.com/southindianrecipes.in/wp-content/uploads/2021/06/Mushroom-Fried-Rice.jpg", "Rice with mushrooms"),
            (704, "Jeera Rice", "Veg Rice", None, 180.00, "https://i1.wp.com/vegecravings.com/wp-content/uploads/2017/04/jeera-rice-recipe-step-by-step-instructions.jpg", "Cumin flavored rice"),
            (705, "Schezwan Mushroom Fried Rice", "Veg Rice", None, 260.00, None, "Spicy mushroom rice"),
            (706, "Paneer Fried rice", "Veg Rice", None, 250.00, None, "Rice with paneer"),
            (707, "Schezwan Paneer Fried Rice", "Veg Rice", None, 270.00, None, "Spicy paneer rice"),
            (708, "chilly basil veg fried rice", "Veg Rice", None, 240.00, None, "Basil flavored rice"),
            (709, "Leefu Veg Rice", "Veg Rice", None, 260.00, "https://tse2.mm.bing.net/th/id/OIP.eymlcmZPTwdstQEiyBv1fQHaJs", "Unique leefu veg rice"),
            (710, "Basmati Streamed Rice", "Veg Rice", None, 120.00, None, "Plain steamed rice"),
            (711, "Creamy Curd Rice", "Veg Rice", None, 150.00, None, "Refreshing curd rice"),

            # Non-Veg Rice (801-812)
            (801, "Chicken Fried Rice", "Non-Veg Rice", None, 220.00, "https://www.sharmispassions.com/wp-content/uploads/2018/03/chicken-fried-rice8-360x540.jpg", "Classic chicken rice"),
            (802, "Egg Fried Rice", "Non-Veg Rice", None, 180.00, "https://stretchrecipes.com/wp-content/uploads/2025/01/16.-Indian-Egg-Fried-Rice.jpg", "Rice with egg"),
            (803, "Mixed Meat Fried Rice", "Non-Veg Rice", None, 340.00, "https://yellowchilis.com/wp-content/uploads/2021/01/indo-chinese-schezwan-chicken-fried-rice-recipe-with-vegetables-and-eggs-500x500.jpg", "Chicken and mutton rice"),
            (804, "Schezwan Chicken Rice", "Non-Veg Rice", None, 230.00, "https://img.freepik.com/premium-photo/tasty-schezwan-chicken-fried-rice-with-tomato-sauce-served-white-bowl-rustic-wooden-background_726363-487.jpg", "Spicy chicken rice"),
            (805, "Chilly Basil Chicken Fried Rice", "Non-Veg Rice", None, 240.00, None, "Basil chicken rice"),
            (806, "Prawn fried Rice", "Non-Veg Rice", None, 280.00, None, "Rice with prawns"),
            (807, "Mutton Fried Rice", "Non-Veg Rice", None, 320.00, None, "Rice with mutton"),
            (808, "Singapore Rice", "Non-Veg Rice", None, 260.00, None, "Singapore style rice"),
            (809, "Beef Fried Rice", "Non-Veg Rice", None, 270.00, None, "Rice with beef"),
            (810, "Schezwan Prawn fried Rice", "Non-Veg Rice", None, 300.00, None, "Spicy prawn rice"),
            (811, "Schezwan Mutton Fried Rice", "Non-Veg Rice", None, 340.00, None, "Spicy mutton rice"),
            (812, "Schezwan Beef Fried Rice", "Non-Veg Rice", None, 290.00, None, "Spicy beef rice"),

            # Veg Noodles (901-909)
            (901, "Veg Hakka Noodles", "Veg Noodles", None, 210.00, "https://myfoodstory.com/wp-content/uploads/2021/02/Vegetable-Hakka-Noodles-Restaurant-Style-3-720x720.jpg", "Classic veg noodles"),
            (902, "Veg Schezwan Noodles", "Veg Noodles", None, 230.00, "https://img.freepik.com/premium-photo/schezwan-veg-noodles-popular-indochinese-dish-made-with-noodles-vegetables-schezwan-sauce-served-rustic-wooden-background_726363-1146.jpg", "Spicy veg noodles"),
            (903, "Veg Singapore Noodles", "Veg Noodles", None, 240.00, "https://thewoksoflife.com/wp-content/uploads/2018/09/vegetarian-singapore-noodles-3-340x470.jpg", "Singapore style noodles"),
            (904, "Chilly Basil Veg Noodle", "Veg Noodles", None, 240.00, None, "Basil veg noodles"),
            (905, "Paneer Cube Noodle", "Veg Noodles", None, 260.00, None, "Noodles with paneer"),
            (906, "Mushroom Noodle", "Veg Noodles", None, 250.00, None, "Noodles with mushroom"),
            (907, "Veg Pad Thai Noodle", "Veg Noodles", None, 280.00, None, "Pad Thai style"),
            (908, "Schezwan Paneer Cube Noodle", "Veg Noodles", None, 270.00, None, "Spicy paneer noodles"),
            (909, "Schezwan Mushroom Noodle", "Veg Noodles", None, 260.00, None, "Spicy mushroom noodles"),

            # Non-Veg Noodles (1001-1012)
            (1001, "Chicken Hakka Noodles", "Non-Veg Noodles", None, 280.00, "https://runoflif.com/wp-content/uploads/2025/11/chicken-hakka-noodles-2-1.jpg", "Classic chicken noodles"),
            (1002, "Chicken Schezwan Noodles", "Non-Veg Noodles", None, 300.00, "https://thumbs.dreamstime.com/b/chicken-schezwan-noodles-bowl-wooden-background-279293131.jpg", "Spicy chicken noodles"),
            (1003, "Egg Hakka Noodles", "Non-Veg Noodles", None, 250.00, "https://b2958125.smushcdn.com/2958125/wp-content/uploads/stir-fried-egg-hakka-noodles-1-2.jpg", "Egg noodles"),
            (1004, "Chilly Basil Chicken Noodle", "Non-Veg Noodles", None, 290.00, None, "Basil chicken noodles"),
            (1005, "Prawn Noodle", "Non-Veg Noodles", None, 320.00, None, "Noodles with prawns"),
            (1006, "Schezwan Prawn Noodle", "Non-Veg Noodles", None, 340.00, None, "Spicy prawn noodles"),
            (1007, "Garlic Butter Chicken Noodle", "Non-Veg Noodles", None, 310.00, None, "Garlic butter chicken noodles"),
            (1008, "Mixed Meat Noodle", "Non-Veg Noodles", None, 380.00, None, "Chicken and mutton noodles"),
            (1009, "Beef Noodle", "Non-Veg Noodles", None, 330.00, None, "Noodles with beef"),
            (1010, "Schezwan Beef Noodle", "Non-Veg Noodles", None, 350.00, None, "Spicy beef noodles"),
            (1011, "Mutton Noodle", "Non-Veg Noodles", None, 360.00, None, "Noodles with mutton"),
            (1012, "Butter Chicken Noodle", "Non-Veg Noodles", None, 350.00, None, "Noodles with butter chicken"),

            # Veg Gravy (1101-1110)
            (1101, "Paneer Butter Masala", "Veg Gravy", None, 280.00, "https://tse4.mm.bing.net/th/id/OIP.LRorO9eoX__28SlTrMuizAHaHZ?rs=1&pid=ImgDetMain&o=7&rm=3", "Creamy paneer curry"),
            (1102, "Veg Manchurian Gravy", "Veg Gravy", None, 240.00, "https://media.istockphoto.com/id/1284771656/photo/veg-manchurian-gravy-balls-in-black-bowl-in-dark-slate-table-top-vegetarian-manchurian-is.jpg?s=612x612&w=0&k=20&c=Gxl10HWwnzu7w4ZeCR9x7XkGrFqc0lqdy9JhIGQJ8-E=", "Indo-Chinese gravy"),
            (1103, "Mix Veg Curry", "Veg Gravy", None, 220.00, "https://thechupitosbar.com/wp-content/uploads/2024/04/Indian-vegetable-curry.jpg", "Fresh veg curry"),
            (1104, "Dal Makhani", "Veg Gravy", None, 260.00, "https://myfoodstory.com/wp-content/uploads/2018/08/Dal-Makhani-New-3.jpg", "Slow cooked dal"),
            (1105, "Kadai Vegetable", "Veg Gravy", None, 240.00, "https://x9s2d6a3.rocketcdn.me/wp-content/uploads/2023/04/kadai-vegetable-gravy-1200x1200-1.jpg", "Spicy mixed veg curry"),
            (1106, "Kadai Paneer", "Veg Gravy", None, 270.00, "https://www.cubesnjuliennes.com/wp-content/uploads/2020/03/Best-Kadai-Paneer-Recipe.jpg", "Paneer in kadai masala"),
            (1107, "Paneer Tikka Masala", "Veg Gravy", None, 290.00, "https://tse4.mm.bing.net/th/id/OIP.WgK16QECU-vZ6r44TTerGgHaF4?rs=1&pid=ImgDetMain&o=7&rm=3", "Grilled paneer gravy"),
            (1108, "Dal Thadka", "Veg Gravy", None, 180.00, "https://glebekitchen.com/wp-content/uploads/2019/05/daltadkafrontscene2-836x1024.jpg", "Yellow lentil tempering"),
            (1109, "Kadai Mushroom", "Veg Gravy", None, 260.00, "https://i.pinimg.com/originals/e4/08/0c/e4080cd33a68a0739019523d819ac9b1.jpg", "Mushroom in kadai masala"),
            (1110, "Veg Kofta gravy", "Veg Gravy", None, 250.00, "https://img.freepik.com/premium-photo/plate-food-with-side-food_865967-228788.jpg", "Vegetable dumpling gravy"),

            # Non-Veg Gravy (1201-1216)
            (1201, "Butter Chicken", "Non-Veg Gravy", None, 350.00, None, "Rich chicken curry"),
            (1202, "Chicken Tikka Masala", "Non-Veg Gravy", None, 360.00, "https://images.unsplash.com/photo-1565557623262-b51c2513a641", "Grilled chicken gravy"),
            (1203, "Indo-Chinese Chilli Chicken", "Non-Veg Gravy", None, 320.00, "https://images.unsplash.com/photo-1562967914-608f82629710", "Spicy gravy chicken"),
            (1204, "Mutton Rogan Josh", "Non-Veg Gravy", None, 450.00, "https://images.unsplash.com/photo-1544025162-4467dc00e4cc", "Kashmiri mutton curry"),
            (1205, "Chicken Chettinad", "Non-Veg Gravy", None, 320.00, None, "Spicy South Indian chicken"),
            (1206, "Punjabi Masala", "Non-Veg Gravy", None, 340.00, None, "Punjabi style chicken gravy"),
            (1207, "Chicken Rogan Josh", "Non-Veg Gravy", None, 360.00, None, "Aromatic red chicken curry"),
            (1208, "Kadai chicken", "Non-Veg Gravy", None, 310.00, None, "Chicken in kadai masala"),
            (1209, "Prawn Masala", "Non-Veg Gravy", None, 420.00, None, "Spicy prawn gravy"),
            (1210, "Crab Pepper Masala", "Non-Veg Gravy", None, 450.00, None, "Peppery crab gravy"),
            (1211, "Egg Burji Masala Gravy", "Non-Veg Gravy", None, 240.00, None, "Scrambled egg gravy"),
            (1212, "Hyderabadi Chicken Masala", "Non-Veg Gravy", None, 330.00, None, "Hyderabadi style chicken"),
            (1213, "Pepper Chicken Masala", "Non-Veg Gravy", None, 320.00, None, "Spicy pepper chicken gravy"),
            (1214, "Andra Chicken Masala", "Non-Veg Gravy", None, 320.00, None, "Fiery Andhra chicken"),
            (1215, "Chicken Patiyala", "Non-Veg Gravy", None, 380.00, None, "Royal Patiala style chicken"),
            (1216, "Chicken Mugalai Masala", "Non-Veg Gravy", None, 390.00, None, "Creamy Mughlai chicken"),

            # Biryani (1301-1304)
            (1301, "Hyderabadi Chicken Dum Biryani", "Biryani", None, 350.00, "https://images.unsplash.com/photo-1631515243349-e19c9b428d27", "Spicy chicken biryani"),
            (1302, "Veg Dum Biryani", "Biryani", None, 280.00, "https://images.unsplash.com/photo-1543352658-9bc946b7b951", "Fragrant veg biryani"),
            (1303, "Mutton Dum Biryani", "Biryani", None, 480.00, "https://images.unsplash.com/photo-1633945274405-b6c8069047b0", "Lamb biryani"),
            (1304, "Egg Biryani", "Biryani", None, 260.00, "https://images.unsplash.com/photo-1642821373181-696a408764b8", "Egg biryani"),

            # Pasta (1401-1407)
            (1401, "Penne Arrabbiata", "Pasta", None, 320.00, "https://images.unsplash.com/photo-1563379926898-05f4575a45d8", "Spicy tomato pasta"),
            (1402, "Fettuccine Alfredo", "Pasta", None, 350.00, "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9", "White sauce pasta"),
            (1403, "Basil Pesto Pasta", "Pasta", None, 380.00, "https://images.unsplash.com/photo-1551183053-bf91a1d81141", "Pesto sauce pasta"),
            (1404, "Pink Sauce Pasta", "Pasta", None, 340.00, "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0", "Creamy tomato pasta"),
            (1405, "Spaghetti Carbonara", "Pasta", None, 390.00, "https://images.unsplash.com/photo-1612874742237-6526221588e3", "Classic carbonara"),
            (1406, "Lasagna Classico", "Pasta", None, 450.00, "https://images.unsplash.com/photo-1619895092538-1283417871fa", "Layered pasta"),
            (1407, "Mushroom Ravioli", "Pasta", None, 410.00, "https://images.unsplash.com/photo-1587740908075-9e245070dfaa", "Ravioli with mushroom"),

            # Desserts (1501-1509)
            (1501, "Tiramisu Classic", "Desserts", None, 220.00, "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9", "Italian dessert"),
            (1502, "Saphire Cheesecake", "Desserts", None, 170.00, "https://images.unsplash.com/photo-1533134242443-d4fd215305ad", "Blueberry cheesecake"),
            (1503, "Gulab Jamun with Ice Cream", "Desserts", None, 150.00, "https://images.unsplash.com/photo-1589119908995-c6800ffca83c", "Warm sweets with cold cream"),
            (1504, "Saffron Rasmalai", "Desserts", None, 110.00, None, "Soft saffron patties"),
            (1505, "Belgian Chocolate Mousse", "Desserts", None, 150.00, "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3", "Rich chocolate mousse"),
            (1506, "Choclate Brownie", "Desserts", None, 90.00, "https://images.unsplash.com/photo-1488477181946-6428a0291777", "Fudgy brownie"),
            (1507, "Red Velvet Layer Cake", "Desserts", None, 140.00, "https://images.unsplash.com/photo-1586788680434-30d324631ffc", "Red velvet cake"),
            (1508, "Panna Cotta", "Desserts", None, 180.00, "https://images.unsplash.com/photo-1624353335556-91e860980074", "Creamy custard"),
            (1509, "Blueberry Macarons", "Desserts", None, 120.00, "https://images.unsplash.com/photo-1558961363-fa8fdf82db35", "Almond cookies"),

            # Drinks (1601-1605)
            (1601, "Masala Chai", "Drinks", None, 40.00, "https://foodandroad.com/wp-content/uploads/2021/04/masala-chai-indian-drink-3-500x500.jpg", "Spiced tea"),
            (1602, "Lassi", "Drinks", None, 60.00, "https://www.vegrecipesofindia.com/wp-content/uploads/2021/04/lassi-recipe-1.jpg", "Yogurt drink"),
            (1603, "Roasted Jeera Water", "Drinks", None, 35.00, "https://tse4.mm.bing.net/th/id/OIP.TKVb-oaytndb4u9e3j0XEQHaHa", "Cumin water"),
            (1604, "Indian Filter Coffee", "Drinks", None, 55.00, "https://images.indianexpress.com/2024/03/indian-filter-coffee.jpg", "Strong coffee"),
            (1605, "Masala Lemonade", "Drinks", None, 45.00, "https://th.bing.com/th/id/R.eeaf6be2591597afdd141e88bbbf133f", "Zesty masala lemonade")
        ]
        
        cursor.executemany("INSERT INTO menu_items (id, name, category, sub_category, price, image_url, description) VALUES (%s, %s, %s, %s, %s, %s, %s)", menu_data)
        
        conn.commit()
        print("Database, Tables, and Data synchronized successfully with unique IDs!")
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    setup_database()
