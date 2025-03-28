import express from 'express';
import cors from 'cors';
import { scriptRoutes } from './routes/script';

const app = express();
const PORT = process.env.PORT || 8000;

// Configure CORS to allow requests from any origin in development
const corsOptions = {
  origin: '*', // In production, this should be restricted to specific domains
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api', scriptRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
const portNumber = typeof PORT === 'string' ? parseInt(PORT, 10) : PORT;
app.listen(portNumber, '0.0.0.0', () => {
  console.log(`Shell AI Service running on http://0.0.0.0:${portNumber}`);
});
