# Define variables
PYTHON = python3
APP = app.py

# Default action (runs the app)
run:
	@echo "Running the Flask application..."
	$(PYTHON) $(APP)

# Initialize the database
init_db:
	@echo "Initializing the database..."
	$(PYTHON) -c "from app import init_db; init_db()"
	@echo "Database initialized."

# Clean up temporary files
clean:
	@echo "Cleaning up..."
	rm -f database.db
	@echo "Clean up complete."

# Install dependencies
install:
	@echo "Installing required Python dependencies..."
	$(PYTHON) -m pip install flask
	$(PYTHON) -m pip install sqlalchemy
	$(PYTHON) -m pip install mysql-connector-python
	@echo "Dependencies installed."

# Help menu
help:
	@echo "Makefile commands:"
	@echo "  make run       - Run the Flask application."
	@echo "  make init_db   - Initialize the SQLite database."
	@echo "  make clean     - Remove the SQLite database file."
	@echo "  make install   - Install required Python dependencies."
