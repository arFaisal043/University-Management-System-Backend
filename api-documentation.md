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

### 1.2 User Login
- **Route:** `POST /auth/login`
- **Description:** Authenticates a user and issues a JWT access token.
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
