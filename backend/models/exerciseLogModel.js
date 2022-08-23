import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const exerciseLogSchema = mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    exercise: {
      type: ObjectId,
      ref: "Exercise",
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
    times: [
      {
        weight: { type: Number, required: true },
        reps: { type: Number, required: true },
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const ExerciseLog = mongoose.model("ExerciseLog", exerciseLogSchema);

export default ExerciseLog;
