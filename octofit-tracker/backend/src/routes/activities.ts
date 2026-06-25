import { Router } from 'express';
import mongoose from 'mongoose';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  if (mongoose.connection.readyState !== 1) {
    res.json([]);
    return;
  }

  const activities = await Activity.find().sort({ performedAt: -1 }).lean();
  res.json(activities);
});

export default router;
