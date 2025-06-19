# MERN Stack Todo Application with Docker

A full-stack Todo application built with MongoDB, Express.js, React, and Node.js (MERN stack), containerized using Docker.

## Project Overview

This is a modern Todo application that allows users to:
- Create, read, update, and delete todo items
- Organize tasks efficiently
- Access the application through a clean and intuitive user interface

## Tech Stack

### Frontend
- React.js
- React Icons
- Axios for API calls
- React Testing Library for testing

### Backend
- Node.js with Express
- MongoDB for database
- Mongoose for ODM
- CORS for cross-origin requests

### Infrastructure
- Docker for containerization
- Docker Compose for orchestration
- Nginx for serving the frontend
- MongoDB as the database service

## Project Structure

```
.
├── frontend/           # React frontend application
│   ├── src/           # Source code
│   ├── public/        # Static files
│   ├── Dockerfile     # Frontend container configuration
│   └── nginx.conf     # Nginx configuration
├── backend/           # Node.js backend application
│   ├── src/          # Source code
│   ├── server.js     # Main server file
│   └── Dockerfile    # Backend container configuration
└── docker-compose.yml # Docker Compose configuration
```

## Prerequisites

- Docker
- Docker Compose
- Git

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd todo-mern-app
   ```

2. Clean up any existing Docker resources (optional):
   ```bash
   docker system prune -a --volumes
   ```

3. Build and start the services:
   ```bash
   docker-compose up --build
   ```

4. Verify the running services:
   ```bash
   docker ps
   ```

5. Access the application:
   - Open your browser and navigate to `http://localhost`

## Docker Services

The application consists of three main services:

1. **MongoDB Service**
   - Latest MongoDB image
   - Persistent volume for data storage
   - Accessible only within the backend network

2. **Backend Service**
   - Node.js Express server
   - Connects to MongoDB
   - Exposes API endpoints
   - Runs on port 5000 internally

3. **Frontend Service**
   - React application
   - Served through Nginx
   - Exposed on port 80
   - Connects to backend service

## Networks

The application uses two custom bridge networks:
- `backend-network`: Private network for database and backend communication
- `frontend-network`: Network for frontend and backend communication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
