# 🖥️ servers/

This folder contains all backend microservices, APIs, and computational services.

## Purpose

The `servers/` directory is intended for standalone backend services that provide APIs, process data, or interact with external systems. Each server in this folder:
- Has its own package.json and dependency management
- Uses Express.js with TypeScript by default
- Can be developed, built, and deployed independently
- Shares code with other services through the packages in the `packages/` directory

## Adding New Servers

To create a new server in the monorepo, use:

```bash
./bin/add-server my-server-name
```

This will create a new Express.js server with the proper configuration and folder structure.

## Structure Expectations

All servers should follow these conventions:
- Use `src/` directory for all source code
- Structure API routes in `src/routes/`
- Place business logic in `src/services/`
- Define types and interfaces in `src/types/`
- Import shared types and utilities from `@workspace/shared`
- Include proper error handling and logging
- Use environment variables for configuration

## Current Servers

- **shell-ai**: An Express.js service for generating shell scripts with AI capabilities

## Reference

For complete configuration details and examples, see the [main-folder-struct.md](../main-folder-struct.md) in the root of the repository.
