import express from 'express';
import cors from 'cors';
import servicesRouter from './routes/services.js';
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';
import bookingsRouter from './routes/bookings.js';
import { ensureDataDir } from './utils/storage.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Request logging in development
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString().substring(11, 19)}] ${req.method} ${req.originalUrl}`);
  next();
});

// Root & Health check
app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'MasterDim REST API Server (Lab 7)',
    version: '1.0.0',
    endpoints: [
      '/api/services',
      '/api/services/:id',
      '/api/auth/register',
      '/api/auth/login',
      '/api/auth/me',
      '/api/users/profile',
      '/api/bookings',
    ],
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount API routes
app.use('/api/services', servicesRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/bookings', bookingsRouter);

// 404 handler for undefined API routes
app.use('/api/*', (_req, res) => {
  res.status(404).json({ message: 'API ендпоінт не знайдено' });
});

// Global Error Handler
app.use((err, _req, res, _next) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Внутрішня помилка сервера',
    error: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start Server
ensureDataDir().then(() => {
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🚀 MasterDim Express Backend is running!`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`📡 API Base: http://localhost:${PORT}/api`);
    console.log(`===============================================`);
  });
});
