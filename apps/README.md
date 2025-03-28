# 📱 apps/

This folder contains all end-user facing frontend applications built with Next.js.

## Purpose

The `apps/` directory is intended for standalone frontend applications that users directly interact with. Each app in this folder:
- Has its own package.json and dependency management
- Uses a consistent project structure with `/src` directory
- Can be developed, built, and deployed independently
- Shares code with other applications through the packages in the `packages/` directory

## Adding New Apps

To create a new app in the monorepo, use:

```bash
./bin/add-app my-app-name
```

This will create a new Next.js application with the proper configuration and folder structure.

## Structure Expectations

All apps should follow these conventions:
- Use `src/` directory for all source code
- Structure components in `src/components/`
- Place utility functions in `src/lib/`
- Use page router or app router consistently
- Import shared components from `@workspace/ui`
- Import shared types and utilities from `@workspace/shared`

## Current Apps

- **shell-ui**: A Next.js frontend for generating shell scripts through a user-friendly interface

## Reference

For complete configuration details and examples, see the [main-folder-struct.md](../main-folder-struct.md) in the root of the repository.
