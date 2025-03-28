# Contributing to AI Monorepo

Thank you for considering contributing to this project! This document provides guidelines and instructions for contributing to the monorepo.

## Development Process

### Environment Setup

1. Make sure you have Node.js v20+ installed
2. Install PNPM globally:
   ```bash
   npm install -g pnpm
   ```
3. Clone the repository and install dependencies:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   pnpm install
   ```

### Branch Naming Convention

- Feature branches: `feature/descriptive-name`
- Bug fixes: `fix/issue-description`
- Documentation: `docs/what-is-being-documented`
- Refactoring: `refactor/what-is-being-refactored`

### Commit Message Format

Follow the conventional commits specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: Code changes that neither fix a bug nor add a feature
- `perf`: Performance improvements
- `test`: Adding or correcting tests
- `chore`: Changes to the build process or auxiliary tools

Example:
```
feat(shell-ai): add script validation feature

Implements validation for generated shell scripts to catch syntax errors
before execution.

Closes #123
```

## Monorepo Structure Conventions

### Adding New Components

#### Apps

To add a new frontend application:

```bash
./bin/add-app my-app-name
```

- Place all application code in `apps/my-app-name/src/`
- Keep pages in `apps/my-app-name/src/pages/`
- Add application-specific components in `apps/my-app-name/src/components/`

#### Servers

To add a new backend service:

```bash
./bin/add-server my-service-name
```

- Place all service code in `servers/my-service-name/src/`
- Organize routes in `servers/my-service-name/src/routes/`
- Put business logic in `servers/my-service-name/src/services/`

#### Packages

To add a new shared package:

```bash
./bin/add-package my-package-name
```

- Export all public APIs from `packages/my-package-name/src/index.ts`
- Ensure proper TypeScript types are included

### Code Style Guidelines

- Use TypeScript for all code
- Follow the ESLint configurations
- Document public APIs with JSDoc comments
- Use async/await instead of promises with `.then()`
- Prefer functional approaches over imperative code

## Testing

- Write unit tests for utilities and services
- Write integration tests for API endpoints
- Write component tests for UI components

Run tests with:

```bash
pnpm test
```

## Building

Build the entire monorepo:

```bash
pnpm build
```

Build a specific package/app:

```bash
cd apps/my-app
pnpm build
```

## Review Process

1. Create a pull request against the `main` branch
2. Ensure all CI checks pass
3. Address any review comments
4. Once approved, your PR will be merged

## TypeScript Conventions

- Use explicit types instead of `any`
- Create interfaces for complex objects
- Use type inference where appropriate
- Place shared types in `packages/shared/src/types/`

## UI Component Standards

- Follow the ShadCN UI component patterns
- Use Tailwind CSS for styling
- Ensure components are responsive
- Make components accessible (ARIA attributes, keyboard navigation)

## Documentation

- Update README.md files when adding new features
- Document APIs with JSDoc comments
- Maintain documentation in the appropriate markdown files
- Create examples for complex features

## OpenAI Integration

When working with OpenAI APIs:

- Always check for API key presence before making calls
- Handle rate limiting and errors gracefully
- Optimize prompt design for token efficiency
- Add proper fallbacks for when the API is unavailable

## Continuous Integration

The CI pipeline will:
- Lint your code
- Type check TypeScript
- Run tests
- Build the application

## Questions and Support

If you have questions about contributing:
- Open a discussion on GitHub
- Reach out to the maintainers

Thank you for contributing!