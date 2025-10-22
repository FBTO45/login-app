import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Dashboard',
    user: req.user,
    dashboardData: {
      stats: {
        totalUsers: 150,
        activeUsers: 120,
        revenue: '$15,000',
        growth: '+12%'
      },
      recentActivity: [
        { id: 1, action: 'User login', time: '10:30 AM', user: 'demo_user' },
        { id: 2, action: 'New registration', time: '11:15 AM', user: 'new_user' },
        { id: 3, action: 'Password reset', time: '02:45 PM', user: 'john_doe' },
        { id: 4, action: 'Profile update', time: '03:20 PM', user: 'jane_smith' }
      ],
      quickStats: [
        { name: 'Page Views', value: '4,200', change: '+12%', trend: 'up' },
        { name: 'Signups', value: '156', change: '+8%', trend: 'up' },
        { name: 'Active Sessions', value: '892', change: '-3%', trend: 'down' }
      ]
    }
  });
});

export default router;