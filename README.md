# 🌿 PlantCare Server

This is the backend server for the PlantCare application. It provides RESTful APIs to manage plants and user profiles with MongoDB as the database.

---

## 🚀 Live Server

This server runs on your specified environment or localhost on port 3000 (or any port specified in `.env`).

---

## 🔑 Features

- ✅ **CRUD operations on plants**: Add, update, delete, and fetch plants.
- ✅ **User profile management**: Store and update user data including last sign-in time.
- ✅ **MongoDB integration** with secure connection using environment variables.
- ✅ **CORS enabled** for cross-origin requests.
- ✅ **Error handling** for invalid requests and database operations.

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB (Atlas)
- dotenv (for environment variables)
- cors

---

## ⚙️ API Endpoints

| Method | Endpoint         | Description                       |
|--------|------------------|---------------------------------|
| GET    | `/plants`        | Get all plants or by user email |
| POST   | `/plants`        | Add a new plant                 |
| GET    | `/plants/:id`    | Get plant by ID                 |
| DELETE | `/plants/:id`    | Delete plant by ID              |
| PUT    | `/plant/:id`     | Update plant by ID              |
| GET    | `/users`         | Get all users                  |
| POST   | `/users`         | Add a new user                 |
| PATCH  | `/users`         | Update user lastSignInTime     |

---

## 🔧 Setup Instructions

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root with the following variables:

```env
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
PORT=3000
