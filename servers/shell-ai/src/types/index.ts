import { z } from 'zod';
import { ScriptRequest } from '@workspace/shared';

export type { ScriptRequest } from '@workspace/shared';

// Request validation schema
export const ScriptRequestSchema = z.object({
  task: z.string().min(1, "Task description is required"),
  details: z.string().default(""),
  technologies: z.array(z.string()).default([]),
});
