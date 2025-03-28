#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Get server name from command line arguments or prompt for it
const serverName = process.argv[2];

if (!serverName) {
  rl.question('Enter the name for your new server: ', (name) => {
    if (!name) {
      console.error('Error: Server name is required');
      rl.close();
      process.exit(1);
    }
    createServer(name);
    rl.close();
  });
} else {
  createServer(serverName);
  rl.close();
}

function createServer(name) {
  const serverPath = path.join(rootDir, 'servers', name);
  
  // Check if the server already exists
  if (fs.existsSync(serverPath)) {
    console.error(`Error: A server with name '${name}' already exists.`);
    process.exit(1);
  }
  
  console.log(`Creating new Express.js server: ${name}`);
  console.log(`Path: ${serverPath}`);
  
  try {
    // Create the server directory and structure
    fs.mkdirSync(path.join(serverPath, 'src', 'routes'), { recursive: true });
    fs.mkdirSync(path.join(serverPath, 'src', 'services'), { recursive: true });
    fs.mkdirSync(path.join(serverPath, 'src', 'types'), { recursive: true });
    
    // Create package.json
    const packageJson = {
      name,
      version: "0.1.0",
      private: true,
      scripts: {
        dev: "tsx watch src/index.ts",
        build: "tsc",
        start: "node dist/index.js",
        lint: "eslint src --ext .ts"
      },
      dependencies: {
        express: "^4.18.2",
        cors: "^2.8.5",
        zod: "^3.23.8",
        "@workspace/shared": "workspace:*"
      },
      devDependencies: {
        "@types/express": "^4.17.21",
        "@types/cors": "^2.8.16",
        "@types/node": "^20.16.11",
        "tsx": "^4.19.1",
        "typescript": "5.6.3"
      }
    };
    
    fs.writeFileSync(
      path.join(serverPath, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );
    
    // Create tsconfig.json
    const tsConfig = {
      extends: "../../packages/config/tsconfig.node.json",
      compilerOptions: {
        outDir: "./dist",
        baseUrl: ".",
        paths: {
          "@/*": ["./src/*"],
          "@workspace/*": ["../../packages/*"]
        }
      },
      include: ["src/**/*"],
      exclude: ["node_modules", "dist"]
    };
    
    fs.writeFileSync(
      path.join(serverPath, 'tsconfig.json'),
      JSON.stringify(tsConfig, null, 2)
    );
    
    // Create index.ts
    const indexFile = `import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Define your routes here
// e.g. app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(\`${name} service running on http://0.0.0.0:\${PORT}\`);
});
`;
    
    fs.writeFileSync(path.join(serverPath, 'src', 'index.ts'), indexFile);
    
    // Create a sample route file
    const routeFile = `import express from 'express';

const router = express.Router();

/**
 * GET /api
 * Basic API information
 */
router.get('/', (req, res) => {
  res.json({
    service: '${name}',
    version: '0.1.0',
    endpoints: [
      { path: '/health', method: 'GET', description: 'Health check endpoint' }
    ]
  });
});

export default router;
`;
    
    fs.writeFileSync(path.join(serverPath, 'src', 'routes', 'index.ts'), routeFile);
    
    // Create types file
    const typesFile = `import { z } from 'zod';

// Define your custom types and zod schemas here
`;
    
    fs.writeFileSync(path.join(serverPath, 'src', 'types', 'index.ts'), typesFile);
    
    // Create README.md
    const readme = `# ${name}

This is an Express.js backend service created within the AI Workspace monorepo.

## Getting Started

First, run the development server:

\`\`\`bash
pnpm dev
\`\`\`

The service will be running on http://localhost:8000.

## API Endpoints

- \`GET /health\`: Health check endpoint

## Learn More

To learn more about the technologies used:

- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Zod Documentation](https://zod.dev/)
`;
    
    fs.writeFileSync(path.join(serverPath, 'README.md'), readme);
    
    // Add the new server to the root tsconfig.json references
    updateRootTsConfig(name);
    
    console.log(`\nSuccessfully created ${name}!`);
    console.log(`To start the development server:`);
    console.log(`  cd servers/${name}`);
    console.log(`  pnpm dev\n`);
    console.log(`Happy coding!`);
  } catch (error) {
    console.error('Error creating server:', error);
    process.exit(1);
  }
}

function updateRootTsConfig(serverName) {
  const tsConfigPath = path.join(rootDir, 'tsconfig.json');
  
  try {
    const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
    
    // Check if the reference already exists
    const existingRefIndex = tsConfig.references.findIndex(
      ref => ref.path === `./servers/${serverName}`
    );
    
    if (existingRefIndex === -1) {
      // Add the new reference
      tsConfig.references.push({ path: `./servers/${serverName}` });
      
      // Write the updated config back to the file
      fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2));
      console.log(`Updated root tsconfig.json with reference to ${serverName}`);
    }
  } catch (error) {
    console.warn(`Warning: Could not update root tsconfig.json: ${error.message}`);
  }
}
