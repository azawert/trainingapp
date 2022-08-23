import asyncHandler from "express-async-handler";
import WorkoutLog from "../../models/workoutLogModel.js";

//@desc Create new workoutLog
//@rout POST /api/workout/log
//@access Private

export const createNewWorkoutLog = asyncHandler(async (req, res) => {
  const { workoutId } = req.body;

  const workoutLog = await WorkoutLog.create({
    user: req.user._id,
    workout: workoutId,
  });
  if (!workoutLog) {
    return res.status(404).json({
      errorMessage: "Не найдена тренировка",
    });
  }
  return res.json(workoutLog);
});
