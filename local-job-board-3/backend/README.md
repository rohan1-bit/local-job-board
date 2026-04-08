# ⚡ KaamKhojo — Backend (Spring Boot)

> REST API for Local Job Notice Board

---

## 🚀 Quick Start

### Prerequisites
- Java 21+
- Maven 3.8+
- MySQL 8.0+

### Step 1 — Create MySQL Database
```sql
CREATE DATABASE kaamkhojo_db;
```

### Step 2 — Update DB Password
Edit `src/main/resources/application.properties`:
```properties
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### Step 3 — Run the App
```bash
mvn spring-boot:run
```

Server starts at → **http://localhost:8080**

---

## 📡 API Endpoints

### 🔐 Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login & get JWT token | Public |

### 💼 Jobs
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/jobs` | Get all open jobs | Public |
| GET | `/api/jobs/search?search=&category=&location=` | Search jobs | Public |
| GET | `/api/jobs/{id}` | Get job by ID | Public |
| POST | `/api/jobs` | Post a new job | Employer |
| PUT | `/api/jobs/{id}` | Update job | Employer |
| DELETE | `/api/jobs/{id}` | Delete job | Employer |
| GET | `/api/jobs/my-jobs` | Get my posted jobs | Employer |
| POST | `/api/jobs/{id}/apply` | Apply for job | Worker |
| GET | `/api/jobs/{id}/applicants` | Get applicants | Employer |
| PUT | `/api/jobs/applications/{id}/status` | Update application status | Employer |

### 👤 Users
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users/profile` | Get my profile | Any |
| PUT | `/api/users/profile` | Update my profile | Any |
| GET | `/api/users/{id}` | Get user by ID | Public |
| GET | `/api/users/applications` | Get my applications | Worker |

### ⭐ Ratings
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/ratings` | Submit a rating | Any |
| GET | `/api/ratings/user/{userId}` | Get user ratings | Public |

---

## 🧪 Test with curl

### Register
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rohan Parida",
    "email": "rohan@test.com",
    "password": "pass123",
    "phone": "9876543210",
    "role": "employer",
    "location": "Bhubaneswar"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "rohan@test.com", "password": "pass123"}'
```

### Get All Jobs
```bash
curl http://localhost:8080/api/jobs
```

### Post a Job (with token)
```bash
curl -X POST http://localhost:8080/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Plumber Needed",
    "description": "Need an experienced plumber",
    "category": "plumbing",
    "location": "Bhubaneswar",
    "salaryMin": 800,
    "salaryMax": 1200
  }'
```

---

## 🗂️ Project Structure

```
src/main/java/com/kaamkhojo/
├── KaamKhojoApplication.java   # Entry point
├── config/                     # SecurityConfig, CorsConfig
├── controller/                 # REST controllers
├── service/                    # Service interfaces
├── serviceImpl/                # Service implementations
├── repository/                 # JPA repositories
├── model/                      # Entity classes
├── dto/
│   ├── request/                # Request DTOs
│   └── response/               # Response DTOs
├── security/                   # JWT, UserDetailsService
└── exception/                  # Custom exceptions + handler
```

---

## 👥 Team — StackedCrew · CVR University
