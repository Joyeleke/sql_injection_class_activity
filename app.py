from flask import Flask, request, jsonify, render_template_string
import sqlite3

app = Flask(__name__)

# Initialize the SQLite database
def init_db():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    """)
    cursor.execute("INSERT OR IGNORE INTO users (id, username, password) VALUES (1, 'admin', 'admin123')")
    conn.commit()
    conn.close()

# Home route serving the login form
@app.route('/', methods=['GET'])
def home():
    form_html = """
    <h1>SQL Injection Demo</h1>
    <p>Try logging in with insecure inputs to see how SQL injection works.</p>
    <form method="POST" action="/login">
        <label>Username:</label>
        <input type="text" name="username" />
        <br>
        <label>Password:</label>
        <input type="text" name="password" />
        <br>
        <button type="submit">Login</button>
    </form>
    """
    return render_template_string(form_html)

# Registration endpoint
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required!"}), 400

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    try:
        # Insert user data without explicit parameterization
        query = f"INSERT INTO users (username, password) VALUES ('{username}', '{password}')"
        cursor.execute(query)
        conn.commit()
        conn.close()
        return jsonify({"message": "User registered successfully!"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Username already exists!"}), 400

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required!"}), 400

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    # Dynamically constructed SQL query based on user input
    query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
    print(f"Executing Query: {query}")  # Log query for debugging

    cursor.execute(query)
    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({"message": f"Welcome {user[1]}!"})
    else:
        return jsonify({"error": "Invalid credentials!"}), 401

if __name__ == '__main__':
    init_db()  # Initialize the database with sample data
    app.run(debug=True, host='0.0.0.0', port=5001)
