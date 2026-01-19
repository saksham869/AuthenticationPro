# AuthenticationPro 🔐

**AuthenticationPro** is a production-ready, scalable full-stack authentication system built with **Spring Boot 3+ (Backend)** and **React 18 + Vite (Frontend)**. It implements **enterprise-grade security practices** including **JWT authentication with RS256 asymmetric encryption**, **email verification**, **role-based access control (RBAC)**, and **secure environment-based configuration**.

---

## 🚀 Features

### 🔐 Enterprise Security

* JWT Authentication with **RS256 asymmetric encryption**
* **Bcrypt password hashing** (configurable strength)
* **Refresh token mechanism** for session continuity
* Secure **email verification & password reset workflows**
* **Rate limiting** for brute-force attack prevention
* **CORS protection** with configurable origins
* Secure **environment-based secrets management**
* **JWT key rotation support**
* HTTPS/SSL-ready configuration

### 👤 User Management

* User registration with email verification
* Secure login with JWT issuance
* Password reset with time-limited tokens
* User profile management
* Account activation/deactivation
* Role-based access control (**USER / ADMIN / MODERATOR**)
* User activity logging & audit trails

### 🏗️ Architecture

* Clean layered architecture:

  * **Controller → Service → Repository**
* RESTful API with **OpenAPI / Swagger Docs**
* Spring Data JPA for type-safe database access
* Global exception handling
* Transaction management with `@Transactional`
* SLF4J logging
* Microservices-ready structure

### 🎨 Frontend (React + Vite)

* React 18 with hooks & Context API
* Vite for lightning-fast builds
* Responsive mobile-first UI
* JWT persistence & refresh logic
* Axios API interceptors
* Error boundaries & loading states

### 🐳 DevOps & Deployment

* Dockerized backend & frontend
* Docker Compose (local + production)
* MySQL container support
* Health check endpoints
* Graceful shutdown handling
* **Currently Working On:**

  * Multi-stage Docker builds for smaller image sizes
  * NGINX reverse proxy for frontend + backend routing
  * CI/CD pipeline with GitHub Actions (build, test, security scan, deploy)
  * Production-ready logging & monitoring (Prometheus + Grafana)

---

## 📋 Tech Stack

| Layer    | Technology                                    |
| -------- | --------------------------------------------- |
| Backend  | Spring Boot 3+, Java 17, Spring Security, JPA |
| Frontend | React 18, Vite 4, Axios                       |
| Database | MySQL 8                                       |
| Security | JWT (RS256), BCrypt, CORS, Rate Limiting      |
| DevOps   | Docker, Docker Compose                        |
| Docs     | Swagger / OpenAPI                             |

---

## 📁 Project Structure

```
AuthenticationPro/
├── authify/                 # Backend (Spring Boot)
│   ├── src/main/java/com/auth/
│   │   ├── config/         # Security & CORS config
│   │   ├── controller/    # REST controllers
│   │   ├── service/       # Business logic
│   │   ├── repository/   # Data access
│   │   ├── security/     # JWT filters & validation
│   │   ├── dto/          # Data transfer objects
│   │   ├── entity/       # JPA entities
│   │   └── exception/   # Global error handling
│   ├── Dockerfile
│   └── pom.xml
│
├── client/                # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── utils/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

## ⚡ Quick Start

### 📦 Prerequisites

* Java 17+
* Maven 3.8+
* Node.js 18+
* MySQL 8+
* Docker 20+
* Git

---

## 🐳 Option 1 — Docker Compose (Recommended)

```bash
git clone https://github.com/saksham869/AuthenticationPro.git
cd AuthenticationPro
cp .env.example .env
docker-compose up -d
docker-compose logs -f
```

### 🔗 Access

* Backend API → `http://localhost:8080`
* Frontend → `http://localhost:5173`
* MySQL → `localhost:3306`
* Swagger Docs → `http://localhost:8080/swagger-ui.html`

---

## 🛠️ Option 2 — Local Development

### Backend

```bash
cd authify
mvn clean install
mvn spring-boot:run
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create `.env` in project root:

```env
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=dev

SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/authify
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_password

JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRATION_MS=3600000
JWT_REFRESH_EXPIRATION_MS=604800000

SPRING_MAIL_HOST=smtp-relay.brevo.com
SPRING_MAIL_PORT=587
SPRING_MAIL_USERNAME=your_email@example.com
SPRING_MAIL_PASSWORD=your_smtp_api_key

