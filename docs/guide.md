# Coding Guidelines for Claude Code

## General Principles
<!-- High-level coding principles for this project -->

- Keep code simple and maintainable
- Write clear, self-documenting code
- Test critical functionality
- Follow language-specific best practices

## Fastify Backend Guidelines

Use Kysely for interaction with PostgreSQL in the way of SQL builder.

### Code Style

### Testing

#### Integration Tests (Required)
For **every API endpoint created**, write integration tests using TypeScript, Vitest, and Fastify's `.inject()` method.

**Test File Location:**
- Place tests next to the route file: `src/routes/entities/index.test.ts`
- Or in a dedicated test directory: `test/routes/entities.test.ts`

**Required tests for each endpoint:**

1. **GET endpoints** - Verify successful response and correct data structure
2. **POST endpoints** - Verify entity creation with valid data and validation errors
3. **PUT endpoints** - Verify entity updates, validation errors, and 404 responses
4. **DELETE endpoints** - Verify entity deletion (when implemented)

**Example test file structure:**

```typescript
// src/routes/entities/index.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import Fastify from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import databasePlugin from '../../plugins/database.js'
import entitiesRoutes from './index.js'

describe('Entities API', () => {
  const app = Fastify().withTypeProvider<TypeBoxTypeProvider>()
  let entityId: string

  beforeAll(async () => {
    await app.register(databasePlugin)
    app.register(entitiesRoutes, { prefix: '/entities' })
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('GET /entities', () => {
    it('should return empty array initially', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/entities'
      })

      expect(response.statusCode).toBe(200)
      expect(response.json()).toEqual([])
    })
  })

  describe('POST /entities', () => {
    it('should create a new entity', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/entities',
        payload: {
          kind: 'freelearning.org/PROJECT',
          version: '1.0.0',
          data: { name: 'Test Project' }
        }
      })

      expect(response.statusCode).toBe(201)
      const body = response.json()
      expect(body).toHaveProperty('id')
      expect(body.kind).toBe('freelearning.org/PROJECT')
      expect(body.version).toBe('1.0.0')
      entityId = body.id
    })

    it('should reject invalid kind format', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/entities',
        payload: {
          kind: 'invalid-format',
          version: '1.0.0',
          data: {}
        }
      })

      expect(response.statusCode).toBe(400)
    })
  })

  describe('PUT /entities/:id', () => {
    it('should update an existing entity', async () => {
      const response = await app.inject({
        method: 'PUT',
        url: `/entities/${entityId}`,
        payload: {
          version: '1.1.0',
          data: { name: 'Updated Project' }
        }
      })

      expect(response.statusCode).toBe(200)
      const body = response.json()
      expect(body.version).toBe('1.1.0')
      expect(body.data.name).toBe('Updated Project')
    })

    it('should return 404 for non-existent entity', async () => {
      const response = await app.inject({
        method: 'PUT',
        url: '/entities/00000000-0000-0000-0000-000000000000',
        payload: { version: '1.0.0' }
      })

      expect(response.statusCode).toBe(404)
    })

    it('should return 400 when no fields provided', async () => {
      const response = await app.inject({
        method: 'PUT',
        url: `/entities/${entityId}`,
        payload: {}
      })

      expect(response.statusCode).toBe(400)
      expect(response.json()).toHaveProperty('error', 'No fields to update')
    })
  })
})
```

**Running Tests:**
```bash
npm test                 # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage
```

**When to write tests:**
- Write tests BEFORE or IMMEDIATELY AFTER creating endpoints
- Add tests for every new endpoint
- Add tests when fixing bugs (regression tests)
- Update tests when modifying existing endpoints

#### Unit Tests
- Write unit tests for business logic functions
- Test edge cases and error handling
- Use Vitest as the testing framework
- Keep tests close to the code they test
- Mock database calls when testing business logic in isolation

## Frontend Guidelines
<!-- Frontend-specific standards - update based on your framework -->

### Code Style
<!-- Add your frontend framework's style guidelines -->

### Component Structure
<!-- Add component organization patterns -->

## Git Workflow
<!-- How to handle commits, branches, PRs -->

### Commit Messages
- Use clear, descriptive commit messages
- Start with a verb (Add, Update, Fix, Remove, etc.)
- Keep first line under 72 characters

### Branches
- Main branch: `main`
- Feature branches: descriptive names

## Documentation
<!-- When and how to document -->

- Update README.md for setup changes
- Document API changes in swagger yaml file [docs/api.yaml](../docs/api.yaml)
- Update architecture docs for significant changes

## Security
<!-- Security considerations -->

- Never commit secrets or credentials
- Validate all user input
- Use environment variables for configuration
- Follow OWASP best practices
