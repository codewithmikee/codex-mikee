# 🧠 Replit AI Monorepo for AI Projects

This is a monorepo for AI projects using Next.js for frontend applications and Express.js for backend services.

## 📦 Monorepo Tech Stack

- All backend services use:
  - **Express.js**
  - **TypeScript**
  - **src/** folder structure

- All frontend apps use:
  - **Next.js (App Router)**
  - **TypeScript**
  - **pnpm**
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

