import express from 'express';

const router = express.Router();

router.get('/ping', (req, res) => {
    res.json({ message: 'Backend is running', timestamp: new Date().toISOString() });
});

export default router;
