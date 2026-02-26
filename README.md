

# Recipes Application

Full-stack Recipes Management System with filtering, pagination, sorting, and bulk import.

---

# Tech Stack

* React (Frontend)
* Node.js / Express.js (Backend)
* MySQL (Database)

---

# System Architecture

```
React (Presentation Layer)
        ↓
Express API (Application Layer)
        ↓
MySQL (Data Layer)
```

Key Principles:

* Loose Coupling
* Separation of Concerns
* Scalable Design

---

# Frontend (React)

Core Features:

* Recipe Listing
* Search & Filtering
* Pagination
* API Integration
* State Management

Filters Supported:

* Title
* Cuisine
* Rating
* Total Time
* Calories

---

# Backend (Express API)

The backend acts as the application / middleware layer.

Responsibilities:

* Expose RESTful APIs
* Handle request / response cycle
* Apply filtering logic
* Pagination & sorting
* Database interaction
* Error handling

---

# Backend Architecture

```
Routes Layer
    ↓
Controller Logic
    ↓
Database Module
    ↓
MySQL
```

Layer Overview:

Routes Layer

* Defines API endpoints
* Maps requests to controllers

Controller Layer

* Business logic
* Filtering & pagination
* Response formatting

Database Layer

* SQL query execution
* Connection pooling
* Data retrieval

Design Approach:

Backend follows separation of concerns for maintainability and scalability.

---

# Sorting Strategy

```
rating DESC
```

Ensures best-rated recipes appear first.

---

# Database Schema (MySQL)

```sql
CREATE TABLE recipes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  cuisine VARCHAR(100),
  rating FLOAT,
  prep_time INT,
  cook_time INT,
  total_time INT,
  description TEXT,
  nutrients JSON,
  serves VARCHAR(50)
);
```

---

# API Endpoints

Get Recipes

```
GET /api/recipes?page=1&limit=10
```

Search Recipes

```
GET /api/recipes/search
```

Example:

```
/api/recipes/search?title=chicken&rating=4
```

Import Recipes

```
POST /api/recipes/import
```

---

# Error Handling

* Database Failures → 500
* Import Failures → 500
* Invalid Queries → Safe Fallback

---

# How to Run

Backend

```bash
npm install
npm start
```

Frontend

```bash
npm install
npm start
```

---




