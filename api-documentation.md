# API Documentation

This documentation provides details on the available RESTful API endpoints for the University Management System.
All API responses follow a consistent JSON structure.
Base URL: `/api/v1`

## Standard Response Format
**Success Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation Error",
  "errorSources": [ ... ],
  "stack": "..."
}
```

---

## 1. Authentication & Users

### 1.1 Create User
- **Route:** `POST /users/create-user`
- **Description:** Registers a new user and automatically creates their associated profile (Student, Instructor, or Admin) based on their role.
- **Request Body:**
  ```json
  {
    "email": "student@example.com",
    "password": "securepassword",
    "role": "STUDENT",
    "name": "John Doe",
    "departmentId": "uuid-optional-for-student-instructor"
  }
  ```
  *(Note: `role` must be one of `STUDENT`, `INSTRUCTOR`, `ADMIN`)*
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "User created successfully",
    "data": {
      "id": "uuid",
      "email": "student@example.com",
      "role": "STUDENT",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

### 1.2 User Registration
- **Route:** `POST /auth/register`
- **Description:** Registers a new user. Similar to create user but publicly accessible.
- **Request Body:**
  ```json
  {
    "email": "student@example.com",
    "password": "securepassword",
    "role": "STUDENT",
    "name": "John Doe",
    "departmentId": "uuid-optional"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "User registered successfully",
    "data": { ... }
  }
  ```

### 1.3 User Login
- **Route:** `POST /auth/login`
- **Description:** Authenticates a user and issues a JWT access token and refresh token.
- **Request Body:**
  ```json
  {
    "email": "student@example.com",
    "password": "securepassword"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User logged in successfully",
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```
  *Note: `refreshToken` is set as an HTTP-only cookie.*

### 1.4 Refresh Token
- **Route:** `POST /auth/refresh-token`
- **Description:** Retrieves a new access token using a refresh token from cookies.
- **Request (Cookies):**
  `refreshToken=eyJhbGci...`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Access token retrieved successfully",
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

### 1.5 Social Login
- **Route:** `POST /auth/social-login`
- **Description:** Authenticates a user via Google OAuth using an ID token. Registers them automatically if they do not exist.
- **Request Body:**
  ```json
  {
    "idToken": "eyJhbGciOiJSUzI1NiIs..."
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User logged in successfully via Google",
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

---

## 2. Departments

### 2.1 Create Department
- **Route:** `POST /departments/`
- **Description:** Creates a new academic department.
- **Request Body:**
  ```json
  {
    "name": "Computer Science and Engineering"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Department created successfully",
    "data": {
      "id": "uuid",
      "name": "Computer Science and Engineering"
    }
  }
  ```

### 2.2 Get All Departments
- **Route:** `GET /departments/`
- **Description:** Retrieves all academic departments.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Departments fetched successfully",
    "data": [
      {
        "id": "uuid",
        "name": "Computer Science and Engineering"
      }
    ]
  }
  ```

---

## 3. Programs

### 3.1 Create Program
- **Route:** `POST /programs/`
- **Description:** Creates a new program under a specific department.
- **Request Body:**
  ```json
  {
    "name": "B.Sc. in Computer Science",
    "departmentId": "uuid-of-department"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Program created successfully",
    "data": {
      "id": "uuid",
      "name": "B.Sc. in Computer Science",
      "departmentId": "uuid-of-department"
    }
  }
  ```

### 3.2 Get All Programs
- **Route:** `GET /programs/`
- **Description:** Retrieves all programs along with their associated department details.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Programs fetched successfully",
    "data": [
      {
        "id": "uuid",
        "name": "B.Sc. in Computer Science",
        "departmentId": "uuid-of-department",
        "department": {
          "id": "uuid",
          "name": "Computer Science and Engineering"
        }
      }
    ]
  }
  ```

---

## 4. Courses

### 4.1 Create Course
- **Route:** `POST /courses/`
- **Description:** Creates a new course under a specific program.
- **Request Body:**
  ```json
  {
    "name": "Data Structures",
    "code": "CSE201",
    "programId": "uuid-of-program"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Course created successfully",
    "data": {
      "id": "uuid",
      "name": "Data Structures",
      "code": "CSE201",
      "programId": "uuid-of-program"
    }
  }
  ```

### 4.2 Get All Courses
- **Route:** `GET /courses/`
- **Description:** Retrieves all courses along with their associated program details.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Courses fetched successfully",
    "data": [
      {
        "id": "uuid",
        "name": "Data Structures",
        "code": "CSE201",
        "programId": "uuid-of-program",
        "program": {
          "id": "uuid",
          "name": "B.Sc. in Computer Science",
          "departmentId": "uuid-of-department"
        }
      }
    ]
  }
  ```

---

## 5. Academic Semesters

### 5.1 Create Academic Semester
- **Route:** `POST /academic-semesters/`
- **Description:** Creates a new academic semester.
- **Request Body:**
  ```json
  {
    "name": "Spring 2026",
    "year": 2026,
    "startDate": "2026-01-01T00:00:00.000Z",
    "endDate": "2026-06-30T00:00:00.000Z"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Academic Semester created successfully",
    "data": { ... }
  }
  ```

### 5.2 Get All Academic Semesters
- **Route:** `GET /academic-semesters/`
- **Description:** Retrieves all academic semesters.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Academic Semesters retrieved successfully",
    "data": [ ... ]
  }
  ```

