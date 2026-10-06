> 💡 **Note:** This is a **backend-focused** **University Management System** project. You will build a robust, scalable, and secure RESTful API. No frontend UI is required; all functionality must be demonstrated via API testing tools like Postman or Thunder Client.


> 💡 **Note:** You may customize the selected project or choose a completely unique project outside this list. However, regular e-commerce clones or projects already covered in this course are **not allowed**. The core problem domain, the 3-role requirement, and the overall project complexity must strictly meet our expectations.

---

## ⚠️ Mandatory Requirements

> [!CAUTION]
> **MANDATORY - READ CAREFULLY**
> 
> The following requirements are **strictly mandatory**. Failure to complete any of these may result in significant mark deductions or **0 marks** for the affected section:
> 
> 1. **API Documentation**: Share a complete Postman Collection or Swagger/OpenAPI documentation covering all important endpoints.
> 2. **Consistent API Responses**: All APIs must return a structured JSON response:
>    - **Success**: `{ "success": true, "message": "Operation successful", "data": {} }`
>    - **Error**: `{ "success": false, "message": "Something went wrong", "errors": [] }`
> 3. **Commits**: Minimum **20 meaningful** backend commits with descriptive messages (e.g., `feat:`, `fix:`, `docs:`).
> 4. **Input Validation**: Server-side validation (Zod/Joi) is required on all applicable endpoints with proper error messages.
> 5. **Authentication & Authorization**: Implement authentication (Email/Password + GCP Social Login) and strict role-based authorization for **3 distinct roles**.
> 6. **Admin Credentials**: Provide working demo admin email and password for evaluation.
> 7. **Payment Integration**: Must integrate **bKash, Stripe, or SSLCommerz** for real payment processing. Simulated/fake payments are **NOT** accepted.
> 8. **Database**: Use **PostgreSQL with Prisma**, implementing proper relationships, constraints, indexing, and transactions.
> 9. **Deployment**: Provide a working live API URL (e.g., Vercel Serverless Functions or Render).
> 10. **Video Explanation**: Submit a 5–10 minute API walkthrough video.

---

## 📊 Marks Distribution

| # | Category | Weight | Details |
|:-:|:---------|:------:|:--------|
| 1 | API Design & Documentation | 15% | RESTful design, endpoint structure, Postman/Swagger docs |
| 2 | Database Design & Schema | 15% | Prisma schema, relationships, constraints, migrations, seed data |
| 3 | Authentication & Authorization | 15% | Auth (Email + GCP), 3 roles, JWT/session handling, protected routes |
| 4 | Core Functionality & Business Logic | 20% | CRUD, workflows, status management, role-based operations |
| 5 | Error Handling & Validation | 10% | Input validation, structured errors, 404 handling, edge cases |
| 6 | Payment Integration | 10% | bKash/Stripe/SSLCommerz integration, payment flow, status tracking |
| 7 | Performance & Code Quality | 5% | Indexing, Redis caching, modular architecture, clean code |
| 8 | Deployment | 5% | Working production API, environment configuration, DB connection |
| 9 | Commit History | 2% | 20 meaningful backend commits |
| 10 | Video Explanation | 3% | 5–10 minute API walkthrough |
| **Total** | | **100%** | |

---
## 📋 Project Requirements

> 💡 **Note:** Read these carefully. While not every single point is strictly fixed, you must follow this general guideline to ensure your project meets expectations.

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Runtime & Framework** | Node.js, TypeScript, Express.js | REST API development with type safety |
| **Database & ORM** | PostgreSQL + Prisma | Relational database with relation management, indexing, and transactions |
| **Validation** | Zod / Joi | Strict API-level input validation |
| **Linting & Formatting** | Biome / ESLint / Prettier / oxlint | Code quality, consistency, and formatting |
| **Caching & State (Optional)** | Redis | Caching, temporary state, or rate limiting |
| **Authentication** | Custom / Better Auth / Clerk | Email/Password + Social Login (GCP) |
| **Email (Optional)** | Nodemailer / Resend | Transactional emails and notifications |
| **File Storage** | Multer & Cloudinary | Secure file/image upload and storage |
| **Payments** | bKash / Stripe / SSLCommerz | Real payment processing and status tracking |
| **Documentation** | Postman | API testing and interactive documentation |
| **Deployment** | Vercel (Serverless Functions) / Render | Production backend API deployment |

> **Note:** You do not need to use every technology in every project. Choose technologies based on the actual requirements of your specific project.

--- 

## 🎯 Core Project Rules

- **Roles**: Each project must have **3 fixed primary roles** (e.g., Customer, Provider, Admin). Role permissions must be strictly defined and enforced.
- **Payment Integration**: This is **MANDATORY**. You must integrate **bKash, Stripe, or SSLCommerz**. Your system must securely handle payment creation, success/cancellation callbacks, and status tracking. *Cash on Delivery, Pay Later, or fake manual status updates are NOT accepted.*
- **No Frontend Required**: This is a backend-focused assignment. You do not need to build a UI. Use Postman, Thunder Client, or Swagger to demonstrate your API.
- **Security & Protection**: 
  - Hash passwords securely, never expose secrets, and protect all private routes.
  - Implement **Rate Limiting** (e.g., using `express-rate-limit`) to prevent API abuse.
  - Use security headers (e.g., `helmet`) and configure **CORS** properly.
- **Performance & Concurrency**: Optimize your backend using database indexing, efficient Prisma queries (e.g., using `select`), and Redis caching. Use **database transactions** to handle concurrency and prevent race conditions (e.g., double-booking a resource).

---

## ⚙️ Minimum 20 APIs Requirement

---

# University Management System

**Category:** Education / Administration

```text
University
   │
   ▼
Department
   │
   ▼
Program
   │
   ▼
Course
   │
   ▼
Semester
   │
   ▼
Course Registration
   │
   ▼
Attendance
   │
   ▼
Exam
   │
   ▼
Result
   │
   ▼
Transcript / GPA
```

**Possible users**
- Student
- Instructor
- Department Admin
- Registrar
- Finance/Admin
- Super Admin

**Possible features**
- Departments
- Programs
- Courses
- Instructors
- Students
- Semesters
- Course enrollment
- Course prerequisites
- Sections
- Attendance
- Exams
- Results
- GPA calculation
- Transcripts
- Fees
- Notifications
- Academic reports

**Backend challenges**
- Complex relational data
- Course prerequisite validation
- Enrollment constraints
- GPA calculation
- Transaction-safe registration
- Role/permission management
- Academic history

---

## 📦 What to Submit

Please format your submission exactly like this example:

```text
Project Name    : Courier & Logistics Platform
Backend Repo    : https://github.com/your-username/courier-backend
Live API        : https://courier-api.vercel.app
API Docs        : https://documenter.getpostman.com/view/xyz
Demo Video      : https://drive.google.com/file/d/xyz/view
Admin Email     : admin@courier.com
Admin Password  : ********
```

> ⚠️ **Security Warning:** Never submit personal passwords or production secrets. Create dedicated, secure demo credentials specifically for evaluation.

---


> 🚀 **Final Goal:** Build a backend that is more than just a collection of endpoints. Your project should demonstrate a clear, logical path from **Problem → Requirements → Database Design → API Design → Auth → Business Logic → Validation → Payment → Testing → Deployment**. Build a rock-solid backend you can explain, defend, and be proud of!