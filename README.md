# Vehicle Service Management System

## Description
The Vehicle Service Management System is a full-stack web application designed to streamline the management of vehicle services. The system allows users to perform various operations, such as managing vehicles, handling service complaints, viewing revenue reports, and more. It provides two user roles: **Customer** and **Operations**, ensuring tailored functionalities for each role.

---

## Features
- User authentication (Django's built-in authentication system)
- Role-based access (Customer and Operations)
- Vehicle and component management
- Service complaints tracking and resolution
- Daily revenue visualization
- Secure backend using Django with MySQL

---

## Tech Stack

### Frontend:
- **React.js**
- **CSS** for styling
- **Recharts** for data visualization

### Backend:
- **Django** with **MySQL**
- **Django Rest Framework** for API handling

---

## Setup Instructions

### Prerequisites
- **Python 3.8+** (or any compatible version)
- **MySQL** (running database instance)
- **pip** (for managing Python packages)
- **Node.js** (v16+ recommended for the frontend)

---

### Backend Setup (Django)

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend


2. Set up a virtual environment (if using venv):
   ```python -m venv venv
   source venv/bin/activate 
   ```

3. Install backend dependencies:
     ```pip install -r requirements.txt
     ```

4. Configure the MySQL database:
 - Make sure you have a MySQL instance running.
 - Create a database for the project (e.g., vsms_db).
 - In backend/settings.py, configure your database settings:
   ```DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'vsms_db',
        'USER': 'your_mysql_user',
        'PASSWORD': 'your_mysql_password',
        'HOST': 'localhost',  # Or the IP address of your MySQL server
        'PORT': '3306',
      }
   }
   ```
5. Run migrations to set up the database schema:
   ```python manage.py makemigrations
   python manage.py migrate
   python manage.py runserver
   ```

   The backend will run on `http://localhost:8000` use any client(Postman, ThunderClient) to test the apis.

---

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `frontend` directory.
   - Add the following variable:
     ```env
     BASE_URL=http://localhost:4000
     ```

4. Start the frontend server:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

---

## Future Enhancements
- Add advanced search and filtering for vehicles and complaints
- Include an admin dashboard for better system monitoring
- Support for multiple languages

---

## Contributions
Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss the proposed changes.

---

## Author
Developed by Chiefx18.
