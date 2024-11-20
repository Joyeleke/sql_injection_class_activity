// app.js
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Homepage with login form
app.get("/", (req, res) => {
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

// Insecure Login Endpoint (Vulnerable to SQL Injection)
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Vulnerable SQL Query
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    console.log("Executing Query:", query);

    db.all(query, (err, row) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send("Internal Server Error!");
        }

        if (row) {
            res.send(`Welcome, ${row.username}!`);
        } else {
            res.status(401).send("Invalid credentials!");
        }
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`SQL Injection Demo running on http://localhost:${PORT}`);
});

