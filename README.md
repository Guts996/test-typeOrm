🌟 Fullstack App
📚 Description
This is a Fullstack App built with NestJS for the backend and React for the frontend.

🚀 Features
User Management: Easily manage users with authentication.
Product Management: Add and remove products.
Cart System: Manage product quantities, apply and remove promotions.
Promotions Engine: Apply flexible promotions and discounts.

⚙️ Requirements
Before running the project, make sure you have the following installed:

Node.js (v14.x or above)
npm (v6.x or above)
PostgreSQL (Ensure a running instance)
Backend Environment:
.env file in backend/ directory with database credentials:

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=your_db_name

⚙️ Installation
# Clone the repository
$ git clone https://github.com/Guts996/test-typeOrm.git
$ cd test-typeOrm

# Install dependencies (root, backend, frontend)
$ npm run install-all

🏃 Running the app
# Start backend and frontend concurrently
$ npm run start

# Start backend only
$ npm run start-backend

# Start frontend only
$ npm run start-frontend

🌐 API Endpoints
You can view the Swagger API documentation for the backend at:
http://localhost:3007/api

💻 Technology Stack
Backend: NestJS, TypeORM, PostgreSQL
Frontend: React
Tooling: Concurrently, Wait-on