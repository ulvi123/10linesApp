Robot Parking Backend

        Overview:

The Robot Parking Backend is a FastAPI-based system designed to manage robotic operations for parking lot striping. It enables user authentication, task management, robot control, and parking spot allocation. This backend provides APIs for interacting with robots, managing tasks, and handling user accounts.

         Features:

User Management: Register and authenticate users with secure password hashing.

Task Management: Create, retrieve, and manage tasks for robotic operations.

Robot Control: Monitor and control robot statuses, commands, and movements.

Parking Spot Management: Allocate and manage parking spots for robots.

          Tech Stack: 

Framework: FastAPI

Database: PostgreSQL with SQLAlchemy ORM

Authentication: JWT-based user authentication

Middleware: CORS support for frontend integration

Environment Management: Python-based configurations

        Getting Started

Prerequisites

Ensure the following tools are installed on your machine:

Python 3.10+

PostgreSQL

Virtual Environment Manager (e.g., venv or conda)

Installation

Clone the repository:

git clone https://github.com/ulvi123/10linesApp.git


Set up a virtual environment:

python -m venv env
source env/bin/activate  # On Windows: .\env\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Configure environment variables:
Create a .env file in the root directory and populate it with:

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=ulvi123
DB_NAME=RoboPark

other environment varibales:
SECRET_KEY="BEFOQBFIQWHPIWHF47R4_DDE65775QWQJKBRF47GTQEFFWFW_T578YT5UHUWVOUBWDSFNSNG"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30



Apply database migrations:

alembic upgrade head

Run the application:

uvicorn main:app --reload

The API will be available at http://127.0.0.1:8000.

Database Configuration

Ensure PostgreSQL is running and accessible with the credentials provided in the .env file. Use the following script to create the database:

CREATE DATABASE your_db_name;

API Endpoints

User Management

Register: POST /api/register

Request: { "email": "example@example.com", "password": "securepassword" }

Response: { "email": "example@example.com", "message": "User registered successfully" }

Login: POST /api/login

Request: { "email": "example@example.com", "password": "securepassword" }

Response: { "email": "example@example.com", "access_token": "jwt_token" }

Task Management

Create Task: POST /tasks

Get Task: GET /tasks/{task_id}

List Tasks: GET /tasks

Robot Control

List Robots: GET /robots

Get Robot: GET /robots/{robot_id}

Add Robot: POST /robots

Control Robot: POST /robots/{robot_id}/control

Parking Spot Management

Manage parking spots endpoints (details can be expanded).

Project Structure

project-root/
├── app/
│   ├── database/       # Database configuration
│   ├── models/         # SQLAlchemy models
│   ├── routers/        # API route definitions
│   ├── schemas/        # Pydantic models
│   ├── helperFunctions # Utility functions
├── main.py             # Entry point for the application
├── requirements.txt    # Python dependencies
├── config.py           # Configuration setup

Contributing

Contributions are welcome! 