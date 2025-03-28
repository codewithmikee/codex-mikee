 
TASK 1. # Generate a markdown file and individual README files that document each main/standalone workspace folder in my monorepo, including purpose, usage, and config visibility.

⸻

✅ Output 1: main-folder-struct.md

Create a markdown file at the root:

main-folder-struct.md

It should contain:

For Each Top-Level Folder (apps/, servers/, packages/, client, server.. etc. DONOT INCLUDE config folders and node_modules)

1. 📁 Folder Name

Example:

## apps/

2. 🧭 Description

Explain:
	•	What belongs here
	•	When and how it should be used
	•	Any naming conventions

3. 📦 Configuration Breakdown

For each of the following config files (if they exist in that folder), list the full file content in a code block:
	•	package.json
	•	tsconfig.json
	•	tailwind.config.ts or .js
	•	postcss.config.js (if present)

Example section:

### apps/

This folder contains all end-user facing frontend applications.
Each subfolder is a standalone Next.js App Router project.

#### Example Config: apps/shell-ui/package.json

```json
{
  "name": "shell-ui",
  "version": "0.1.0",
  ...
}

---

## ✅ Output 2: README.md Files Inside Each Main Folder

Generate a `README.md` inside each of the following:

- `apps/`
- `servers/` (or `backends/`)
- `packages/`
- Any other future root-level workspaces

### README contents should include:

- ✅ Purpose of the folder
- ✅ How new workspaces should be added (e.g., `pnpm add:app` or `pnpm add:package`)
- ✅ Structure expectations (must use `src/`, alias rules, export conventions)
- ✅ Link back to `main-folder-struct.md` for full config reference

Example for `packages/README.md`:
```md
# 📦 packages/

This folder contains all shared reusable logic across backend and frontend.

### Subfolders May Include:
- `ui/` — shared ShadCN UI components
- `types/` — shared type declarations
- `ai-agent/` — core agent logic like MCP, orchestration, tools

### Rules:
- Every folder must use `src/`
- Must export from `src/index.ts`
- Cross-imports should use @workspace/...



⸻

📌 Notes
	•	The goal is to educate and standardize contributor understanding.
	•	Replit should auto-read the existing folders and files to build this documentation accurately.
	•	Future contributors should be able to read this and instantly understand what belongs where and why.
 

TASK 2. # Create ai-integration-progress.md
- explaining how the ai has been integrated (if not integreated yet explanation when will the integration be done)
- requirements included

 