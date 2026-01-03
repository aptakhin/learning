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
- Write unit tests for business logic
- Add integration tests for API endpoints

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
