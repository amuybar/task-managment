# Task Management API with NestJS

This is a **Task Management API** built with [NestJS](https://nestjs.com/), a progressive Node.js framework for building efficient and scalable server-side applications.

## Features

- **Task Management**:
  - Create, read, update, and delete tasks.
  - Manage task statuses (e.g., open, in progress, done).
- **Database Integration**:
  - Uses TypeORM for database operations.
  - Configured for PostgreSQL.
- **Authentication**:
  - Implement JWT-based authentication (to be added).
- **Validation**:
  - Input validation using class-validator.
- **Custom Repositories**:
  - Leverages custom repositories for scalable database operations.

---

## Installation

### Prerequisites

1. **Node.js**: Install [Node.js](https://nodejs.org/) (v16 or later recommended).
2. **PostgreSQL**: Ensure you have a running PostgreSQL database.
3. **Yarn or npm**: Install either [yarn](https://yarnpkg.com/) or npm for package management.

### Clone the Repository

```bash
git clone https://github.com/amuybar/task-management.git
cd task-management
```

### Install Dependencies

```bash
yarn install
# or
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root and configure the following variables:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=task_management
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=3600s
```

---

## Running the Application

### Development Mode

```bash
yarn start:dev
# or
npm run start:dev
```

### Production Mode

```bash
yarn build
yarn start:prod
# or
npm run build
npm run start:prod
```

---

## API Endpoints

### Task Endpoints

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| GET    | `/tasks`           | Get all tasks           |
| GET    | `/tasks/:id`       | Get a task by ID        |
| POST   | `/tasks`           | Create a new task       |
| PATCH  | `/tasks/:id/status`| Update task status      |
| DELETE | `/tasks/:id`       | Delete a task           |

### Authentication Endpoints

| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| POST   | `/auth/signup`   | Register a new user       |
| POST   | `/auth/login`    | Authenticate a user       |

---

## Project Structure

```plaintext
src/
├── tasks/                 # Task module (controllers, services, and entities)
├── auth/                  # Authentication module
├── common/                # Shared utilities and pipes
├── app.module.ts          # Root module
├── main.ts                # Entry point
```

---

## Technologies Used

- **NestJS**
- **TypeScript**
- **TypeORM**
- **PostgreSQL**
- **JWT** (Authentication)

---

## Planned Improvements

- Add user authentication and authorization.
- Implement role-based access control (RBAC).
- Enhance error handling with custom filters.
- Add unit and integration tests.
- Improve logging and monitoring.

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

