import os
from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
from flask_cors import CORS

# Helper classes
from LLM_API import Model
from Locator import get_loc

load_dotenv()
API_KEY = os.getenv("API_KEY")

app = Flask(__name__, template_folder="../frontend")
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(app.instance_path, 'users.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = API_KEY

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

friendship = db.Table('friendship',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id', primary_key=True)),
    db.Column('friend_id', db.Integer, db.ForeignKey('user.id', primary_key=True))
)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  # Make sure this line exists!

    friends = db.relationship(
        'User', 
        secondary='friendship',
        primaryjoin=(id == friendship.c.user_id),
        secondaryjoin=(id == friendship.c.friend_id),
        backref='friend_users', 
        lazy='dynamic'
    )

def create_db():
    db_path = os.path.join(app.instance_path, 'users.db')
    if not os.path.exists(db_path):
        with app.app_context():
            db.create_all()

create_db()

@app.route('/api/data', methods=['GET'])
def get_data():
    # Query all users from the database
    users = User.query.all()
    # Create a list of usernames to return in the response
    usernames = [user.username for user in users]
    return jsonify({"users": usernames})

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    password = generate_password_hash(request.form['password'])

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists!"}), 400

    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!"}), 201


@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        login_user(user)
        return jsonify({"message": "Login successful!"}), 200

    return jsonify({"error": "Invalid credentials"}), 401


@app.route('/friends', methods=['GET', 'POST'])
@login_required
def friends():
    if request.method == 'POST':
        friend_username = request.form['friend_username']
        friend = User.query.filter_by(username=friend_username).first()

        if friend and friend != current_user:
            current_user.friends.append(friend)
            db.session.commit()
            return redirect(url_for('friends'))
        else:
            return "Don't add yourself as a friend, that's lonely."

    friends_list = current_user.friends.all()
    return render_template('friends.html', friends=friends_list)

@app.route('/dashboard')
@login_required
def dashboard():
    return jsonify({"message": f"Hello {current_user.username}!"})

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logout successful!"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
