# Coding Guidelines for Claude Code

## General Principles
<!-- High-level coding principles for this project -->

- Keep code simple and maintainable
- Write clear, self-documenting code
- Test critical functionality
- Follow language-specific best practices

## Rust Backend Guidelines
<!-- Rust-specific coding standards -->

### Code Style
- Follow standard Rust formatting (rustfmt)
- Use idiomatic Rust patterns
- Prefer explicit error handling over panics
- Add documentation comments for public APIs

### Error Handling
- Use `Result<T, E>` for operations that can fail
- Create custom error types when appropriate
- Provide meaningful error messages

### Testing
- Write unit tests for business logic
- Add integration tests for API endpoints
- Use `cargo test` to run test suite

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
- Document API changes in [docs/api.md](../docs/api.md)
- Update architecture docs for significant changes

## Security
<!-- Security considerations -->

- Never commit secrets or credentials
- Validate all user input
- Use environment variables for configuration
- Follow OWASP best practices
