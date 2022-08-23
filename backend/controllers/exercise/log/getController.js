import ExerciseLog from "../../../models/exerciseLogModel.js";
import asyncHandler from "express-async-handler";
import { rebuildTimes } from "../../../utils/exerciseLog.js";

export const getExerciseLog = asyncHandler(async (req, res) => {
  const exerciseLog = await ExerciseLog.findById(req.params.id)
    .populate("exercise", "name imageId")
    .lean();
  if (!exerciseLog) {
    return res.status(404).json({
      errorMessage: "Лог не найден :(",
    });
  }
  const prevExercisesLogs = await ExerciseLog.find({
    user: req.user._id,
    exercise: exerciseLog._id,
  }).sort("desc");
  const prevExLog = prevExercisesLogs[0];

  let newTimes = rebuildTimes(exerciseLog);

  if (prevExLog) {
    newTimes = rebuildTimes(exerciseLog, prevExLog);
  }
  return res.json({
    ...exerciseLog,
    times: newTimes,
  });
});
