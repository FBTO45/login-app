import request from 'supertest';
import express from 'express';
import authRoutes from '../routes/auth.js';
import { pool } from '../config/database.js';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

// Mock database connection
jest.mock('../config/database.js', () => ({
  pool: {
    execute: jest.fn()
  }
}));

describe('Authentication API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/login', () => {
    it('should return 400 for invalid email format', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'invalid-email',
          password: 'password123'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('valid email');
      expect(response.body.code).toBe('VALIDATION_ERROR');
    });

    it('should return 400 for missing password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: ''
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Password is required');
      expect(response.body.code).toBe('VALIDATION_ERROR');
    });

    it('should return 401 for non-existent user', async () => {
      pool.execute.mockResolvedValue([[]]); // No users found

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('Invalid email/username or password');
      expect(response.body.code).toBe('INVALID_CREDENTIALS');
    });
  });

  describe('POST /api/auth/register', () => {
    it('should return 400 for invalid registration data', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'invalid-email',
          username: 'ab', // Too short
          password: '123' // Too short
        });

      expect(response.status).toBe(400);
      expect(response.body.code).toBe('VALIDATION_ERROR');
    });

    it('should return 409 for existing user', async () => {
      pool.execute.mockResolvedValue([[{ id: 1 }]]); // User exists

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'existing@example.com',
          username: 'existing_user',
          password: 'password123'
        });

      expect(response.status).toBe(409);
      expect(response.body.error).toContain('already exists');
      expect(response.body.code).toBe('USER_EXISTS');
    });
  });
});