# AI Workspace Monorepo Structure

This document outlines the structure and purpose of each main folder in the monorepo, providing configuration details and guidelines for development.

## 📁 apps/

### 🧭 Description
This folder contains all end-user facing frontend applications.
Each subfolder is a standalone Next.js App Router project with its own package.json, configuration, and build process.

- **When to use**: For creating new web applications that users will interact with directly.
- **Naming conventions**: Use kebab-case for app names (e.g., `shell-ui`, `admin-panel`).
- **Creation**: Use `./bin/add-app my-app-name` to create a new app.

### 📦 Configuration Breakdown

#### apps/shell-ui/package.json
```json
{
  "name": "@workspace/shell-ui",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build", 
    "start": "next start", 
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@tanstack/react-query": "^5.60.5",
    "@workspace/ui": "workspace:*",
    "@workspace/shared": "workspace:*",
    "lucide-react": "^0.453.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.4",
    "zod": "^3.23.8",
    "react-hook-form": "^7.53.1",
    "@hookform/resolvers": "^3.9.1"
  }
}
```

#### apps/shell-ui/tsconfig.json
```json
{
  "extends": "../../packages/config/tsconfig.nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@workspace/*": ["../../packages/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

---

## 📁 servers/

### 🧭 Description
This folder contains all backend services and APIs.
Each subfolder is a standalone Express.js or other Node.js server with its own package.json, configuration, and build process.

- **When to use**: For creating new backend services, APIs, or microservices.
- **Naming conventions**: Use kebab-case for server names (e.g., `shell-ai`, `authentication-service`).
- **Creation**: Use `./bin/add-server my-server-name` to create a new server.

### 📦 Configuration Breakdown

#### servers/shell-ai/package.json
```json
{
  "name": "shell-ai",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "lint": "eslint src --ext .ts"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "zod": "^3.23.8",
    "@workspace/shared": "workspace:*"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.16",
    "@types/node": "^20.16.11",
    "tsx": "^4.19.1",
    "typescript": "5.6.3"
  }
}
```

#### servers/shell-ai/tsconfig.json
```json
{
  "extends": "../../packages/config/tsconfig.node.json",
  "compilerOptions": {
    "outDir": "./dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@workspace/*": ["../../packages/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 📁 packages/

### 🧭 Description
This folder contains all shared code, utilities, and components used across multiple apps and servers.
Each package should focus on a specific domain or functionality.

- **When to use**: For creating reusable code that will be shared between multiple projects.
- **Naming conventions**: Use descriptive, lowercase names (e.g., `ui`, `shared`, `config`).
- **Creation**: Use `./bin/add-package my-package-name` to create a new package.
- **Types of packages**: UI components, shared types, configuration, utilities, business logic.

### 📦 Configuration Breakdown

#### packages/ui/package.json
```json
{
  "name": "@workspace/ui",
  "version": "0.1.0",
  "private": true,
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "lint": "eslint src --ext .ts,.tsx"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.4"
  },
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "typescript": "5.6.3",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "tailwindcss": "^3.4.14"
  }
}
```

#### packages/ui/tsconfig.json
```json
{
  "extends": "../../packages/config/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

#### packages/ui/tailwind.config.ts
```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // More color definitions...
      },
      // More theme extensions...
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

---

## 📁 scripts/

### 🧭 Description
This folder contains utility scripts for project management, code generation, and automation.
These scripts help maintain the monorepo structure and simplify common tasks.

- **When to use**: For creating tools and scripts that help with monorepo management.
- **Types of scripts**: Workspace creation, code generation, build automation.

### 📦 Configuration Breakdown
Scripts are standalone Node.js files that typically don't have their own configuration files.

---

## 📁 client/

### 🧭 Description
This folder contains the main client-side application powered by Vite and React.
It includes UI components, state management, and routing logic.

- **When to use**: For developing the main client-side application.
- **Structure**: Contains pages, components, and hooks.

### 📦 Configuration Breakdown

The client folder doesn't have its own package.json as it's part of the root project.

---

## 📁 server/

### 🧭 Description
This folder contains the main Express server that powers the application.
It handles API routes, middleware, and integrates with Vite for development.

- **When to use**: For developing the main backend server functionality.
- **Structure**: Contains routes, middleware, and utility functions.

### 📦 Configuration Breakdown

The server folder doesn't have its own package.json as it's part of the root project.

---

## 📁 shared/

### 🧭 Description
This folder contains schemas and types shared between client and server.
It primarily holds Drizzle schema definitions and related types.

- **When to use**: For defining shared database schemas and types.
- **Structure**: Contains schema definitions and type exports.

### 📦 Configuration Breakdown

The shared folder doesn't have its own package.json as it's part of the root project.

---

## 📁 bin/

### 🧭 Description
This folder contains executable scripts for common monorepo operations.
These scripts provide shortcuts to the scripts in the scripts/ folder.

- **When to use**: For accessing common monorepo management commands.
- **Available scripts**: 
  - `add-app`: Creates a new Next.js application
  - `add-server`: Creates a new Express server
  - `add-package`: Creates a new shared package

### 📦 Configuration Breakdown

The bin folder contains shell scripts that delegate to the JavaScript files in the scripts/ folder.

---

## Root Configuration Files

### package.json
```json
{
  "name": "rest-express",
  "version": "1.0.0",
  "type": "module",
  "license": "MIT",
  "scripts": {
    "dev": "tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "check": "tsc",
    "db:push": "drizzle-kit push"
  },
  // Dependencies and devDependencies omitted for brevity
}
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "strict": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "composite": true,
    "declaration": true,
    "noEmit": true,
    "resolveJsonModule": true,
    "paths": {
      "@workspace/*": ["./packages/*"]
    }
  },
  "include": [],
  "exclude": ["node_modules", "dist", "build", "**/*.test.ts"],
  "references": [
    { "path": "./packages/config" },
    { "path": "./packages/ui" },
    { "path": "./packages/shared" },
    { "path": "./apps/shell-ui" },
    { "path": "./servers/shell-ai" }
  ]
}
```

### pnpm-workspace.yaml
```yaml
packages:
  - 'apps/*'
  - 'servers/*'
  - 'packages/*'
```

### tailwind.config.ts
```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Theme extensions omitted for brevity
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
```

### theme.json
```json
{
  "variant": "professional",
  "primary": "hsl(222.2 47.4% 11.2%)",
  "appearance": "light",
  "radius": 0.5
}
```

### vite.config.ts
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    // Additional plugins...
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
});
```

### drizzle.config.ts
```typescript
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
```

### postcss.config.js
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### run-shell-apps.sh
```bash
#!/bin/bash

# Kill any existing node processes
# echo "Killing existing node processes..."
# pkill -f node || true

# Wait for ports to be released
sleep 1

# Start the shell-ai server in the background
echo "Starting shell-ai server..."
cd servers/shell-ai && npx tsx src/index.ts &
SHELL_AI_PID=$!

# Wait for shell-ai to start
echo "Waiting for shell-ai server to start..."
sleep 3

# Start the main application
echo "Starting main application..."
npm run dev

# Kill the shell-ai server when the main app is stopped
echo "Shutting down shell-ai server..."
kill $SHELL_AI_PID
```