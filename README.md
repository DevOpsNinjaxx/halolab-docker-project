# Blog-Post-Comment-app

This project consists of three parts:
1. Django "posts" application
2. Django "comments" application
3. React "frontend" application

## Prerequisites

Before getting started, ensure you have the following prerequisites:

- Python (3.6+)
- Node.js and npm (for the frontend)
- [Django](https://www.djangoproject.com/)
- [React](https://reactjs.org/)

## Clone the Repository

```bash
git clone https://github.com/Fouty7/Blog-Post-Comment-app.git
cd Blog-Post-Comment-app

```
Note: Make sure all servers are running in sepeerate terminal

## Setting up the Django "posts" Application

```bash
cd posts
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

```

## Setting up the Django "comments" Application

```bash
cd comments

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8001


```

## Setting up the React "frontend" Application

```bash
cd frontend
npm install
npm start

```

This README provides instructions for setting up and running the three parts of your project locally.