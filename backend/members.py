from flask import Blueprint, request, jsonify
import jwt
import os
from database import db

members_bp = Blueprint('members', __name__)

def verify_auth():
    """Verify JWT token and return user_id"""
    auth_header = request.headers.get('Authorization')
    
    if not auth_header or not auth_header.startswith('Bearer '):
        return None
    
    token = auth_header.split(' ')[1]
    
    try:
        payload = jwt.decode(
            token, 
            os.getenv('JWT_SECRET'), 
            algorithms=['HS256']
        )
        return payload['user_id']
    except:
        return None

@members_bp.route('/profile', methods=['GET'])
def get_profile():
    user_id = verify_auth()
    
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    
    try:
        user = db.execute_query(
            """SELECT id, email, full_name, preferred_name, birthday, 
               street, city, postal_code, cell_number, has_children, 
               email_notifications, created_at, last_login 
               FROM members WHERE id = %s""",
            (user_id,),
            fetch_one=True
        )
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({'user': user})
        
    except Exception as e:
        print(f"Get profile error: {e}")
        return jsonify({'error': 'Failed to get profile'}), 500

@members_bp.route('/update', methods=['PUT'])
def update_profile():
    user_id = verify_auth()
    
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    
    try:
        data = request.get_json()
        
        # Update member information
        db.execute_query(
            """UPDATE members SET 
               full_name = %s,
               preferred_name = %s,
               birthday = %s,
               street = %s,
               city = %s,
               postal_code = %s,
               cell_number = %s,
               has_children = %s,
               email_notifications = %s
               WHERE id = %s""",
            (
                data.get('full_name'),
                data.get('preferred_name'),
                data.get('birthday'),
                data.get('street'),
                data.get('city'),
                data.get('postal_code'),
                data.get('cell_number'),
                data.get('has_children', False),
                data.get('email_notifications', True),
                user_id
            )
        )
        
        # If has children, update children data
        if data.get('has_children') and 'children' in data:
            # Delete existing children
            db.execute_query(
                "DELETE FROM children WHERE member_id = %s",
                (user_id,)
            )
            
            # Insert new children
            for child in data['children']:
                db.execute_query(
                    """INSERT INTO children 
                    (member_id, first_name, last_name, preferred_name, birthday)
                    VALUES (%s, %s, %s, %s, %s)""",
                    (
                        user_id,
                        child.get('first_name'),
                        child.get('last_name'),
                        child.get('preferred_name'),
                        child.get('birthday')
                    )
                )
        
        return jsonify({'message': 'Profile updated successfully'})
        
    except Exception as e:
        print(f"Update profile error: {e}")
        return jsonify({'error': 'Failed to update profile'}), 500

@members_bp.route('/complete-registration', methods=['POST'])
def complete_registration():
    user_id = verify_auth()
    
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    
    try:
        data = request.get_json()
        
        # Update member with all registration details
        db.execute_query(
            """UPDATE members SET 
               preferred_name = %s,
               birthday = %s,
               street = %s,
               city = %s,
               postal_code = %s,
               cell_number = %s,
               has_children = %s,
               email_notifications = %s
               WHERE id = %s""",
            (
                data.get('preferredName'),
                data.get('birthday'),
                data.get('street'),
                data.get('city'),
                data.get('postalCode'),
                data.get('cellNumber'),
                data.get('hasChildren', False),
                data.get('emailNotifications', True),
                user_id
            )
        )
        
        # Record membership payment
        if 'payment' in data:
            payment = data['payment']
            db.execute_query(
                """INSERT INTO membership_payments 
                (member_id, adults_count, youth_count, total_amount, payment_method)
                VALUES (%s, %s, %s, %s, %s)""",
                (
                    user_id,
                    payment.get('adultsCount', 1),
                    payment.get('youthCount', 0),
                    payment.get('totalAmount', 0),
                    payment.get('paymentMethod', 'credit_card')
                )
            )
        
        # Add children if any
        if data.get('hasChildren') and 'children' in data:
            for child in data['children']:
                db.execute_query(
                    """INSERT INTO children 
                    (member_id, first_name, last_name, preferred_name, birthday)
                    VALUES (%s, %s, %s, %s, %s)""",
                    (
                        user_id,
                        child.get('firstName'),
                        child.get('lastName'),
                        child.get('preferredName'),
                        child.get('birthday')
                    )
                )
        
        return jsonify({'message': 'Registration completed successfully'})
        
    except Exception as e:
        print(f"Complete registration error: {e}")
        return jsonify({'error': 'Failed to complete registration'}), 500