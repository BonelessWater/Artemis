import os
from flask import (
    Flask, 
    render_template, 
    redirect, 
    url_for, 
    request, 
    jsonify, 
    send_file, 
    abort
)
from flask_sqlalchemy import SQLAlchemy
from flask_login import (
    LoginManager, 
    UserMixin, 
    login_user, 
    logout_user, 
    login_required, 
    current_user
)
from sqlalchemy.orm import backref
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
from flask_cors import CORS

# Helper classes
from LLM_API import Model
from Locator import get_loc

load_dotenv()
API_KEY = os.getenv("API_KEY")

app = Flask(__name__, template_folder="../frontend")
CORS(app, supports_credentials=True)

# Ensure the instance folder exists
try:
    os.makedirs(app.instance_path, exist_ok=True)
except OSError:
    pass

app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(app.instance_path, 'users.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = API_KEY

db = SQLAlchemy(app)

# Define association tables after initializing db
friendship = db.Table('friendship',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id', primary_key=True)),
    db.Column('friend_id', db.Integer, db.ForeignKey('user.id', primary_key=True))
)

achieved = db.Table('achieved',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id', primary_key=True)),
    db.Column('achievement_id', db.Integer, db.ForeignKey('achievement.id', primary_key=True))
)

# Define your models
class User(UserMixin, db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(300), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    points = db.Column(db.Integer, default=0)

    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

    friends = db.relationship(
        'User', 
        secondary=friendship,
        primaryjoin=(id == friendship.c.user_id),
        secondaryjoin=(id == friendship.c.friend_id),
        backref='friend_users', 
        lazy='dynamic'
    )

    user_achievements = db.relationship(
        'Achievement',
        secondary=achieved,
        backref=db.backref('users', lazy='dynamic'),
        lazy='dynamic'
    )
    
    def is_friend(self, friend):
        return friend in self.friends

    def add_friend(self, friend):
        if not self.is_friend(friend):
            self.friends.append(friend)

class Researcher(UserMixin, db.Model):
    __tablename__ = 'researcher'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(300), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

class Achievement(db.Model):
    __tablename__ = 'achievement'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), unique=True, nullable=False)
    desc = db.Column(db.String(300), unique=True, nullable=False)
    level = db.Column(db.Integer, nullable=False)

# Initialize login manager
#login_manager = LoginManager()
#login_manager.init_app(app)
#login_manager.login_view = 'login'

#@login_manager.user_loader
def load_user(user_id):
    # Try to load a User first; if not found, you might extend this logic
    return User.query.get(int(user_id))

# Create all missing tables. This call is idempotent.
with app.app_context():
    db.create_all()

@app.route('/api/data', methods=['GET'])
def get_data():
    users = User.query.all()
    usernames = [user.username for user in users]
    return jsonify({"users": usernames})

@app.route('/api/friends', methods=['GET', 'POST'])
def friendlist():
    if request.method == 'GET':
        friends_list = current_user.friends.all()
        friends_json = [{"name": friend.username} for friend in friends_list]
        return friends_json

@app.route('/api/leaderboard', methods=['GET'])
def leaderboard():
    users = User.query.order_by(User.points.desc()).all()
    leaderboard = []
    for idx, user in enumerate(users):
        leaderboard.append({
            'rank': idx + 1,
            'name': user.username,
            'score': user.points
        })
    return jsonify(leaderboard)

@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    email = request.form['email']
    password = generate_password_hash(request.form['password'])
    user_type = request.form['user_type']

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists!"}), 400

    if user_type == 'special':
        if not (email.endswith('.edu') or email.endswith('.gov')):
            return jsonify({'message': "Invalid email; must end in .edu or .gov."})
        new_user = Researcher(username=username, email=email, password=password)
    else:
        new_user = User(username=username, email=email, password=password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Registered successfully!"}), 201

#@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        login_user(user)
        return jsonify({"message": "Login successful!"}), 200
    else:
        researcher = Researcher.query.filter_by(username=username).first()
        if researcher and check_password_hash(researcher.password, password):
            login_user(researcher)
            return jsonify({"message": "Login successful!"}), 200

    return jsonify({"error": "Invalid credentials"}), 401

@app.route('/friends', methods=['GET', 'POST'])
#@login_required
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
#@login_required
def dashboard():
    if isinstance(current_user, User):
        return jsonify({"message": f"Hello User: {current_user.username}!"})
    elif isinstance(current_user, Researcher):
        return jsonify({"message": f"Hello Researcher {current_user.username}!"})
    else:
        return jsonify({"message": "Unexpected Error: You are logged in as nothing?"})
    
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logout successful!"})

@app.route('/LLM_chat')
def LLM_Chat():
    prompt = request.args.get("prompt")
    model = Model(wifi=True)
    answer = model.reply(prompt)
    return jsonify(answer)

@app.route('/get_file', methods=['GET'])
def get_file():
    filepath = request.args.get('filepath')
    if not filepath:
        abort(400, "Missing 'filepath' query parameter.")

    file_name = os.path.basename(filepath)
    try:
        return send_file(
            filepath,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=file_name,
            conditional=True
        )
    except Exception as e:
        abort(500, f"Error sending file: {e}")

@app.route('/prep', methods=['GET'])
def prep():
    pass
        
def seed_database():
    with app.app_context():
        db.create_all()  # Ensure tables exist

        # Check if Dom already exists
        if User.query.filter_by(username="Dom").first():
            print("Database already seeded. Skipping.")
            return
        
        # Create Users including Dom
        users_data = [
            {"username": "Alice", "email": "alice@example.com", "points": 500},
            {"username": "Bob", "email": "bob@example.com", "points": 450},
            {"username": "Charlie", "email": "charlie@example.com", "points": 400},
            {"username": "David", "email": "david@example.com", "points": 350},
            {"username": "Eve", "email": "eve@example.com", "points": 300},
            {"username": "Dom", "email": "dom@example.com", "points": 600},  # Added Dom
        ]

        users = []
        for user_data in users_data:
            user = User(
                username=user_data["username"],
                email=user_data["email"],
                password=generate_password_hash("password"),  # Default password
                points=user_data["points"]
            )
            users.append(user)

        # Add users to the database
        db.session.add_all(users)
        db.session.commit()

        # Create a mapping for quick access
        user_dict = {user.username: user for user in User.query.all()}

        # Add Friendships (Bidirectional)
        friendships = [
            ("Alice", "Bob"),
            ("Alice", "Charlie"),
            ("Bob", "David"),
            ("Charlie", "Eve"),
            ("David", "Eve"),
            
            # Dom's 5 Friends
            ("Dom", "Alice"),
            ("Dom", "Bob"),
            ("Dom", "Charlie"),
            ("Dom", "David"),
            ("Dom", "Eve"),
        ]

        for user1_name, user2_name in friendships:
            user1 = user_dict.get(user1_name)
            user2 = user_dict.get(user2_name)

            if user1 and user2:
                if not user1.is_friend(user2):  # Avoid duplicate friendships
                    user1.friends.append(user2)
                if not user2.is_friend(user1):  # Ensure bidirectional friendship
                    user2.friends.append(user1)

        db.session.commit()
        print("Database seeded successfully with users and friendships.")

if __name__ == '__main__':
    # Call the seed function
    seed_database()

    app.run(host='0.0.0.0', port=5000, debug=True)

