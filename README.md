# Learning

A full-stack application built with backend and modern frontend.

## Overview

This project demonstrates a complete web application architecture with:
- **Backend**: based server providing RESTful API
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
├── backend/              # Typescript backend server
├── frontend/             # Frontend application
├── docs/                 # Documentation
├── docker-compose.yaml   # Docker Compose configuration
└── README.md            # This file
```

## Technology Stack

### Backend
- **Runtime**: Node.js 20
- **Framework**: Fastify
- **Database**: PostgreSQL with Kysely query builder
- **Validation**: TypeBox
- **Language**: TypeScript

### Frontend
- **Framework**: Alpine.js (vanilla JavaScript)
- **Styling**: Inline CSS
- **Server**: Nginx

### Infrastructure
- Docker & Docker Compose
- PostgreSQL database
- Nginx web server

## Development

### Prerequisites
- Docker and Docker Compose
- Node.js 20+ (for local development)

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Code Quality

Both frontend and backend include ESLint and Prettier for code quality and consistency.

**Backend linting:**
```bash
cd backend
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix issues
npm run format        # Format code
```

**Frontend linting:**
```bash
cd frontend
npm run lint          # Check HTML structure
npm run format        # Format code
```

**Linting rules enforce:**
- Maximum cyclomatic complexity: 15
- Maximum nesting depth: 4
- Maximum lines per function: 100
- Maximum parameters: 5
- TypeScript strict type checking (backend)

### Pre-commit Hooks

Set up automatic linting before commits:

```bash
cd backend
npm install -D husky lint-staged
npx husky init
echo "npx lint-staged" > .husky/pre-commit
```

Add to `backend/package.json`:
```json
{
  "lint-staged": {
    "src/**/*.ts": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
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
