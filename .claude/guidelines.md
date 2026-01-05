## Git Workflow
Push force commands are forbidden for usage.

## Files
All rm commands are strictly prohibited. They should be done manually.

## Cross-Platform Compatibility
This project supports Windows, Linux, and macOS. When fixing issues:

- **DO NOT** commit machine-specific fixes (e.g., absolute paths, local environment variables)
- **DO NOT** commit OS-specific solutions that only work on one platform
- **DO** ensure solutions work across all three operating systems
- **DO** document platform-specific setup requirements in README.md for users to configure locally
- **DO** keep repository files platform-agnostic

Example: If encountering PATH issues with Git hooks on Windows, document the local fix in README rather than hardcoding paths in hook files.
