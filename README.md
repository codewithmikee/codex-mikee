# 🧠 Replit AI Monorepo for AI Projects

This is a monorepo for AI projects using Next.js for frontend applications and Express.js for backend services.

## ⚠️ Important: Package Management

> **WARNING**: This project uses **PNPM EXCLUSIVELY** for package management.
> 
> DO NOT use npm or yarn commands as they will break workspace dependencies.
> Always use `pnpm` for all package operations:
> - ✅ `pnpm install`
> - ✅ `pnpm add package-name`
> - ✅ `pnpm run command`
> - ❌ DO NOT use npm or yarn

## 📦 Monorepo Tech Stack

- All backend services use:
  - **Express.js**
  - **TypeScript**
  - **src/** folder structure

- All frontend apps use:
  - **Next.js (App Router)**
  - **TypeScript**
  - **pnpm Workspaces**
  - **TailwindCSS + ShadCN UI** (UI components live in `packages/ui`)
  - **src/** folder structure

## 🚀 Custom Commands

This monorepo comes with custom commands to simplify workspace management:

### Direct Script Usage:

- **Add a new app:** 
  ```bash
  ./bin/add-app my-app
  ```

- **Add a new server:** 
  ```bash
  ./bin/add-server my-server
  ```

- **Add a new package:** 
  ```bash
  ./bin/add-package my-package
  ```

### PNPM Command Style:

You can also use the familiar PNPM command style:

```bash
./bin/pnpm-run add:app my-app
./bin/pnpm-run add:server my-server
./bin/pnpm-run add:package my-package
```

These commands create the necessary files and configurations automatically. See `bin/README.md` for more details.

## 🗂 Folder Structure

This monorepo follows a specific structure to keep concerns separated and dependencies clearly defined:

- **apps/**: Next.js frontend applications
  - Currently contains shell-ui, a Next.js app for shell script generation UI

- **servers/**: Express.js backend services
  - Currently contains shell-ai, a service for AI-powered shell script generation

- **packages/**: Shared libraries and configurations
  - **ui/**: ShadCN UI components and design system
  - **config/**: Shared configuration for TypeScript, ESLint, etc.
  - **shared/**: Common types, utilities, and interfaces

- **bin/**: Helper scripts for monorepo management
  - Contains scripts to create new apps, servers, and packages

## 📚 Documentation

- [AI Integration Guide](./AI_README.md): How to set up OpenAI API keys and configure AI models
- [Deployment Guide](./DEPLOY.md): Instructions for deploying to various platforms
- [AI Integration Progress](./ai-integration-progress.md): Current state and plans for AI features

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   ./run-shell-apps.sh
   ```
4. Open your browser to `http://localhost:5000`

## 🧪 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

Please follow the [contributing guidelines](./CONTRIBUTING.md) when making changes to the project.

