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

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///backend/users.db'
app.config['SECRET_KEY'] = API_KEY

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  # Make sure this line exists!

    friends = db.relationship('User', secondary='friendship', backref='users', lazy='dynamic')
       
friendship = db.Table('friendship',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id', primary_key=True)),
    db.Column('friend_id', db.Integer, db.ForeignKey('user.id', primary_key=True))
)

def create_db():
    db_path = os.path.join(app.instance_path, 'users.db')
    if not os.path.exists(db_path):
        with app.app_context():
            db.create_all()

create_db()

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask!", "users": ["Alice", "Bob", "Charlie"]})

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = generate_password_hash(request.form['password'])

        if User.query.filter_by(username=username).first():
            return "Username already exists!"

        new_user = User(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()

        if user and check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('dashboard'))
        return "Invalid credentials :("
    return render_template('login.html')

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
    return f"Hello {current_user.username}!"

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
