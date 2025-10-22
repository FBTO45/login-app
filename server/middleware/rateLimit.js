import { pool } from '../config/database.js';

const loginRateLimit = async (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = new Date();
  const windowMs = 60 * 1000; // 1 minute
  const maxAttempts = 5;

  try {
    // Clean up old attempts first
    await pool.execute(
      'DELETE FROM login_attempts WHERE last_attempt < ?',
      [new Date(now - windowMs)]
    );

    const [rows] = await pool.execute(
      'SELECT * FROM login_attempts WHERE ip_address = ?',
      [ip]
    );

    if (rows.length > 0) {
      const attempt = rows[0];
      
      // Check if within time window and exceeded attempts
      if (attempt.attempts >= maxAttempts) {
        const timeLeft = Math.ceil((new Date(attempt.last_attempt).getTime() + windowMs - now.getTime()) / 1000);
        return res.status(429).json({ 
          error: `Too many login attempts. Please try again in ${timeLeft} seconds.`,
          code: 'RATE_LIMIT_EXCEEDED',
          retryAfter: timeLeft
        });
      }
      
      // Update existing attempt
      await pool.execute(
        'UPDATE login_attempts SET attempts = attempts + 1, last_attempt = ? WHERE id = ?',
        [now, attempt.id]
      );
    } else {
      // Create new attempt record
      await pool.execute(
        'INSERT INTO login_attempts (ip_address, attempts, last_attempt) VALUES (?, 1, ?)',
        [ip, now]
      );
    }

    next();
  } catch (error) {
    console.error('Rate limit error:', error);
    next(); // Continue on error to not block legitimate requests
  }
};

export { loginRateLimit };