---

## 6. Sections

### 6.1 Create Section
- **Route:** `POST /sections/`
- **Description:** Assigns an instructor to a course for a specific semester.
- **Request Body:**
  ```json
  {
    "name": "Section A",
    "courseId": "uuid-of-course",
    "instructorId": "uuid-of-instructor",
    "semesterId": "uuid-of-semester"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Section created successfully",
    "data": { ... }
  }
  ```

### 6.2 Get All Sections
- **Route:** `GET /sections/`
- **Description:** Retrieves all sections with related entities (course, instructor, semester).
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Sections retrieved successfully",
    "data": [ ... ]
  }
  ```

---

## 7. Course Registrations

### 7.1 Register for a Course
- **Route:** `POST /course-registrations/`
- **Description:** Enrolls a student in a section and automatically generates an UNPAID fee.
- **Request Body:**
  ```json
  {
    "studentId": "uuid-of-student",
    "sectionId": "uuid-of-section"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Course registered and Fee generated successfully",
    "data": { ... }
  }
  ```

---

## 8. Payments

### 8.1 Create Payment Intent
- **Route:** `POST /payments/create-payment-intent`
- **Description:** Creates a Stripe payment intent for a specific unpaid fee.
- **Request Body:**
  ```json
  {
    "feeId": "uuid-of-unpaid-fee"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Payment intent created successfully",
    "data": {
      "clientSecret": "pi_1Hh..._secret_..."
    }
  }
  ```

### 8.2 Stripe Webhook
- **Route:** `POST /payments/webhook`
- **Description:** Receives webhook events directly from Stripe. Updates fee status and logs the payment transaction.
- **Request Body:** `Raw JSON Buffer (Stripe Event)`
- **Response (200 OK):**
  ```json
  {
    "received": true
  }
  ```

---

## 9. Academic Records (Grading & Transcripts)

### 9.1 Mark Attendance
- **Route:** `POST /academic-records/attendances`
- **Description:** Marks a student's attendance for a section on a specific date.
- **Request Body:**
  ```json
  {
    "studentId": "uuid-of-student",
    "sectionId": "uuid-of-section",
    "date": "2026-03-01T10:00:00.000Z",
    "isPresent": true
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Attendance marked",
    "data": { ... }
  }
  ```

### 9.2 Create Exam
- **Route:** `POST /academic-records/exams`
- **Description:** Creates an exam (e.g. Midterm, Final) for a specific section.
- **Request Body:**
  ```json
  {
    "sectionId": "uuid-of-section",
    "name": "Midterm Exam",
    "date": "2026-04-15T00:00:00.000Z",
    "totalMarks": 100
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Exam created",
    "data": { ... }
  }
  ```

### 9.3 Submit Result
- **Route:** `POST /academic-records/results`
- **Description:** Submits the marks obtained by a student in a specific exam.
- **Request Body:**
  ```json
  {
    "studentId": "uuid-of-student",
    "examId": "uuid-of-exam",
    "marksObtained": 85.5
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Result submitted",
    "data": { ... }
  }
  ```

### 9.4 Generate Transcript (CGPA)
- **Route:** `GET /academic-records/transcripts/:studentId`
- **Description:** Fetches all exam results for a student, converts them to GPA per course, and calculates the overall CGPA.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Transcript generated successfully",
    "data": {
      "studentName": "John Doe",
      "studentId": "uuid-of-student",
      "records": [
        {
          "courseName": "Data Structures",
          "courseCode": "CSE201",
          "examName": "Midterm Exam",
          "marks": 85.5,
          "totalMarks": 100,
          "gpa": 4.0
        }
      ],
      "cgpa": 4.0
    }
  }
  ```
