import { InferSchemaType, Schema, model, models } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: {
      type: String,
      enum: ['run', 'cycle', 'strength', 'yoga', 'swim'],
      required: true
    },
    durationMinutes: { type: Number, min: 1, required: true },
    caloriesBurned: { type: Number, min: 1, required: true },
    performedAt: { type: Date, required: true }
  },
  { timestamps: true }
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;

const Activity = models.Activity || model('Activity', activitySchema);

export default Activity;
