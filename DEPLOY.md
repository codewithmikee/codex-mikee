# Deployment Guide

This guide explains how to deploy the monorepo and its various components to production environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Deployment Options](#deployment-options)
  - [Full Stack Deployment](#full-stack-deployment)
  - [Frontend-Only Deployment](#frontend-only-deployment)
  - [Backend-Only Deployment](#backend-only-deployment)
- [Deployment Platforms](#deployment-platforms)
  - [Replit](#replit)
  - [Vercel](#vercel)
  - [Railway](#railway)
  - [Fly.io](#flyio)
  - [Render](#render)
- [CI/CD Integration](#cicd-integration)

## Prerequisites

- Node.js 20 or later
- PNPM 8 or later
- Git

## Environment Setup

Before deploying, ensure you have the following environment variables set:

### Core Environment Variables

```
NODE_ENV=production
PORT=5000 (or your preferred port)
```

### AI Service Variables

```
OPENAI_API_KEY=your_api_key
```

See [AI_README.md](./AI_README.md) for detailed OpenAI API key setup instructions.

## Deployment Options

### Full Stack Deployment

To deploy the entire application stack (frontend + backend + AI service):

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Build the application:
   ```bash
   pnpm run build
   ```

4. Start the application:
   ```bash
   NODE_ENV=production pnpm run start
   ```

This will build the frontend assets and serve them through the Express server along with the backend API.

### Frontend-Only Deployment

To deploy just the frontend (useful for static hosting):

1. Navigate to the frontend directory:
   ```bash
   cd apps/shell-ui
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Build the frontend:
   ```bash
   pnpm run build
   ```

4. The output will be in the `apps/shell-ui/dist` directory, which can be deployed to any static hosting provider.

5. **Important**: You'll need to configure the API endpoint in the frontend to point to your separately deployed backend:
   
   ```typescript
   // In apps/shell-ui/src/lib/api.ts
   const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-backend-url.com';
   ```

### Backend-Only Deployment

To deploy just the backend services:

1. Navigate to the server directory:
   ```bash
   cd servers/shell-ai
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Build the server:
   ```bash
   pnpm run build
   ```

4. Start the server:
   ```bash
   NODE_ENV=production pnpm run start
   ```

## Deployment Platforms

### Replit

This project is optimized for Replit deployment:

1. Import the GitHub repository into Replit
2. Set up secrets in the Replit environment:
   - `OPENAI_API_KEY`
3. Run the application using the built-in run command

### Vercel

For deploying the frontend to Vercel:

1. Connect your GitHub repository to Vercel
2. Configure the build settings:
   - Build command: `cd apps/shell-ui && pnpm install && pnpm run build`
   - Output directory: `apps/shell-ui/dist`
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL=https://your-backend-url.com`

### Railway

For deploying the backend to Railway:

1. Connect your GitHub repository to Railway
2. Configure the deployment:
   - Root directory: `servers/shell-ai`
   - Build command: `pnpm install && pnpm run build`
   - Start command: `pnpm run start`
3. Add environment variables:
   - `NODE_ENV=production`
   - `OPENAI_API_KEY=your_api_key`
   - `PORT=5000`

### Fly.io

For deploying the backend to Fly.io:

1. Create a `fly.toml` file in the root of your project:
   ```toml
   app = "your-app-name"
   
   [build]
     dockerfile = "Dockerfile"
   
   [env]
     NODE_ENV = "production"
     PORT = "8080"
   
   [http_service]
     internal_port = 8080
     force_https = true
   ```

2. Create a Dockerfile:
   ```dockerfile
   FROM node:20-slim
   
   RUN npm install -g pnpm
   
   WORKDIR /app
   
   COPY . .
   
   RUN pnpm install
   RUN pnpm run build
   
   EXPOSE 8080
   
   CMD ["pnpm", "run", "start"]
   ```

3. Deploy with the Fly CLI:
   ```bash
   fly launch
   fly secrets set OPENAI_API_KEY=your_api_key
   fly deploy
   ```

### Render

For deploying the backend to Render:

1. Connect your GitHub repository to Render
2. Create a Web Service
3. Configure the deployment:
   - Root directory: `servers/shell-ai`
   - Build command: `pnpm install && pnpm run build`
   - Start command: `pnpm run start`
4. Add environment variables:
   - `NODE_ENV=production`
   - `OPENAI_API_KEY=your_api_key`
   - `PORT=10000`

## CI/CD Integration

For continuous integration and deployment, consider setting up GitHub Actions:

1. Create a `.github/workflows/deploy.yml` file:
   ```yaml
   name: Deploy

   on:
     push:
       branches: [main]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: '20'
         - name: Install PNPM
           run: npm install -g pnpm
         - name: Install dependencies
           run: pnpm install
         - name: Build application
           run: pnpm run build
         - name: Deploy to production
           # Add your deployment provider's CLI or API commands here
   ```

## Post-Deployment Verification

After deploying, verify the following:

1. The frontend is accessible and displays correctly
2. API endpoints are responding
3. AI features are working properly
4. Error logging is functional

## Troubleshooting

- **Cross-Origin Issues**: If experiencing CORS errors, ensure the backend has proper CORS configuration for your frontend domain
- **Environment Variables**: Verify all required environment variables are set in your deployment environment
- **Build Failures**: Check that your deployment platform has sufficient memory for the build process
- **Backend Connectivity**: Verify that your frontend can reach your backend API endpoints