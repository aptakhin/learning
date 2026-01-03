# Learning

A full-stack application built with Rust backend and modern frontend.

## Overview

This project demonstrates a complete web application architecture with:
- **Backend**: Rust-based server providing RESTful API
- **Frontend**: Modern web interface
- **Infrastructure**: Docker Compose for easy local development

## Quick Start

```bash
docker-compose up -d --build

# Or run components individually (see Setup Guide)
```

See the [Setup Guide](docs/setup.md) for detailed installation and development instructions.

## Documentation

- **[Architecture](docs/architecture.md)** - System design and component overview
- **[API Documentation](docs/api.md)** - API endpoints and usage
- **[Setup Guide](docs/setup.md)** - Installation and development setup
- **[Project Context](.claude/context.md)** - Project-specific context for Claude Code
- **[Coding Guidelines](.claude/guidelines.md)** - Development standards and best practices

## Project Structure

```
learning/
├── .claude/              # Claude Code configuration and context
├── backend/              # Rust backend server
├── frontend/             # Frontend application
├── docs/                 # Documentation
├── docker-compose.yaml   # Docker Compose configuration
└── README.md            # This file
```

## Technology Stack

### Backend
- **Language**: Rust
- **Key Dependencies**: (Add as you include them)

### Frontend
- **Framework**: (Add your framework)
- **Key Dependencies**: (Add as you include them)

### Infrastructure
- Docker & Docker Compose
- (Add database, caching, etc. as needed)

## Development

### Prerequisites
- Docker and Docker Compose
- Rust (cargo)
- Node.js (if applicable for frontend)

### Running Tests

```bash
# Backend tests
cd backend
cargo test

# Frontend tests
cd frontend
# Add your test command
```

### Code Quality

```bash
# Rust formatting and linting
cd backend
cargo fmt
cargo clippy
```

## Contributing

<!-- Update with your contribution guidelines -->

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Update documentation
5. Submit a pull request

## License

<!-- Add your license -->

## Contact

<!-- Add contact information or links -->
