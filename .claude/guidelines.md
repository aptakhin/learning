## Git Workflow
Push force commands are forbidden for usage.

### Commit Automation
- **Always commit automatically** when a task is completed - do not ask for explicit approval
- **Run pre-commit hooks** (linting, formatting, tests) and fix any issues before committing
- If pre-commit hooks fail, fix the issues and retry the commit - do not skip or bypass them
- Only ask for user intervention if hooks fail repeatedly and cannot be automatically fixed

### Task Completion
Tasks should be completed end-to-end, including:
1. Implementation
2. Fixing any linting/formatting issues
3. Running and fixing any test failures
4. Creating a git commit with a descriptive message

## Communication Style
- **Challenge and propose alternatives**: Don't just execute commands blindly - suggest better approaches when applicable
- **Provide options**: When multiple valid solutions exist, present them with pros/cons and let the user choose
- **Be proactive**: Identify potential issues or improvements and bring them up
- **Question assumptions**: If a request seems suboptimal, explain why and offer alternatives

## Files
All rm commands are strictly prohibited. They should be done manually.

## Security
- **NEVER** commit `.env` files or any files containing secrets, credentials, or sensitive data
- Always use `.env.example` files to document required environment variables
- Keep `.env` files in `.gitignore`
- Developers should configure IDE/OS-specific ignores (like `.vscode/`, `.idea/`, `.DS_Store`) in their global git config, not in the project's `.gitignore`

## Cross-Platform Compatibility
This project supports Windows, Linux, and macOS. When fixing issues:

- **DO NOT** commit machine-specific fixes (e.g., absolute paths, local environment variables)
- **DO NOT** commit OS-specific solutions that only work on one platform
- **DO** ensure solutions work across all three operating systems
- **DO** document platform-specific setup requirements in README.md for users to configure locally
- **DO** keep repository files platform-agnostic

Example: If encountering PATH issues with Git hooks on Windows, document the local fix in README rather than hardcoding paths in hook files.

## General Coding Principles

- Keep code simple and maintainable
- Write clear, self-documenting code
- Test critical functionality
- Follow language-specific best practices

## Fastify Backend Guidelines

Use Kysely for interaction with PostgreSQL in the way of SQL builder.

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

## Documentation

- Update README.md for setup changes
- Document API changes in swagger yaml file [docs/api.yaml](../docs/api.yaml)
- Update architecture docs for significant changes
