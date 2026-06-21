-- Create Database
CREATE DATABASE IF NOT EXISTS virtual_waiter;
USE virtual_waiter;

-- Drop Tables if they exist (to ensure clean slate)
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS menu_items;
DROP TABLE IF EXISTS orders;
SET FOREIGN_KEY_CHECKS = 1;

-- Create menu_items Table
CREATE TABLE menu_items (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    sub_category VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(500),
    description TEXT,
    is_available TINYINT(1) DEFAULT 1
);

-- Create orders Table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255),
    customer_mobile VARCHAR(20),
    total_amount DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'Preparing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items Table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    menu_item_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- Seed Data for menu_items
INSERT INTO menu_items (id, name, category, sub_category, price, image_url, description, is_available) VALUES
-- Chef Signature (101-107)
(101, 'Butter Chicken Masala', 'Chef Signature', NULL, 290.00, 'https://masalaandchai.com/wp-content/uploads/2022/03/Butter-Chicken.jpg', 'Gourmet rich butter chicken', 1),
(102, 'Paneer Lababdar', 'Chef Signature', NULL, 280.00, 'https://thewhiskaddict.com/wp-content/uploads/2022/06/paneer-recipes.jpg', 'Rich paneer in cream gravy', 1),
(103, 'Dal Bukhara', 'Chef Signature', NULL, 220.00, 'https://images.unsplash.com/photo-1546833999-b9f581a1996d', 'Slow cooked black lentils', 1),
(104, 'Hyderabadi Chicken Dum Biryani', 'Chef Signature', NULL, 350.00, 'https://images.unsplash.com/photo-1631515243349-e19c9b428d27', 'Aromatic chicken biryani', 1),
(105, 'Dynamite Shrimp', 'Chef Signature', NULL, 420.00, 'https://therecipecritic.com/wp-content/uploads/2023/07/dynamite-shrimp-1.jpg', 'Spicy batter fried shrimp', 1),
(106, 'Szechuan Chilli Fish', 'Chef Signature', NULL, 290.00, 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2', 'Authentic spicy Szechuan fish', 1),
(107, 'Peking Duck Rolls', 'Chef Signature', NULL, 320.00, 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8', 'Classic roasted duck wraps', 1),

-- Veg Soup (201-206)
(201, 'Tomato Basil Soup', 'Veg Soup', NULL, 110.00, 'https://images.unsplash.com/photo-1547592166-23ac45744acd', 'Classic tomato soup', 1),
(202, 'Cream of Mushroom', 'Veg Soup', NULL, 150.00, 'https://tse2.mm.bing.net/th/id/OIP.C6d5wOec0xUKASKBhHowrAHaLH', 'Rich mushroom cream', 1),
(203, 'Sweet Corn Veg', 'Veg Soup', NULL, 130.00, NULL, 'Creamy sweet corn', 1),
(204, 'Hot & Sour Veg', 'Veg Soup', NULL, 130.00, NULL, 'Spicy and tangy', 1),
(205, 'Spinach & Garlic Soup', 'Veg Soup', NULL, 140.00, NULL, 'Healthy spinach soup', 1),
(206, 'Pumpkin Ginger Soup', 'Veg Soup', NULL, 120.00, NULL, 'Warm pumpkin soup', 1),

-- Non-Veg Soup (301-305)
(301, 'Chicken Manchow', 'Non-Veg Soup', NULL, 170.00, 'https://tse1.mm.bing.net/th/id/OIP.OIxVKDNd76yv2xCziSYocAHaLG', 'Spicy chicken manchow', 1),
(302, 'Mutton Bone Soup', 'Non-Veg Soup', NULL, 250.00, 'https://www.foodfusion.com/wp-content/uploads/2018/12/Mutton-bone-soup-Recipe-by-Food-fusion-3-300x225.jpg', 'Rich mutton broth', 1),
(303, 'Cream of Chicken', 'Non-Veg Soup', NULL, 220.00, 'https://tse2.mm.bing.net/th/id/OIP.Sl46qnFLHam6vN6JzfX6ZAHaHa', 'Thick chicken cream', 1),
(304, 'Crab Soup', 'Non-Veg Soup', NULL, 220.00, 'https://images.pexels.com/photos/28559504/pexels-photo-28559504.jpeg', 'Authentic crab meat soup', 1),
(305, 'Chicken Lemon Coriander', 'Non-Veg Soup', NULL, 210.00, 'https://cdn.grofers.com/assets/search/usecase/banner/chicken_lemon_coriander_soup_01.png', 'Zesty chicken soup', 1),

-- Veg Starter (401-411)
(401, 'Paneer Tikka Royale', 'Veg Starter', NULL, 280.00, 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0', 'Grilled paneer', 1),
(402, 'Crispy Chilly Babycorn', 'Veg Starter', NULL, 190.00, 'https://mayurgroup.com/blog/wp-content/uploads/2021/07/CHINESE-CHILLI-BABY-CORN-mayur.jpg', 'Fried babycorn', 1),
(403, 'Gobi Manchurian', 'Veg Starter', NULL, 220.00, 'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/gobi-manchurian-cauliflower-manchurian.jpg', 'Cauliflower in glaze', 1),
(404, 'Paneer 65', 'Veg Starter', NULL, 240.00, 'https://purendesi.in/wp-content/uploads/2024/07/Paneer-65-recipe-2.jpg', 'Spicy paneer fry', 1),
(405, 'Mushroom Duplex', 'Veg Starter', NULL, 260.00, NULL, 'Stuffed mushrooms', 1),
(406, 'Dragon Paneer', 'Veg Starter', NULL, 270.00, 'https://i.ytimg.com/vi/flLY3YJ_bL0/maxresdefault.jpg', 'Spicy dragon style paneer', 1),
(407, 'Hariyali Paneer Tikka', 'Veg Starter', NULL, 290.00, 'https://mykitchendiaries.com/wp-content/uploads/2025/08/Thumbnail.webp', 'Green herb paneer', 1),
(408, 'Dragon Mushroom', 'Veg Starter', NULL, 260.00, 'https://www.bitensip.com/wp-content/uploads/2023/11/dragon-mushroom-1024x614.jpg', 'Spicy mushroom', 1),
(409, 'Gobi 65', 'Veg Starter', NULL, 210.00, 'https://i0.wp.com/gomathirecipes.com/wp-content/uploads/2022/06/1966.png', 'Spicy gobi fry', 1),
(410, 'Mushroom Tikka', 'Veg Starter', NULL, 270.00, 'https://tse1.mm.bing.net/th/id/OIP.XF6IgFzOe4-Jl-OMfmLhrgHaLG', 'Grilled mushrooms', 1),
(411, 'Corn Cheese Ball', 'Veg Starter', NULL, 230.00, 'https://www.cookingcarnival.com/wp-content/uploads/2017/08/Cheese-corn-balls-5-1024x1024.jpg', 'Cheesy corn balls', 1),

-- Non-Veg Starter (501-514)
(501, 'Chicken 65 Special', 'Non-Veg Starter', NULL, 260.00, 'https://www.shutterstock.com/image-photo/chicken-fry-kebab-kabab-65-600nw-1774422587.jpg', 'Spicy fried chicken', 1),
(502, 'Lemon Garlic Chicken', 'Non-Veg Starter', NULL, 280.00, 'https://jamiesitalian.sg/wp-content/uploads/2025/03/italian-chicken-with-garlic-and-lemon-recipe-1742016017.jpeg', 'Zesty chicken', 1),
(503, 'Mutton Seekh Kabab', 'Non-Veg Starter', NULL, 420.00, 'https://www.licious.in/blog/wp-content/uploads/2022/11/blog-image-01-1-750x750.jpg', 'Minced mutton skewers', 1),
(504, 'Dragon Chicken', 'Non-Veg Starter', NULL, 270.00, 'https://aromaticessence.co/wp-content/uploads/2022/04/dragon_chicken_dry_version_featured.jpg', 'Spicy Indo-Chinese', 1),
(505, 'Thai Basil Chicken', 'Non-Veg Starter', NULL, 280.00, 'https://i.pinimg.com/736x/60/08/d2/6008d24dadacf61af607a566f4dff651.jpg', 'Basil flavored chicken', 1),
(506, 'Murg Malai Tikka', 'Non-Veg Starter', NULL, 290.00, 'https://tse1.mm.bing.net/th/id/OIP.Ai9Mpm9ORLV9CkrNpMFeBgHaLH', 'Creamy chicken tikka', 1),
(507, 'Mutton Pepper Fry', 'Non-Veg Starter', NULL, 320.00, 'https://www.spiceindiaonline.com/wp-content/uploads/2021/09/Mutton-Pepper-Fry-2.jpg', 'Spicy mutton pepper', 1),
(508, 'Crispy Chilli Beef', 'Non-Veg Starter', NULL, 360.00, 'https://tse4.mm.bing.net/th/id/OIP.WZa46XsqlhWf6zqXkWhOoAHaHa', 'Crispy beef chilli', 1),
(509, 'Mutton Chukka', 'Non-Veg Starter', NULL, 340.00, 'https://www.lekhafoods.com/media/1051277/virudhunagar-mutton-sukka.jpg', 'Traditional mutton sukka', 1),
(510, 'Chicken Manchurian Dry', 'Non-Veg Starter', NULL, 260.00, 'https://orders.popskitchen.in/storage/2024/09/image-148.png', 'Dry manchurian chicken', 1),
(511, 'Chicken Lollipop Saucy', 'Non-Veg Starter', NULL, 280.00, 'https://th.bing.com/th/id/R.3fbf4ff93fd0d12c1830e7462594efd8', 'Saucy chicken lollipop', 1),
(512, 'Honey Chicken', 'Non-Veg Starter', NULL, 270.00, 'https://mydailybites.com/wp-content/uploads/2025/02/number00004_58940_Crispy_Baked_Hot_Honey_Chicken_Amateur_photo__b5a6ac6b-ba4c-4d24-a62a-bd2603f1f17f.png', 'Sweet honey chicken', 1),
(513, 'Chicken Majestic', 'Non-Veg Starter', NULL, 290.00, 'https://tse1.mm.bing.net/th/id/OIP.-kw-JG0UFss_dQUK1eJD1gHaLK', 'Majestic styled chicken', 1),
(514, 'Smokey Chicken Cigar', 'Non-Veg Starter', NULL, 280.00, 'https://i.ytimg.com/vi/yoETINXpdKw/maxresdefault.jpg', 'Smokey chicken rolls', 1),

-- Sea Food Starter (601-613)
(601, 'Golden Fried Prawns', 'Sea Food Starter', NULL, 380.00, 'https://tse2.mm.bing.net/th/id/OIP.UjGueOvPdeuMGQUl7V79pAHaE8', 'Crispy fried prawns', 1),
(602, 'Apollo Fish', 'Sea Food Starter', NULL, 350.00, 'https://www.licious.in/blog/wp-content/uploads/2020/12/Hyderabadi-Apollo-Fish-750x750.jpg', 'Indo-Chinese fish', 1),
(603, 'Butter Garlic Prawns', 'Sea Food Starter', NULL, 420.00, 'https://www.jocooks.com/wp-content/uploads/2021/09/garlic-butter-shrimp-1-10.jpg', 'Garlic butter prawns', 1),
(604, 'Crispy Calamari Rings', 'Sea Food Starter', NULL, 320.00, 'https://nykdaily.com/wp-content/uploads/2021/08/Untitled-design-27-640x640.png', 'Fried squid rings', 1),
(605, 'Tandoori Fish Tikka', 'Sea Food Starter', NULL, 380.00, 'https://i0.wp.com/spiceandcolour.com/wp-content/uploads/2020/06/fish-tandoori-1.jpg', 'Spicy grilled fish', 1),
(606, 'Crab meat omlette', 'Sea Food Starter', NULL, 170.00, NULL, 'Fluffy crab omlette', 1),
(607, 'Crispy Fish Finger', 'Sea Food Starter', NULL, 200.00, NULL, 'Classic fish fingers', 1),
(608, 'Prawn 65', 'Sea Food Starter', NULL, 310.00, NULL, 'Spicy prawn fry', 1),
(609, 'Phuket fish', 'Sea Food Starter', NULL, 320.00, NULL, 'Phuket styled fish', 1),
(610, 'Tandoori Prawn', 'Sea Food Starter', NULL, 350.00, NULL, 'Grilled spicy prawns', 1),
(611, 'Calamari Pepper Fry (Squid)', 'Sea Food Starter', NULL, 280.00, NULL, 'Pepper fry squid', 1),
(612, 'Calamari 65 (Squid)', 'Sea Food Starter', NULL, 280.00, NULL, 'Spicy squid fry', 1),
(613, 'Crab Lollipop', 'Sea Food Starter', NULL, 350.00, NULL, 'Delicious crab lollipop', 1),

-- Veg Rice (701-711)
(701, 'Veg Fried Rice', 'Veg Rice', NULL, 220.00, 'https://enjoyinfourseason.com/wp-content/uploads/2022/05/Fourseason-VEG-FRIED-RICE.jpg', 'Classic veg rice', 1),
(702, 'Schezwan Veg Rice', 'Veg Rice', NULL, 240.00, 'https://currytown.ca/wp-content/uploads/2024/04/SchezwanFriedRice5-600x717.jpg', 'Spicy veg rice', 1),
(703, 'Mushroom Fried Rice', 'Veg Rice', NULL, 260.00, 'https://i0.wp.com/southindianrecipes.in/wp-content/uploads/2021/06/Mushroom-Fried-Rice.jpg', 'Rice with mushrooms', 1),
(704, 'Jeera Rice', 'Veg Rice', NULL, 180.00, 'https://i1.wp.com/vegecravings.com/wp-content/uploads/2017/04/jeera-rice-recipe-step-by-step-instructions.jpg', 'Cumin flavored rice', 1),
(705, 'Schezwan Mushroom Fried Rice', 'Veg Rice', NULL, 260.00, NULL, 'Spicy mushroom rice', 1),
(706, 'Paneer Fried rice', 'Veg Rice', NULL, 250.00, NULL, 'Rice with paneer', 1),
(707, 'Schezwan Paneer Fried Rice', 'Veg Rice', NULL, 270.00, NULL, 'Spicy paneer rice', 1),
(708, 'chilly basil veg fried rice', 'Veg Rice', NULL, 240.00, NULL, 'Basil flavored rice', 1),
(709, 'Leefu Veg Rice', 'Veg Rice', NULL, 260.00, 'https://tse2.mm.bing.net/th/id/OIP.eymlcmZPTwdstQEiyBv1fQHaJs', 'Unique leefu veg rice', 1),
(710, 'Basmati Streamed Rice', 'Veg Rice', NULL, 120.00, NULL, 'Plain steamed rice', 1),
(711, 'Creamy Curd Rice', 'Veg Rice', NULL, 150.00, NULL, 'Refreshing curd rice', 1),

-- Non-Veg Rice (801-812)
(801, 'Chicken Fried Rice', 'Non-Veg Rice', NULL, 220.00, 'https://www.sharmispassions.com/wp-content/uploads/2018/03/chicken-fried-rice8-360x540.jpg', 'Classic chicken rice', 1),
(802, 'Egg Fried Rice', 'Non-Veg Rice', NULL, 180.00, 'https://stretchrecipes.com/wp-content/uploads/2025/01/16.-Indian-Egg-Fried-Rice.jpg', 'Rice with egg', 1),
(803, 'Mixed Meat Fried Rice', 'Non-Veg Rice', NULL, 340.00, 'https://yellowchilis.com/wp-content/uploads/2021/01/indo-chinese-schezwan-chicken-fried-rice-recipe-with-vegetables-and-eggs-500x500.jpg', 'Chicken and mutton rice', 1),
(804, 'Schezwan Chicken Rice', 'Non-Veg Rice', NULL, 230.00, 'https://img.freepik.com/premium-photo/tasty-schezwan-chicken-fried-rice-with-tomato-sauce-served-white-bowl-rustic-wooden-background_726363-487.jpg', 'Spicy chicken rice', 1),
(805, 'Chilly Basil Chicken Fried Rice', 'Non-Veg Rice', NULL, 240.00, NULL, 'Basil chicken rice', 1),
(806, 'Prawn fried Rice', 'Non-Veg Rice', NULL, 280.00, NULL, 'Rice with prawns', 1),
(807, 'Mutton Fried Rice', 'Non-Veg Rice', NULL, 320.00, NULL, 'Rice with mutton', 1),
(808, 'Singapore Rice', 'Non-Veg Rice', NULL, 260.00, NULL, 'Singapore style rice', 1),
(809, 'Beef Fried Rice', 'Non-Veg Rice', NULL, 270.00, NULL, 'Rice with beef', 1),
(810, 'Schezwan Prawn fried Rice', 'Non-Veg Rice', NULL, 300.00, NULL, 'Spicy prawn rice', 1),
(811, 'Schezwan Mutton Fried Rice', 'Non-Veg Rice', NULL, 340.00, NULL, 'Spicy mutton rice', 1),
(812, 'Schezwan Beef Fried Rice', 'Non-Veg Rice', NULL, 290.00, NULL, 'Spicy beef rice', 1),

-- Veg Noodles (901-909)
(901, 'Veg Hakka Noodles', 'Veg Noodles', NULL, 210.00, 'https://myfoodstory.com/wp-content/uploads/2021/02/Vegetable-Hakka-Noodles-Restaurant-Style-3-720x720.jpg', 'Classic veg noodles', 1),
(902, 'Veg Schezwan Noodles', 'Veg Noodles', NULL, 230.00, 'https://img.freepik.com/premium-photo/schezwan-veg-noodles-popular-indochinese-dish-made-with-noodles-vegetables-schezwan-sauce-served-rustic-wooden-background_726363-1146.jpg', 'Spicy veg noodles', 1),
(903, 'Veg Singapore Noodles', 'Veg Noodles', NULL, 240.00, 'https://thewoksoflife.com/wp-content/uploads/2018/09/vegetarian-singapore-noodles-3-340x470.jpg', 'Singapore style noodles', 1),
(904, 'Chilly Basil Veg Noodle', 'Veg Noodles', NULL, 240.00, NULL, 'Basil veg noodles', 1),
(905, 'Paneer Cube Noodle', 'Veg Noodles', NULL, 260.00, NULL, 'Noodles with paneer', 1),
(906, 'Mushroom Noodle', 'Veg Noodles', NULL, 250.00, NULL, 'Noodles with mushroom', 1),
(907, 'Veg Pad Thai Noodle', 'Veg Noodles', NULL, 280.00, NULL, 'Pad Thai style', 1),
(908, 'Schezwan Paneer Cube Noodle', 'Veg Noodles', NULL, 270.00, NULL, 'Spicy paneer noodles', 1),
(909, 'Schezwan Mushroom Noodle', 'Veg Noodles', NULL, 260.00, NULL, 'Spicy mushroom noodles', 1),

-- Non-Veg Noodles (1001-1012)
(1001, 'Chicken Hakka Noodles', 'Non-Veg Noodles', NULL, 280.00, 'https://runoflif.com/wp-content/uploads/2025/11/chicken-hakka-noodles-2-1.jpg', 'Classic chicken noodles', 1),
(1002, 'Chicken Schezwan Noodles', 'Non-Veg Noodles', NULL, 300.00, 'https://thumbs.dreamstime.com/b/chicken-schezwan-noodles-bowl-wooden-background-279293131.jpg', 'Spicy chicken noodles', 1),
(1003, 'Egg Hakka Noodles', 'Non-Veg Noodles', NULL, 250.00, 'https://b2958125.smushcdn.com/2958125/wp-content/uploads/stir-fried-egg-hakka-noodles-1-2.jpg', 'Egg noodles', 1),
(1004, 'Chilly Basil Chicken Noodle', 'Non-Veg Noodles', NULL, 290.00, NULL, 'Basil chicken noodles', 1),
(1005, 'Prawn Noodle', 'Non-Veg Noodles', NULL, 320.00, NULL, 'Noodles with prawns', 1),
(1006, 'Schezwan Prawn Noodle', 'Non-Veg Noodles', NULL, 340.00, NULL, 'Spicy prawn noodles', 1),
(1007, 'Garlic Butter Chicken Noodle', 'Non-Veg Noodles', NULL, 310.00, NULL, 'Garlic butter chicken noodles', 1),
(1008, 'Mixed Meat Noodle', 'Non-Veg Noodles', NULL, 380.00, NULL, 'Chicken and mutton noodles', 1),
(1009, 'Beef Noodle', 'Non-Veg Noodles', NULL, 330.00, NULL, 'Noodles with beef', 1),
(1010, 'Schezwan Beef Noodle', 'Non-Veg Noodles', NULL, 350.00, NULL, 'Spicy beef noodles', 1),
(1011, 'Mutton Noodle', 'Non-Veg Noodles', NULL, 360.00, NULL, 'Noodles with mutton', 1),
(1012, 'Butter Chicken Noodle', 'Non-Veg Noodles', NULL, 350.00, NULL, 'Noodles with butter chicken', 1),

-- Veg Gravy (1101-1110)
(1101, 'Paneer Butter Masala', 'Veg Gravy', NULL, 280.00, 'https://tse4.mm.bing.net/th/id/OIP.LRorO9eoX__28SlTrMuizAHaHZ?rs=1&pid=ImgDetMain&o=7&rm=3', 'Creamy paneer curry', 1),
(1102, 'Veg Manchurian Gravy', 'Veg Gravy', NULL, 240.00, 'https://media.istockphoto.com/id/1284771656/photo/veg-manchurian-gravy-balls-in-black-bowl-in-dark-slate-table-top-vegetarian-manchurian-is.jpg?s=612x612&w=0&k=20&c=Gxl10HWwnzu7w4ZeCR9x7XkGrFqc0lqdy9JhIGQJ8-E=', 'Indo-Chinese gravy', 1),
(1103, 'Mix Veg Curry', 'Veg Gravy', NULL, 220.00, 'https://thechupitosbar.com/wp-content/uploads/2024/04/Indian-vegetable-curry.jpg', 'Fresh veg curry', 1),
(1104, 'Dal Makhani', 'Veg Gravy', NULL, 260.00, 'https://myfoodstory.com/wp-content/uploads/2018/08/Dal-Makhani-New-3.jpg', 'Slow cooked dal', 1),
(1105, 'Kadai Vegetable', 'Veg Gravy', NULL, 240.00, 'https://x9s2d6a3.rocketcdn.me/wp-content/uploads/2023/04/kadai-vegetable-gravy-1200x1200-1.jpg', 'Spicy mixed veg curry', 1),
(1106, 'Kadai Paneer', 'Veg Gravy', NULL, 270.00, 'https://www.cubesnjuliennes.com/wp-content/uploads/2020/03/Best-Kadai-Paneer-Recipe.jpg', 'Paneer in kadai masala', 1),
(1107, 'Paneer Tikka Masala', 'Veg Gravy', NULL, 290.00, 'https://tse4.mm.bing.net/th/id/OIP.WgK16QECU-vZ6r44TTerGgHaF4?rs=1&pid=ImgDetMain&o=7&rm=3', 'Grilled paneer gravy', 1),
(1108, 'Dal Thadka', 'Veg Gravy', NULL, 180.00, 'https://glebekitchen.com/wp-content/uploads/2019/05/daltadkafrontscene2-836x1024.jpg', 'Yellow lentil tempering', 1),
(1109, 'Kadai Mushroom', 'Veg Gravy', NULL, 260.00, 'https://i.pinimg.com/originals/e4/08/0c/e4080cd33a68a0739019523d819ac9b1.jpg', 'Mushroom in kadai masala', 1),
(1110, 'Veg Kofta gravy', 'Veg Gravy', NULL, 250.00, 'https://img.freepik.com/premium-photo/plate-food-with-side-food_865967-228788.jpg', 'Vegetable dumpling gravy', 1),

-- Non-Veg Gravy (1201-1216)
(1201, 'Butter Chicken', 'Non-Veg Gravy', NULL, 350.00, NULL, 'Rich chicken curry', 1),
(1202, 'Chicken Tikka Masala', 'Non-Veg Gravy', NULL, 360.00, 'https://images.unsplash.com/photo-1565557623262-b51c2513a641', 'Grilled chicken gravy', 1),
(1203, 'Indo-Chinese Chilli Chicken', 'Non-Veg Gravy', NULL, 320.00, 'https://images.unsplash.com/photo-1562967914-608f82629710', 'Spicy gravy chicken', 1),
(1204, 'Mutton Rogan Josh', 'Non-Veg Gravy', NULL, 450.00, 'https://images.unsplash.com/photo-1544025162-4467dc00e4cc', 'Kashmiri mutton curry', 1),
(1205, 'Chicken Chettinad', 'Non-Veg Gravy', NULL, 320.00, NULL, 'Spicy South Indian chicken', 1),
(1206, 'Punjabi Masala', 'Non-Veg Gravy', NULL, 340.00, NULL, 'Punjabi style chicken gravy', 1),
(1207, 'Chicken Rogan Josh', 'Non-Veg Gravy', NULL, 360.00, NULL, 'Aromatic red chicken curry', 1),
(1208, 'Kadai chicken', 'Non-Veg Gravy', NULL, 310.00, NULL, 'Chicken in kadai masala', 1),
(1209, 'Prawn Masala', 'Non-Veg Gravy', NULL, 420.00, NULL, 'Spicy prawn gravy', 1),
(1210, 'Crab Pepper Masala', 'Non-Veg Gravy', NULL, 450.00, NULL, 'Peppery crab gravy', 1),
(1211, 'Egg Burji Masala Gravy', 'Non-Veg Gravy', NULL, 240.00, NULL, 'Scrambled egg gravy', 1),
(1212, 'Hyderabadi Chicken Masala', 'Non-Veg Gravy', NULL, 330.00, NULL, 'Hyderabadi style chicken', 1),
(1213, 'Pepper Chicken Masala', 'Non-Veg Gravy', NULL, 320.00, NULL, 'Spicy pepper chicken gravy', 1),
(1214, 'Andra Chicken Masala', 'Non-Veg Gravy', NULL, 320.00, NULL, 'Fiery Andhra chicken', 1),
(1215, 'Chicken Patiyala', 'Non-Veg Gravy', NULL, 380.00, NULL, 'Royal Patiala style chicken', 1),
(1216, 'Chicken Mugalai Masala', 'Non-Veg Gravy', NULL, 390.00, NULL, 'Creamy Mughlai chicken', 1),

-- Biryani (1301-1304)
(1301, 'Hyderabadi Chicken Dum Biryani', 'Biryani', NULL, 350.00, 'https://images.unsplash.com/photo-1631515243349-e19c9b428d27', 'Spicy chicken biryani', 1),
(1302, 'Veg Dum Biryani', 'Biryani', NULL, 280.00, 'https://images.unsplash.com/photo-1543352658-9bc946b7b951', 'Fragrant veg biryani', 1),
(1303, 'Mutton Dum Biryani', 'Biryani', NULL, 480.00, 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0', 'Lamb biryani', 1),
(1304, 'Egg Biryani', 'Biryani', NULL, 260.00, 'https://images.unsplash.com/photo-1642821373181-696a408764b8', 'Egg biryani', 1),

-- Pasta (1401-1407)
(1401, 'Penne Arrabbiata', 'Pasta', NULL, 320.00, 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8', 'Spicy tomato pasta', 1),
(1402, 'Fettuccine Alfredo', 'Pasta', NULL, 350.00, 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9', 'White sauce pasta', 1),
(1403, 'Basil Pesto Pasta', 'Pasta', NULL, 380.00, 'https://images.unsplash.com/photo-1551183053-bf91a1d81141', 'Pesto sauce pasta', 1),
(1404, 'Pink Sauce Pasta', 'Pasta', NULL, 340.00, 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0', 'Creamy tomato pasta', 1),
(1405, 'Spaghetti Carbonara', 'Pasta', NULL, 390.00, 'https://images.unsplash.com/photo-1612874742237-6526221588e3', 'Classic carbonara', 1),
(1406, 'Lasagna Classico', 'Pasta', NULL, 450.00, 'https://images.unsplash.com/photo-1619895092538-1283417871fa', 'Layered pasta', 1),
(1407, 'Mushroom Ravioli', 'Pasta', NULL, 410.00, 'https://images.unsplash.com/photo-1587740908075-9e245070dfaa', 'Ravioli with mushroom', 1),

-- Desserts (1501-1509)
(1501, 'Tiramisu Classic', 'Desserts', NULL, 220.00, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9', 'Italian dessert', 1),
(1502, 'Saphire Cheesecake', 'Desserts', NULL, 170.00, 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad', 'Blueberry cheesecake', 1),
(1503, 'Gulab Jamun with Ice Cream', 'Desserts', NULL, 150.00, 'https://images.unsplash.com/photo-1589119908995-c6800ffca83c', 'Warm sweets with cold cream', 1),
(1504, 'Saffron Rasmalai', 'Desserts', NULL, 110.00, NULL, 'Soft saffron patties', 1),
(1505, 'Belgian Chocolate Mousse', 'Desserts', NULL, 150.00, 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3', 'Rich chocolate mousse', 1),
(1506, 'Choclate Brownie', 'Desserts', NULL, 90.00, 'https://images.unsplash.com/photo-1488477181946-6428a0291777', 'Fudgy brownie', 1),
(1507, 'Red Velvet Layer Cake', 'Desserts', NULL, 140.00, 'https://images.unsplash.com/photo-1586788680434-30d324631ffc', 'Red velvet cake', 1),
(1508, 'Panna Cotta', 'Desserts', NULL, 180.00, 'https://images.unsplash.com/photo-1624353335556-91e860980074', 'Creamy custard', 1),
(1509, 'Blueberry Macarons', 'Desserts', NULL, 120.00, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35', 'Almond cookies', 1),

-- Drinks (1601-1605)
(1601, 'Masala Chai', 'Drinks', NULL, 40.00, 'https://foodandroad.com/wp-content/uploads/2021/04/masala-chai-indian-drink-3-500x500.jpg', 'Spiced tea', 1),
(1602, 'Lassi', 'Drinks', NULL, 60.00, 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/04/lassi-recipe-1.jpg', 'Yogurt drink', 1),
(1603, 'Roasted Jeera Water', 'Drinks', NULL, 35.00, 'https://tse4.mm.bing.net/th/id/OIP.TKVb-oaytndb4u9e3j0XEQHaHa', 'Cumin water', 1),
(1604, 'Indian Filter Coffee', 'Drinks', NULL, 55.00, 'https://images.indianexpress.com/2024/03/indian-filter-coffee.jpg', 'Strong coffee', 1),
(1605, 'Masala Lemonade', 'Drinks', NULL, 45.00, 'https://th.bing.com/th/id/R.eeaf6be2591597afdd141e88bbbf133f', 'Zesty masala lemonade', 1);
