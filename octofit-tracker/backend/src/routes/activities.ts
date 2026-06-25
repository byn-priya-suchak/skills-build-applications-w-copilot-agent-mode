import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().sort({ performedAt: -1 }).lean();
  res.json(activities);
});

export default router;
