import { InferSchemaType, Schema, model, models } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true
    },
    durationMinutes: { type: Number, min: 5, required: true },
    tags: [{ type: String, required: true }],
    recommendedFor: [{ type: String, required: true }]
  },
  { timestamps: true }
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

const Workout = models.Workout || model('Workout', workoutSchema);

export default Workout;
