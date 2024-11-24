# SQL Injection Class Activity

This repository demonstrates how SQL Injection attacks work, allowing students to understand and exploit common vulnerabilities in web applications. It includes a Python Flask application and a Node.js application, both of which are intentionally vulnerable.

## Project Structure

| File                | Description                                                                                      |
|---------------------|--------------------------------------------------------------------------------------------------|
| `app.py`            | A Flask-based backend application to demonstrate SQL injection attacks with registration and login endpoints. |
| `database.js`       | A Node.js module for initializing an SQLite database, creating a `users` table, and populating initial data. |
| `app.js`            | A Node.js application demonstrating a vulnerable SQL login system using raw SQL queries.        |
| `database.db`       | Pre-populated SQLite database containing sample users for testing.                              |
| `Makefile`          | Commands to simplify setting up and running the Python backend.                                  |

## Features

### Flask Application (`app.py`)
- **Endpoints**:
  - `/register`: Allows users to register new accounts (securely implemented).
  - `/login`: Allows users to log in (vulnerable to SQL injection).
- **Pre-Populated Users**:
  - `admin` / `admin123`
  - `guest` / `guest123`
  - Additional users such as `user1`, `user2`, `hacker`, etc.

### Node.js Application
- **Database Initialization (`database.js`)**:
  - Creates an SQLite database and pre-populates the `users` table.
- **Vulnerable Login System (`app.js`)**:
  - Demonstrates SQL injection attacks using a deliberately insecure query.

## Setup Instructions

### Python Flask Application

