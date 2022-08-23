import ExerciseLog from "../../../models/exerciseLogModel.js";
import asyncHandler from "express-async-handler";

export const createNewExerciseLog = asyncHandler(async (req, res) => {
  const { exerciseId, times } = req.body;
  if (!exerciseId) {
    return res.status(400).json({
      errorMessage: "Добавьте упражнение",
    });
  }
  let timesArray = [];

  const prevExercises = await ExerciseLog.find({
    user: req.user._id,
    exercise: exerciseId,
  }).sort("desc");
  if (prevExercises[0]) {
    timesArray = prevExercises[0].times;
  } else {
    for (let i = 0; i < times; i++) {
      timesArray.push({
        weight: 0,
        reps: 0,
      });
    }
  }

  const exerciseLog = await ExerciseLog.create({
    user: req.user._id,
    exercise: exerciseId,
    times: timesArray,
  });

  return res.json(exerciseLog);
});
