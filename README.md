# Vehicle Service Management System

## Description
The Vehicle Service Management System is a full-stack web application designed to streamline the management of vehicle services. The system allows users to perform various operations, such as managing vehicles, handling service complaints, viewing revenue reports, and more. It provides two user roles: **Customer** and **Operations**, ensuring tailored functionalities for each role.

The frontend is built with **React.js**, styled with **CSS**, and includes visualizations using **Recharts**. The backend is developed using **Node.js** and **Express.js**, with **SQL** for the database, and employs **bcrypt.js** for secure password hashing and **JWT tokens** for authentication.

---

## Features
- User authentication with JWT tokens (Login/Signup)
- Role-based access (Customer and Operations)
- Vehicle and component management
- Service complaints tracking and resolution
- Daily revenue visualization
- Secure backend with password encryption
  
---
##Video Links
-
---

## Tech Stack

### Frontend:
- **React.js**
- **CSS** for styling
- **Recharts** for data visualization

### Backend:
- **Node.js** with **Express.js**
- **SQL** for the database
- **bcrypt.js** for password hashing
- **JWT** for authentication

---

## Setup Instructions

### Prerequisites
- **Node.js** (v16+ recommended)
- **npm** or **yarn**
- A running **SQL** database instance (e.g., MySQL, PostgreSQL, etc.)
- API tool like Postman (optional for testing APIs)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
     ```env
     PORT=4000
     DATABASE_URL=<your-database-url>
     JWT_SECRET=<your-jwt-secret>
     ```

4. Start the backend server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:4000`.

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
