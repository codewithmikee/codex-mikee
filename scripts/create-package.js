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

// Get package name from command line arguments or prompt for it
const packageName = process.argv[2];

if (!packageName) {
  rl.question('Enter the name for your new package: ', (name) => {
    if (!name) {
      console.error('Error: Package name is required');
      rl.close();
      process.exit(1);
    }
    createPackage(name);
    rl.close();
  });
} else {
  createPackage(packageName);
  rl.close();
}

function createPackage(name) {
  const packagePath = path.join(rootDir, 'packages', name);
  
  // Check if the package already exists
  if (fs.existsSync(packagePath)) {
    console.error(`Error: A package with name '${name}' already exists.`);
    process.exit(1);
  }
  
  console.log(`Creating new package: ${name}`);
  console.log(`Path: ${packagePath}`);
  
  try {
    // Create the package directory and structure
    fs.mkdirSync(path.join(packagePath, 'src'), { recursive: true });
    
    // Ask if this is a UI component package
    const isUiPackage = name === 'ui' || name.startsWith('ui-');
    
    // Create package.json
    let packageJson = {
      name: `@workspace/${name}`,
      version: "0.1.0",
      private: true,
      main: "dist/index.js",
      types: "dist/index.d.ts",
      scripts: {
        build: "tsc",
        dev: "tsc --watch",
        lint: "eslint src --ext .ts,.tsx"
      },
      dependencies: {},
      devDependencies: {
        typescript: "5.6.3"
      }
    };
    
    // Add UI-specific dependencies if it's a UI package
    if (isUiPackage) {
      packageJson.dependencies = {
        ...packageJson.dependencies,
        "class-variance-authority": "^0.7.0",
        "clsx": "^2.1.1",
        "tailwind-merge": "^2.5.4"
      };
      
      packageJson.peerDependencies = {
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
      };
      
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        "@types/react": "^18.3.11",
        "@types/react-dom": "^18.3.1",
        "tailwindcss": "^3.4.14"
      };
    }
    
    fs.writeFileSync(
      path.join(packagePath, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );
    
    // Create tsconfig.json
    const tsConfig = {
      extends: "../../packages/config/tsconfig.base.json",
      compilerOptions: {
        outDir: "./dist",
        rootDir: "./src",
        composite: true,
        declaration: true,
        declarationMap: true,
        sourceMap: true
      },
      include: ["src/**/*"],
      exclude: ["node_modules", "dist"]
    };
    
    // Add JSX settings for UI packages
    if (isUiPackage) {
      tsConfig.compilerOptions.jsx = "react-jsx";
    }
    
    fs.writeFileSync(
      path.join(packagePath, 'tsconfig.json'),
      JSON.stringify(tsConfig, null, 2)
    );
    
    // Create index.ts
    const indexContent = isUiPackage
      ? `// Export all components from a single entry point

// Example export:
// export * from './button';
// export * from './card';
`
      : `/**
 * @workspace/${name}
 * 
 * Package description goes here
 */

// Export your package contents here
// Example:
// export { myFunction } from './utils/myFunction';
// export type { MyType } from './types';
`;
    
    fs.writeFileSync(path.join(packagePath, 'src', 'index.ts'), indexContent);
    
    // Create utils.ts for UI packages
    if (isUiPackage) {
      const utilsContent = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;
      
      fs.writeFileSync(path.join(packagePath, 'src', 'utils.ts'), utilsContent);
      
      // Create tailwind.config.js for UI packages
      const tailwindConfig = `import type { Config } from "tailwindcss";

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
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
`;
      
      fs.writeFileSync(path.join(packagePath, 'tailwind.config.ts'), tailwindConfig);
    }
    
    // Create README.md
    const readme = `# @workspace/${name}

This is a package created within the AI Workspace monorepo.

## Installation

This package is available as part of the monorepo and can be imported by other packages:

\`\`\`tsx
import { /* components or functions */ } from '@workspace/${name}';
\`\`\`

## Usage

Documentation for how to use this package goes here.

## Development

To build the package:

\`\`\`bash
pnpm build
\`\`\`

To watch for changes during development:

\`\`\`bash
pnpm dev
\`\`\`
`;
    
    fs.writeFileSync(path.join(packagePath, 'README.md'), readme);
    
    // Add the new package to the root tsconfig.json references
    updateRootTsConfig(name);
    
    console.log(`\nSuccessfully created package: ${name}!`);
    console.log(`To build the package:`);
    console.log(`  pnpm --filter @workspace/${name} build\n`);
    console.log(`Happy coding!`);
  } catch (error) {
    console.error('Error creating package:', error);
    process.exit(1);
  }
}

function updateRootTsConfig(packageName) {
  const tsConfigPath = path.join(rootDir, 'tsconfig.json');
  
  try {
    const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
    
    // Check if the reference already exists
    const existingRefIndex = tsConfig.references.findIndex(
      ref => ref.path === `./packages/${packageName}`
    );
    
    if (existingRefIndex === -1) {
      // Add the new reference
      tsConfig.references.push({ path: `./packages/${packageName}` });
      
      // Write the updated config back to the file
      fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2));
      console.log(`Updated root tsconfig.json with reference to ${packageName}`);
    }
  } catch (error) {
    console.warn(`Warning: Could not update root tsconfig.json: ${error.message}`);
  }
}
