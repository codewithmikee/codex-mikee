# Monorepo Custom Commands

This directory contains custom commands for managing the monorepo structure.

## Available Commands

### Direct Script Usage

#### `add-app`

Creates a new Next.js application in the `apps/` directory.

```bash
./bin/add-app my-app
```

#### `add-server`

Creates a new Express.js server in the `servers/` directory.

```bash
./bin/add-server my-server
```

#### `add-package`

Creates a new shared package in the `packages/` directory.

```bash
./bin/add-package my-package
```

### PNPM Command Style

Use the `pnpm-run` script to execute commands in a PNPM-like style:

```bash
./bin/pnpm-run add:app my-app
./bin/pnpm-run add:server my-server
./bin/pnpm-run add:package my-package
```

## Using with PNPM

If you want to create real PNPM commands, you can create aliases in your shell:

```bash
# Add these to your .bashrc or .zshrc
alias pnpm-add-app="./bin/add-app"
alias pnpm-add-server="./bin/add-server"
alias pnpm-add-package="./bin/add-package"
```

## Features

- Automatically creates the necessary directory structure
- Sets up package.json with correct dependencies
- Configures TypeScript for the new component
- Updates root tsconfig.json references
- Creates sample files to get started quickly