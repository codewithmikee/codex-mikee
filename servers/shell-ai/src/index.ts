import express from 'express';
import cors from 'cors';
import { scriptRoutes } from './routes/script';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', scriptRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Shell AI Service running on http://0.0.0.0:${PORT}`);
});
