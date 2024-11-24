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