CORS_ALLOWED_ORIGINS=http://localhost:5173
```

> ⚠️ Never commit `.env` or secrets to GitHub

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint                    | Description            |
| ------ | --------------------------- | ---------------------- |
| POST   | `/api/auth/register`        | Register new user      |
| POST   | `/api/auth/login`           | Login & get JWT        |
| POST   | `/api/auth/refresh-token`   | Refresh JWT            |
| POST   | `/api/auth/verify-email`    | Verify email           |
| POST   | `/api/auth/forgot-password` | Request password reset |
| POST   | `/api/auth/reset-password`  | Reset password         |

### Users

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| GET    | `/api/users/profile` | Get profile        |
| PUT    | `/api/users/profile` | Update profile     |
| DELETE | `/api/users/profile` | Delete account     |
| GET    | `/api/users`         | List users (Admin) |

---

## 🗄️ Database Schema

### Users Table

```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('USER', 'ADMIN', 'MODERATOR') DEFAULT 'USER',
  is_active BOOLEAN DEFAULT TRUE,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🧪 Testing

### Backend

```bash
mvn test
mvn verify
```

### Frontend

```bash
npm run test
```

---

## 🚢 Deployment (Production)

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Recommended

* Use AWS RDS / Managed MySQL
* Enable SSL (Let's Encrypt / AWS ACM)
* Store secrets in **GitHub Actions Secrets / Vault**

---

## 🛡️ Security Best Practices

* Never commit secrets (`.env`, `*.pem`, `*.key`)
* Rotate JWT keys periodically
* Enable HTTPS in production
* Restrict CORS to production domains
* Use strong passwords (BCrypt 12+ rounds)

---

## 🤝 Contributing

```bash
git checkout -b feature/your-feature
git commit -m "feat: add new feature"
git push origin feature/your-feature
```

Then open a Pull Request 🚀

---

## 🗺️ Roadmap

### 🔮 Future Vision — AI-Powered Authentication Platform

AuthenticationPro is evolving beyond traditional authentication into an **AI-enhanced security and identity intelligence platform** using **Spring AI** and modern LLM integrations.

### 🤖 Planned AI Features

* **AI-Powered Login Anomaly Detection**
  Detect suspicious login behavior using ML models (IP, location, device fingerprint, time-based patterns).

* **Smart Risk-Based Authentication (RBA)**
  Dynamically increase security (OTP / 2FA / email verification) based on AI-calculated risk score.

* **AI Security Assistant (Spring AI + LLMs)**
  Natural language interface for admins:

  * “Show failed login attempts in the last 24 hours”
  * “Which users have suspicious activity?”

* **Intelligent Audit Log Analysis**
  AI-powered summarization of security events, alerts, and compliance reports.

* **Adaptive Rate Limiting**
  AI models adjust rate limits in real time based on traffic patterns and threat detection.

* **Automated Security Recommendations**
  LLM suggests improvements in password policy, CORS rules, and JWT configuration.

### 🧠 Spring AI Integration Plan

* Use **Spring AI** to connect with:

  * OpenAI / Azure OpenAI
  * Local LLMs (Ollama / LLaMA)
* Add **AI Service Layer**:

  * `AiSecurityService` for threat detection
  * `AiAuditService` for log intelligence
* Secure AI endpoints with RBAC (Admin-only)

### ☁️ Cloud & Platform Expansion

* Kubernetes-native deployment (Helm charts)
* Multi-tenant SaaS authentication platform
* Centralized Identity Management Dashboard
* Webhooks for third-party system integration

### 📌 Upcoming Milestones

* [ ] OAuth2 (Google, GitHub, Microsoft)
* [ ] Two-Factor Authentication (2FA / TOTP)
* [ ] AI-Powered Security Monitoring (Spring AI)
* [ ] Kubernetes Deployment
* [ ] GraphQL API
* [ ] Admin Analytics Dashboard

---

## 📄 License

MIT License © 2024–2026 **Satyam Mishra**

---

## 👤 Author

**Satyam Mishra**
GitHub: [@saksham869](https://github.com/saksham869)

## 🌟 Show Your Support

If this project helped you:

* ⭐ Star the repository
* 🔗 Share it
* 🤝 Contribute improvements

---
**Version:** 1.0.0
**Last Updated:** January 19, 2026

---

Made with ❤️ by **Satyam Mishra**
