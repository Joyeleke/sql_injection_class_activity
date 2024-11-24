// app.js
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Homepage with login form
app.get("/", (req, res) => {
    console.log("[GET /] Serving login form");
    res.send(`
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
    `);
});

// Login endpoint vulnerable to SQL Injection
app.post("/login", (req, res) => {
    console.log("[POST /login] Received login request");
    console.log("[POST /login] Request body:", req.body);
    const { username, password } = req.body;

    // Constructing an SQL query directly using user input (vulnerable to SQL Injection)
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    console.log("[POST /login] Executing Query:", query); // Log query for demonstration purposes

    db.get(query, (err, row) => {
        if (err) {
            console.error("[POST /login] Database error:", err);
            res.status(500).send("An error occurred");
            return;
        }
        if (row) {
            console.log("[POST /login] Login successful for user:", row.username);
            res.send(`Welcome ${row.username}!`);
        } else {
            console.log("[POST /login] Invalid credentials provided");
            res.status(401).send("Invalid credentials!");
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`[LISTEN] Server is running on http://localhost:${PORT}`);
});
