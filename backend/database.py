import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

class Database:
    def __init__(self):
        self.host = os.getenv('DB_HOST')
        self.user = os.getenv('DB_USER')
        self.password = os.getenv('DB_PASSWORD')
        self.database = os.getenv('DB_NAME')
        self.connection = None
    
    def connect(self):
        """Create database connection"""
        try:
            self.connection = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database
            )
            return self.connection
        except mysql.connector.Error as err:
            print(f"Database connection error: {err}")
            return None
    
    def close(self):
        """Close database connection"""
        if self.connection:
            self.connection.close()
    
    def execute_query(self, query, params=None, fetch_one=False, fetch_all=False):
        """Execute SQL query"""
        cursor = None
        try:
            if not self.connection or not self.connection.is_connected():
                self.connect()
            
            cursor = self.connection.cursor(dictionary=True)
            cursor.execute(query, params or ())
            
            if fetch_one:
                result = cursor.fetchone()
            elif fetch_all:
                result = cursor.fetchall()
            else:
                self.connection.commit()
                result = cursor.lastrowid
            
            cursor.close()
            return result
            
        except mysql.connector.Error as err:
            print(f"Query error: {err}")
            if cursor:
                cursor.close()
            raise err
    
    def setup_database(self):
        """Create tables if they don't exist"""
        try:
            # Connect without specifying database first
            conn = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password
            )
            cursor = conn.cursor()
            
            # Create database if it doesn't exist
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {self.database}")
            cursor.execute(f"USE {self.database}")
            
            # Create members table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS members (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    full_name VARCHAR(255) NOT NULL,
                    preferred_name VARCHAR(255),
                    birthday DATE,
                    street VARCHAR(255),
                    city VARCHAR(255),
                    postal_code VARCHAR(20),
                    cell_number VARCHAR(20),
                    has_children BOOLEAN DEFAULT FALSE,
                    email_notifications BOOLEAN DEFAULT TRUE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    last_login TIMESTAMP NULL
                )
            """)
            
            # Create children table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS children (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    member_id INT NOT NULL,
                    first_name VARCHAR(255) NOT NULL,
                    last_name VARCHAR(255) NOT NULL,
                    preferred_name VARCHAR(255),
                    birthday DATE,
                    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
                )
            """)
            
            # Create donations table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS donations (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    member_id INT NOT NULL,
                    amount DECIMAL(10, 2) NOT NULL,
                    payment_method VARCHAR(50),
                    notes TEXT,
                    is_recurring BOOLEAN DEFAULT FALSE,
                    status ENUM('pending', 'completed', 'failed') DEFAULT 'completed',
                    donation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
                )
            """)
            
            # Create membership_payments table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS membership_payments (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    member_id INT NOT NULL,
                    adults_count INT DEFAULT 1,
                    youth_count INT DEFAULT 0,
                    total_amount DECIMAL(10, 2) NOT NULL,
                    payment_method VARCHAR(50),
                    status ENUM('pending', 'completed', 'failed') DEFAULT 'completed',
                    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
                )
            """)
            
            conn.commit()
            cursor.close()
            conn.close()
            
            print("✅ Database setup completed successfully!")
            
        except mysql.connector.Error as err:
            print(f"❌ Database setup error: {err}")

# Create global database instance
db = Database()