from flask import Blueprint, request, jsonify
import bcrypt
import jwt
import os
from datetime import datetime, timedelta
from database import db

auth_bp = Blueprint('auth', __name__)

def create_token(user_id, email):
    """Create JWT token"""
    payload = {
        'user_id': user_id,
        'email': email,
        'exp': datetime.utcnow() + timedelta(days=7)
    }
    return jwt.encode(payload, os.getenv('JWT_SECRET'), algorithm='HS256')

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['email', 'password', 'confirm_password', 'full_name']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Validate passwords match
        if data['password'] != data['confirm_password']:
            return jsonify({'error': 'Passwords do not match'}), 400
        
        # Check if user already exists
        existing_user = db.execute_query(
            "SELECT id FROM members WHERE email = %s",
            (data['email'],),
            fetch_one=True
        )
        
        if existing_user:
            return jsonify({'error': 'Email already registered'}), 400
        
        # Hash password
        hashed_password = bcrypt.hashpw(
            data['password'].encode('utf-8'),
            bcrypt.gensalt()
        ).decode('utf-8')
        
        # Insert new member
        user_id = db.execute_query(
            """INSERT INTO members 
            (email, password, full_name, created_at) 
            VALUES (%s, %s, %s, NOW())""",
            (data['email'], hashed_password, data['full_name'])
        )
        
        # Create token
        token = create_token(user_id, data['email'])
        
        return jsonify({
            'message': 'Registration successful',
            'token': token,
            'user': {
                'id': user_id,
                'email': data['email'],
                'full_name': data['full_name']
            }
        }), 201
        
    except Exception as e:
        print(f"Registration error: {e}")
        return jsonify({'error': 'Registration failed'}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if 'email' not in data or 'password' not in data:
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Find user
        user = db.execute_query(
            "SELECT * FROM members WHERE email = %s",
            (data['email'],),
            fetch_one=True
        )
        
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Check password
        if not bcrypt.checkpw(
            data['password'].encode('utf-8'),
            user['password'].encode('utf-8')
        ):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Update last login
        db.execute_query(
            "UPDATE members SET last_login = NOW() WHERE id = %s",
            (user['id'],)
        )
        
        # Create token
        token = create_token(user['id'], user['email'])
        
        # Remove password from response
        user.pop('password', None)
        
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': user
        })
        
    except Exception as e:
        print(f"Login error: {e}")
        return jsonify({'error': 'Login failed'}), 500

@auth_bp.route('/verify', methods=['POST'])
def verify_token():
    try:
        auth_header = request.headers.get('Authorization')
        
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Invalid token'}), 401
        
        token = auth_header.split(' ')[1]
        
        # Decode token
        payload = jwt.decode(
            token, 
            os.getenv('JWT_SECRET'), 
            algorithms=['HS256']
        )
        
        # Get user from database
        user = db.execute_query(
            "SELECT id, email, full_name, created_at, last_login FROM members WHERE id = %s",
            (payload['user_id'],),
            fetch_one=True
        )
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({'user': user})
        
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401
    except Exception as e:
        print(f"Token verification error: {e}")
        return jsonify({'error': 'Token verification failed'}), 500