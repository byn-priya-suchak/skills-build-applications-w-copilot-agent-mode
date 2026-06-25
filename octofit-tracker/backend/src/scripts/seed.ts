import { connectDatabase, disconnectDatabase, mongoUri } from '../config/database';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const seed = async (): Promise<void> => {
  console.log('Seed the octofit_db database with test data');
  console.log(`Using database: ${mongoUri}`);

  await connectDatabase();

  await Promise.all([
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const users = await User.insertMany([
    {
      name: 'Avery Park',
      email: 'avery.park@example.com',
      age: 29,
      fitnessLevel: 'intermediate',
      weeklyGoal: 5
    },
    {
      name: 'Jordan Kim',
      email: 'jordan.kim@example.com',
      age: 34,
      fitnessLevel: 'advanced',
      weeklyGoal: 6
    },
    {
      name: 'Riley Chen',
      email: 'riley.chen@example.com',
      age: 25,
      fitnessLevel: 'beginner',
      weeklyGoal: 4
    }
  ]);

  await Team.insertMany([
    {
      name: 'Morning Milers',
      description: 'Early-day runners focused on consistency and pace.',
      memberIds: [users[0]._id, users[2]._id],
      weeklyPoints: 980
    },
    {
      name: 'Iron Collective',
      description: 'Strength-first crew pushing progressive overload.',
      memberIds: [users[1]._id],
      weeklyPoints: 1120
    }
  ]);

  await Activity.insertMany([
    {
      userId: users[0]._id,
      activityType: 'run',
      durationMinutes: 38,
      caloriesBurned: 420,
      performedAt: new Date('2026-06-20T07:15:00Z')
    },
    {
      userId: users[1]._id,
      activityType: 'strength',
      durationMinutes: 52,
      caloriesBurned: 510,
      performedAt: new Date('2026-06-21T18:30:00Z')
    },
    {
      userId: users[2]._id,
      activityType: 'yoga',
      durationMinutes: 30,
      caloriesBurned: 180,
      performedAt: new Date('2026-06-22T06:45:00Z')
    }
  ]);

  await Leaderboard.insertMany([
    {
      userId: users[1]._id,
      points: 1240,
      rank: 1
    },
    {
      userId: users[0]._id,
      points: 1085,
      rank: 2
    },
    {
      userId: users[2]._id,
      points: 940,
      rank: 3
    }
  ]);

  await Workout.insertMany([
    {
      title: 'Intervals and Core',
      focus: 'cardio + stability',
      difficulty: 'intermediate',
      durationMinutes: 40,
      tags: ['interval', 'core', 'endurance'],
      recommendedFor: ['intermediate', 'advanced']
    },
    {
      title: 'Foundations Circuit',
      focus: 'full body strength',
      difficulty: 'beginner',
      durationMinutes: 35,
      tags: ['strength', 'mobility', 'low-impact'],
      recommendedFor: ['beginner']
    },
    {
      title: 'Power Endurance Ladder',
      focus: 'strength endurance',
      difficulty: 'advanced',
      durationMinutes: 50,
      tags: ['hybrid', 'power', 'conditioning'],
      recommendedFor: ['advanced']
    }
  ]);

  console.log('Seeding completed successfully.');
};

seed()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
