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
- Example files are provided: `.env.example` (root), `Backend/.env.example`, `Frontend/.env.example`.

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
