import { Router } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().sort({ createdAt: 1 }).lean();
  res.json(workouts);
});

export default router;
