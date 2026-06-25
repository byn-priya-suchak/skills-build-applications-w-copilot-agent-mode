import { InferSchemaType, Schema, model, models } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    weeklyPoints: { type: Number, min: 0, default: 0 }
  },
  { timestamps: true }
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;

const Team = models.Team || model('Team', teamSchema);

export default Team;
