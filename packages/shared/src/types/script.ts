import { z } from 'zod';

/**
 * Script request schema
 */
export const ScriptRequestSchema = z.object({
  task: z.string().min(1, "Task description is required"),
  details: z.string().default(""),
  technologies: z.array(z.string()).default([]),
});

/**
 * Type for script generation request
 */
export type ScriptRequest = z.infer<typeof ScriptRequestSchema>;

/**
 * Type for script generation response
 */
export interface ScriptResponse {
  script: string;
}
