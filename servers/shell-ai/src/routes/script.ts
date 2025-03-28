import express from 'express';
import { z } from 'zod';
import { generateShellScript } from '../services/script-generator';
import { ScriptRequestSchema } from '../types';

const router = express.Router();

/**
 * POST /api/generate-script
 * Generates a shell script based on the provided request
 */
router.post('/generate-script', async (req, res) => {
  try {
    // Validate request body against schema
    const validatedRequest = ScriptRequestSchema.parse(req.body);
    
    // Generate the script
    const script = await generateShellScript(validatedRequest);
    
    // Return the generated script
    res.status(200).json({ script });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Invalid request data', 
        errors: error.errors 
      });
    }
    
    console.error('Error generating script:', error);
    res.status(500).json({ 
      message: 'Failed to generate script',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export const scriptRoutes = router;
