import { Router } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';

const router = Router();

router.get('/', async (_req, res) => {
  if (mongoose.connection.readyState !== 1) {
    res.json([]);
    return;
  }

  const users = await User.find().sort({ createdAt: 1 }).lean();
  res.json(users);
});

export default router;
