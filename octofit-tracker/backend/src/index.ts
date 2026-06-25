import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { apiBaseUrl } from './config/baseUrl';
import { connectDatabase } from './config/database';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/config', (_req, res) => {
  res.json({
    apiBaseUrl,
    port
  });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

const startServer = async () => {
  try {
    await connectDatabase();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed, continuing without DB:', error);
  }

  app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
  });
};

void startServer();
