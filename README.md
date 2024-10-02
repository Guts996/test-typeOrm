
``# 🌟 Fullstack App

### 📚 Description
This **Fullstack App** is built with **NestJS** for the backend and **React** for the frontend. 
---

### 🚀 Features

- **User Management**: Manage Users.
- **Product Management**: Add and remove products.
- **Cart System**: Manage product quantities, apply and remove promotions.
- **Promotions Management**: Apply flexible promotions and discounts.

---

### ⚙️ Requirements

Before running the project, ensure you have the following installed:

- **Node.js** (v14.x or above)
- **npm** (v6.x or above)
- **PostgreSQL** (Ensure a running instance)

#### Backend Environment:
Create a `.env` file in the `backend/` directory with your database credentials:

bash
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=your_db_name`` 

----------

### ⚙️ Installation

bash

`# Clone the repository
$ git clone https://github.com/Guts996/test-typeOrm.git
$ cd test-typeOrm

# Install dependencies (root, backend, frontend)
$ npm run install-all` 

----------

### 🏃 Running the app

bash

`# Start backend and frontend concurrently
$ npm run start

# Start backend only
$ npm run start-backend

# Start frontend only
$ npm run start-frontend` 

----------

### 🌐 API Endpoints

You can view the **Swagger API documentation** for the backend at:

bash
`http://localhost:3007/api` 

----------

### 💻 Technology Stack

-   **Backend**: [NestJS](https://nestjs.com/), [TypeORM](https://typeorm.io/), [PostgreSQL](https://www.postgresql.org/)
-   **Frontend**: [React](https://reactjs.org/)
-   **Tooling**: [Concurrently](https://www.npmjs.com/package/concurrently), [Wait-on](https://www.npmjs.com/package/wait-on)
