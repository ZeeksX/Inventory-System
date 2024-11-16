# 📦 Inventory System

## Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## About the Project

The **Inventory System** is a robust solution designed to manage and track inventory, providing seamless interaction between the backend and frontend systems. This project uses modern technologies to deliver a highly scalable and maintainable inventory management system.

---

## Tech Stack

The project is built using the following technologies:

- **Backend**: [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **Frontend**: [React.js](https://vite.dev/) - A modern JavaScript framework for building user interfaces.
- **Database**: [SQL](https://www.postgresql.org/) - A powerful, open-source relational database management system.

---

## Features

- Add, edit, and delete inventory items.
- Track stock levels in real-time.
- Generate detailed reports on inventory data.
- User authentication and authorization.
- Responsive UI for managing inventory on any device.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following tools installed:

- [Node.js](https://nodejs.org/en/) (v14.x or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [React.js](https://vite.dev/)
- [PostgreSQL](https://www.postgresql.org/) (or any SQL database)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ZeeksX/Inventory-System.git
   cd Inventory-System
   ```

2. **Install Backend Dependencies**:
   Navigate to the `server` folder and install the required packages.

   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**:
   Navigate to the `client` folder and install the required packages.

   ```bash
   cd ../client
   npm install
   ```

4. **Set Up the Database**:

   - Ensure PostgreSQL (or your preferred SQL database) is installed and running.
   - Create a new database for the project and update the database configuration in the `server` folder.

   Example configuration (`.env` file):

   ```bash
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=yourusername
   DB_PASSWORD=yourpassword
   DB_NAME=inventory
   ```

---

## Running Locally

### Backend (NestJS)

1. **Start the NestJS server**:

   ```bash
   cd server
   npm run start:dev
   ```

2. The backend should now be running on `http://localhost:3000`.

### Frontend (React.js)

1. **Start the React.js client**:

   ```bash
   cd client
   npm run dev
   ```

2. The frontend should now be running on `http://localhost:5173`.

### Access the Application

- **Frontend**: Open `http://localhost:5173` in your browser to access the client-side of the application.
- **Backend API**: The API is accessible at `http://localhost:3000/api/v1`.

---

## Project Structure

```
Inventory-System/
│
├── server/             # NestJS backend code
│   ├── src/            # Source files for backend
│   └── ...             # Other backend-specific folders and files
│
├── client/             # React.js frontend code
│   ├── src/            # Source files for frontend
│   └── ...             # Other frontend-specific folders and files
│
├── README.md           # Project documentation
└── .gitignore          # Git ignore file
```

---

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

### 🎉 Thank you for checking out the **Inventory System**! We hope you find it helpful for managing inventory efficiently.

---
