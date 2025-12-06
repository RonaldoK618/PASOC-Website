from flask import Flask, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# App configuration
app.config['SECRET_KEY'] = os.getenv('JWT_SECRET', 'fallback-secret-key')
app.config['DEBUG'] = os.getenv('FLASK_DEBUG', 'true').lower() == 'true'

# Import and register blueprints
try:
    from auth import auth_bp
    from members import members_bp
    from donations import donations_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(members_bp, url_prefix='/api/members')
    app.register_blueprint(donations_bp, url_prefix='/api/donations')
    
    print("✅ Blueprints registered successfully")
    
except ImportError as e:
    print(f"❌ Error importing blueprints: {e}")

# Root endpoint
@app.route('/')
def home():
    return jsonify({
        'message': 'PASOC API Server',
        'version': '1.0',
        'endpoints': {
            'auth': '/api/auth/',
            'members': '/api/members/',
            'donations': '/api/donations/'
        }
    })

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'PASOC API is running'})

# 404 handler
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

if __name__ == '__main__':
    # Setup database on startup
    try:
        from database import db
        db.setup_database()
        print("✅ Database setup completed")
    except Exception as e:
        print(f"⚠️  Database setup warning: {e}")
    
    # Run Flask app
    print("🚀 Starting Flask server on http://127.0.0.1:5000")
    print("📚 API Documentation:")
    print("   • POST   /api/auth/register     - Register new user")
    print("   • POST   /api/auth/login        - Login user")
    print("   • POST   /api/auth/verify       - Verify token")
    print("   • GET    /api/members/profile   - Get user profile")
    print("   • POST   /api/donations/create  - Create donation")
    print("   • GET    /api/donations/history - Get donation history")
    
    app.run(debug=app.config['DEBUG'], host='127.0.0.1', port=5000)