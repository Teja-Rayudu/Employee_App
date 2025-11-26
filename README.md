# 🚀 Employee App – Spring Boot

A simple, container-ready Employee Management application with a Spring Boot (Java 17) backend, a lightweight JavaScript frontend, and REST APIs for full CRUD operations on employees. 🧑‍💻

---

## 🧰 Tech Stack

- ☕ **Java 17** (Eclipse Temurin)  
- 🌱 **Spring Boot**  
- 📦 **Maven**  
- 🎨 **HTML CSS JS** (frontend)  
- 🐳 **Docker**
- 🫙 **Deployement - Render**
- 🏬 **Database - PostreSQL (Neon-DB)**
---

## ⭐ Features

- 🔁 **REST APIs** for managing employees (Create, Read, Update, Delete)  
- 🖥️ **Simple UI** to call all APIs and display results  
- 📦 **Dockerfile** with a multi-stage build for Maven and Java 17 for easy containerization  

---

## ✅ Requirements

- ☕ **JDK 17**  
- 📦 **Maven 3.9+**  
- 🐳 **Docker** (optional, for running in a container)

---

## 🏃 Quick Start (Development)

1. 🔨 **Build the project**
   
2. ▶️ **Run the JAR**

3. 🌐 **Default app port**
- Application URL: `http://localhost:8080`

---

## 🐳 Docker

Build the image:
docker build -t employee-app


Run the container:
docker run -p 8080:8080 employee-app

---


> 🧩 The project includes a `Dockerfile` configured with a multi-stage build using Maven and Java 17 for a slimmer, production-ready image.

---

## 📡 Common API Endpoints

Assuming base URL: `http://localhost:8080`

- `GET /employees` – 📋 List all employees  
- `GET /employees/{id}` – 🔍 Get employee by ID  
- `POST /employees` – ➕ Create a new employee (JSON body)  
- `PUT /employees/{id}` – ✏️ Update an employee by ID (JSON body)  
- `DELETE /employees/{id}` – ❌ Delete an employee by ID  

> ⚠️ Adjust these endpoints if your controller mappings use different paths.

---

## 🎨 Frontend

- The frontend is a small **JavaScript UI** that interacts with the REST APIs.  
- Ensure the frontend points to the correct API base URL: `http://localhost:8080`.  
- 💡 Styling tip: set a powder blue background in your main CSS file, for example:

body {
background-color: #b0e0e6;
}


---

## 🧪 Tests

Run unit tests:
mvn test


---

