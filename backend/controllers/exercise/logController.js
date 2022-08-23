// @desc create exercise log
//@route POST /api/exercises/log
// @access only logged in
import ExerciseLog from "../../models/exerciseLogModel.js";
import asyncHandler from "express-async-handler";
import { rebuildTimes } from "../../utils/exerciseLog.js";
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

// @desc get exercise log
//@route GET /api/exercises/log:id
// @access only logged in

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
