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
