import { Router } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().sort({ createdAt: 1 }).lean();
  res.json(teams);
});

export default router;
