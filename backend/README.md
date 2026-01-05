# Learning Backend API

Node.js backend API built with Fastify and Kysely for the Learning platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. Run database migrations:
```bash
npm run migrate:latest
```

4. Build TypeScript:
```bash
npm run build:ts
```

5. Start the server:
```bash
npm run dev
```

The API will be available at `http://localhost:8080`

## Database Configuration

The application connects to PostgreSQL with the following default settings:
- Host: localhost
- Port: 5432
- User: postgres
- Password: postgres
- Database: learning

Update these in your `.env` file as needed.

## API Endpoints

### Entities

#### GET /entities
Get all entities, ordered by creation date (newest first).

**Response:**
```json
[
  {
    "id": "uuid",
    "kind": "freelearning.org/Project",
    "version": "1.0.0",
    "data": {},
    "created_at": "2026-01-03T10:00:00Z",
    "updated_at": "2026-01-03T10:00:00Z"
  }
]
```

#### POST /entities
Create a new entity.

**Request Body:**
```json
{
  "kind": "freelearning.org/Project",
  "version": "1.0.0",
  "data": {
    "name": "My Project",
    "description": "Project description"
  }
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "kind": "freelearning.org/Project",
  "version": "1.0.0",
  "data": {
    "name": "My Project",
    "description": "Project description"
  },
  "created_at": "2026-01-03T10:00:00Z",
  "updated_at": "2026-01-03T10:00:00Z"
}
```

#### PUT /entities/:id
Update an existing entity.

**Request Body (all fields optional):**
```json
{
  "kind": "freelearning.org/Task",
  "version": "1.1.0",
  "data": {
    "name": "Updated Project"
  }
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "kind": "freelearning.org/Task",
  "version": "1.1.0",
  "data": {
    "name": "Updated Project"
  },
  "created_at": "2026-01-03T10:00:00Z",
  "updated_at": "2026-01-03T10:15:00Z"
}
```

**Error Responses:**
- `400` - No fields to update
- `404` - Entity not found

## Validation Rules

### Kind Format
Must match pattern: `domain.tld/TypeName` (type must start with capital letter)
- Domain: lowercase letters, digits, dots, and hyphens
- Type: must start with uppercase letter, followed by letters, digits, or underscores
- Examples: `freelearning.org/Project`, `freelearning.org/Task`, `freelearning.org/Note`

### Version Format
Must be semantic version: `major.minor.patch`
- Examples: `1.0.0`, `2.1.3`

### Data
Any valid JSON object.

## Code Quality

### Linting and Formatting

The project uses ESLint and Prettier to maintain code quality and consistent style.

**Available commands:**
- `npm run lint` - Check for linting issues
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted correctly

**Linting rules enforce:**
- Maximum cyclomatic complexity: 15
- Maximum nesting depth: 4
- Maximum lines per function: 100
- Maximum parameters per function: 5
- Maximum nested callbacks: 3
- TypeScript strict type checking
- No unused variables (prefix with `_` to explicitly ignore)

### Pre-commit Hooks

To automatically lint and format your code before each commit, set up a pre-commit hook:

1. Install husky and lint-staged:
```bash
npm install -D husky lint-staged
```

2. Initialize husky:
```bash
npx husky init
```

3. Create the pre-commit hook:
```bash
echo "npx lint-staged" > .husky/pre-commit
```

4. Add lint-staged configuration to `package.json`:
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

Now your code will be automatically linted and formatted before each commit!

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build:ts` - Build TypeScript
- `npm run start` - Start production server
- `npm test` - Run tests
- `npm run migrate:latest` - Run all pending migrations
- `npm run migrate:make` - Create a new migration
- `npm run lint` - Check for linting issues
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting

## Tech Stack

- **Fastify** - Fast web framework
- **Kysely** - Type-safe SQL query builder
- **PostgreSQL** - Database
- **TypeBox** - Schema validation
- **TypeScript** - Type safety
- **ESLint** - Code linting
- **Prettier** - Code formatting
