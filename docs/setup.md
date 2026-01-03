# Setup Guide

## Prerequisites

- [Docker](https://www.docker.com/get-started) and Docker Compose
- [Rust](https://www.rust-lang.org/tools/install) (for local backend development)

## Quick Start with Docker

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd learning
   ```

2. Start the application with Docker Compose:
   ```bash
   docker-compose up
   ```

3. Access the application:
   - Frontend: http://localhost:PORT
   - Backend API: http://localhost:PORT

## Local Development Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the project:
   ```bash
   cargo build
   ```

3. Run the development server:
   ```bash
   cargo run
   ```

4. Run tests:
   ```bash
   cargo test
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

## Environment Variables

### Backend
Create a `.env` file in the [backend/](../backend/) directory:

```env
# Add your environment variables here
DATABASE_URL=
PORT=
```

### Frontend

## Database Setup
<!-- If applicable -->

TBD

## Troubleshooting

### Common Issues

**Issue**: Docker container won't start
- **Solution**: Check Docker logs with `docker-compose logs`

**Issue**: Port already in use
- **Solution**: Change the port in docker-compose.yaml or stop the conflicting service

## Additional Resources

- Rust documentation: https://doc.rust-lang.org/
- Docker Compose docs: https://docs.docker.com/compose/
