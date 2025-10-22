import express from 'express';
import { 
  login, 
  register, 
  logout, 
  getProfile, 
  checkAuth 
} from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { loginRateLimit } from '../middleware/rateLimit.js';

const router = express.Router();

router.post('/login', loginRateLimit, login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/profile', authenticateToken, getProfile);
router.get('/check', authenticateToken, checkAuth);

export default router;