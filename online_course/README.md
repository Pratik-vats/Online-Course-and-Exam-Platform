# EduExam Platform

EduExam is a modern, full-stack online learning and examination platform. It features role-based access for Students, Teachers, and Administrators, allowing for course management, dynamic exam creation, and automated progress tracking.

The application is built with a **React (Vite)** frontend and a **Spring Boot (Java)** backend, utilizing an **H2 In-Memory Database** for quick and seamless local development without complex database setups.

## Features

- **Role-Based Authentication**: Secure access separation for Students, Teachers, and Admins.
- **Admin Dashboard**: Create, view, and edit courses directly from the dashboard. Changes are persisted via the Spring Boot backend.
- **Teacher Dashboard**: Create dynamic, multiple-choice exams for students. 
- **Student Experience**: Browse and enroll in courses, take interactive exams, and track average scores and completed courses through a personalized dashboard.
- **Full-Stack Architecture**: RESTful API design handling `GET`, `POST`, and `PUT` operations between React and Spring Boot.

## Technologies Used

### Frontend
- **React 18** (via Vite)
- **React Router DOM** for protected routing
- **Vanilla CSS** with a modern, cohesive design system

### Backend
- **Java 17**
- **Spring Boot 3.2.x** (Web, Data JPA)
- **H2 Database** (In-Memory)
- **Maven** for dependency management

---

## Getting Started

To run the full-stack application locally, you will need to start both the Spring Boot backend server and the React frontend development server.

### Prerequisites
Make sure you have the following installed on your system:
- **Node.js** (v18 or higher)
- **Java Development Kit (JDK) 17** or higher
- **Maven** (Optional, as the project includes the Maven Wrapper `mvnw`)

### Step 1: Run the Spring Boot Backend

The backend server must be running for the frontend to fetch courses and save enrollments.

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Start the Spring Boot application using the Maven Wrapper:
   - On **Windows**:
     ```bash
     .\mvnw spring-boot:run
     ```
   - On **Mac/Linux**:
     ```bash
     ./mvnw spring-boot:run
     ```

The backend server will start on `http://localhost:8081`. 
*Note: The H2 database is reset every time the backend is restarted. It is pre-seeded with 3 default courses upon startup.*

### Step 2: Run the React Frontend

Open a **new** terminal window (keep the backend running) and navigate to the root directory of the project:

1. Install the Node dependencies:
   ```bash
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```

The frontend will typically start on `http://localhost:5173` (or `5174` if the port is busy). Open this URL in your browser.

---

## How to Test the Application

Once both servers are running, you can explore the different role workflows:

### 1. Test Admin Capabilities
- Click **Register** in the navbar.
- Create an account and select the **Admin** role.
- Navigate to the **Dashboard**. You will see the default courses fetched from the backend.
- Click **Edit** on any course, change the price or title, and click **Update**. Verify the changes take effect.

### 2. Test Teacher Capabilities
- Register a new account and select the **Teacher** role.
- Navigate to the **Dashboard**. 
- Create a new exam by adding a title, formulating questions, inputting options, and selecting the correct answer. Click **Save Complete Exam**.

### 3. Test Student Capabilities
- Register a new account and select the **Student** role.
- Navigate to **Courses**. Click **Enroll** on any course.
- Navigate to **Exams** and click **Start Exam**. Complete the exam to log your score.
- Return to your **Dashboard** to see your successfully enrolled courses and your calculated average exam score fetched from the backend database.
