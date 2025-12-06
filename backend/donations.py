from flask import Blueprint, request, jsonify
import jwt
import os
from database import db

donations_bp = Blueprint('donations', __name__)

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

@donations_bp.route('/create', methods=['POST'])
def create_donation():
    user_id = verify_auth()
    
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    
    try:
        data = request.get_json()
        
        # Validate required fields
        if 'amount' not in data or float(data['amount']) <= 0:
            return jsonify({'error': 'Valid amount is required'}), 400
        
        # Insert donation
        donation_id = db.execute_query(
            """INSERT INTO donations 
            (member_id, amount, payment_method, notes, is_recurring, status)
            VALUES (%s, %s, %s, %s, %s, 'completed')""",
            (
                user_id,
                float(data['amount']),
                data.get('payment_method', 'credit_card'),
                data.get('notes', ''),
                data.get('is_recurring', False)
            )
        )
        
        # Get the created donation
        donation = db.execute_query(
            """SELECT * FROM donations WHERE id = %s""",
            (donation_id,),
            fetch_one=True
        )
        
        return jsonify({
            'message': 'Donation recorded successfully',
            'donation': donation
        }), 201
        
    except Exception as e:
        print(f"Create donation error: {e}")
        return jsonify({'error': 'Failed to record donation'}), 500

@donations_bp.route('/history', methods=['GET'])
def get_donation_history():
    user_id = verify_auth()
    
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    
    try:
        donations = db.execute_query(
            """SELECT * FROM donations 
            WHERE member_id = %s 
            ORDER BY donation_date DESC""",
            (user_id,),
            fetch_all=True
        )
        
        return jsonify({'donations': donations})
        
    except Exception as e:
        print(f"Get donation history error: {e}")
        return jsonify({'error': 'Failed to get donation history'}), 500

@donations_bp.route('/stats', methods=['GET'])
def get_donation_stats():
    user_id = verify_auth()
    
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    
    try:
        # Get total donations
        total_result = db.execute_query(
            "SELECT SUM(amount) as total FROM donations WHERE member_id = %s",
            (user_id,),
            fetch_one=True
        )
        
        # Get donation count
        count_result = db.execute_query(
            "SELECT COUNT(*) as count FROM donations WHERE member_id = %s",
            (user_id,),
            fetch_one=True
        )
        
        # Get recent donations
        recent_donations = db.execute_query(
            """SELECT * FROM donations 
            WHERE member_id = %s 
            ORDER BY donation_date DESC 
            LIMIT 5""",
            (user_id,),
            fetch_all=True
        )
        
        return jsonify({
            'total_donations': float(total_result['total'] or 0),
            'donation_count': count_result['count'],
            'recent_donations': recent_donations
        })
        
    except Exception as e:
        print(f"Get donation stats error: {e}")
        return jsonify({'error': 'Failed to get donation stats'}), 500