import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

db_config = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', ''),
    'database': os.getenv('DB_NAME', 'virtual_waiter')
}

try:
    conn = mysql.connector.connect(**db_config)
    print("SUCCESS: Connected to MySQL")
    conn.close()
except Exception as e:
    print(f"FAILED: {e}")
