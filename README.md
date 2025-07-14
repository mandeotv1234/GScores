# GScores

A fullstack web application for THPT 2024 score lookup, reporting, and statistics.

## Features

### Must Have
- **Data Migration & Seeder:** Import raw data (`diem_thi_thpt_2024.csv`) into PostgreSQL database using migration and seeder scripts (located in backend source).
- **Score Lookup:** Search for student scores by registration number.
- **Score Report:** View report with 4 score levels:
  - Excellent: >=8 points
  - Good: 6 <= points < 8
  - Average: 4 <= points < 6
  - Poor: < 4 points
- **Statistics by Subject:** Chart showing number of students in each score level by subject.
- **Top 10 Group A:** List top 10 students in group A (math, physics, chemistry).

### Nice to Have
- **Responsive Design:** Looks good on desktops, tablets, and mobile phones.
- **Docker Setup:** Run fullstack app with one command using Docker Compose.
- **Live Demo:** Hosted backend and frontend for public access.

## Technical Stack
- **Frontend:** Vue 3, TypeScript, Tailwind CSS, Chart.js, Vite
- **Backend:** Java Spring Boot, OOP for subject management, validation, ORM (JPA/Hibernate)
- **Database:** PostgreSQL
- **Deployment:** Backend on Google Cloud, Frontend on Vercel

## How to Run Locally

### Prerequisites
- Docker & Docker Compose installed

### 1. Clone the repository
```sh
git clone https://github.com/mandeotv1234/GScores.git
cd GScores
```

### 2. Setup environment variables
- Copy `.env.example` to `.env` in both `Backend` and `Frontend` folders and fill in your DB credentials if needed.
- Example files are provided: `Backend/.env.example`, `Frontend/.env.example`.

### 3. Run with Docker Compose
```sh
docker-compose up --build
```
- Frontend: http://localhost:5173
- Backend: http://localhost:8080

### 4. Manual (without Docker)
- Backend: Java 21+, PostgreSQL, run `./gradlew bootRun` in `Backend`
- Frontend: Node.js 20+, run `npm install && npm run dev` in `Frontend`

### 5. Login Information
- When you open the app, you must login first.
- **Username:** `admin`
- **Password:** `Vlchinsu1234*`

## Demo Links
- **Backend:** https://gscore-517774435862.europe-west1.run.app
- **Frontend/App:** https://g-scores-app-eight.vercel.app

## Requirements
- See assignment details in this README for all required and optional features.

## License
MIT

## Backend Architecture: Clean Architecture

The backend is designed using Clean Architecture principles for maintainability, scalability, and testability.

### Layers Overview
- **Domain:** Contains core business models (entities), enums, and business rules. Example: `ExamResult`, `User`, score level enums.
- **Application:** Contains use cases (business logic), repository interfaces, request/response objects. Example: `GetExamResultByIdUseCase`, `GenerateScoreLevelReportUseCase`.
- **Adapter:** Contains REST controllers, DTOs, and mapping logic between web and application layers. Example: `ExamResultController`, DTOs for API responses.
- **Infrastructure:** Contains persistence (JPA repositories), configuration, security, seeding, and integration with external systems (DB, JWT, etc).

### Data Flow Example
1. **Frontend** sends a request to the backend API (controller in Adapter).
2. **Controller** calls the appropriate UseCase in Application.
3. **UseCase** processes business logic, interacts with Repository interface (implemented in Infrastructure).
4. **Repository** fetches data from the database and returns to UseCase.
5. **UseCase** returns a response object, which is mapped to a DTO and sent back to the frontend.

### Benefits
- **Separation of concerns:** Each layer has a clear responsibility.
- **Testability:** Business logic is isolated and easy to test.
- **Flexibility:** Technology changes (DB, web framework) do not affect business logic.
- **Maintainability:** Code is organized, easy to extend and refactor.

### Example
- **Domain:** `ExamResult.java` defines the exam result entity.
- **Application:** `GetExamResultByIdUseCase.java` handles score lookup logic.
- **Adapter:** `ExamResultController.java` exposes REST API endpoints.
- **Infrastructure:** JPA repositories, JWT security, CSV seeder for initial data import.

### Seeder/Migration
- Raw data from `diem_thi_thpt_2024.csv` is imported into the database using a seeder script in the Infrastructure layer.

This architecture ensures the backend is robust, maintainable, and ready for future growth.
