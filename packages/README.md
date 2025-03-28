# 📦 packages/

This folder contains all shared reusable logic across backend and frontend applications.

## Purpose

The `packages/` directory is intended for code that needs to be shared between multiple applications or services. Each package in this folder:
- Has a focused, single responsibility
- Exports a clean, well-documented API
- Is versioned and maintained separately
- Can be imported using the `@workspace/*` alias

## Adding New Packages

To create a new package in the monorepo, use:

```bash
./bin/add-package my-package-name
```

This will create a new package with the proper configuration and folder structure.

## Structure Expectations

All packages should follow these conventions:
- Use `src/` directory for all source code
- Export all public APIs from `src/index.ts`
- Include TypeScript type definitions
- Use meaningful documentation comments
- Maintain backward compatibility when updated
- Cross-imports should use the `@workspace/...` syntax

## Current Packages

- **ui**: ShadCN UI components and design system shared across all frontend applications
- **config**: Shared TypeScript and build configuration files
- **shared**: Shared types, schemas, and utilities used by both frontend and backend

## Subfolders May Include:
- `ui/` — shared ShadCN UI components
- `types/` — shared type declarations
- `ai-agent/` — core agent logic like orchestration and tools

## Reference

For complete configuration details and examples, see the [main-folder-struct.md](../main-folder-struct.md) in the root of the repository.
