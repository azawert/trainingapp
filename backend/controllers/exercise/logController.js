// @desc create exercise log
//@route POST /api/exercises/log
// @access only logged in
import ExerciseLog from "../../models/exerciseLogModel.js";
import asyncHandler from "express-async-handler";

export const createNewExerciseLog = async (req, res) => {
  const { exerciseId, times } = req.body;
  let timesArray = [];

  const prevExercises = ExerciseLog.find({
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
};

// @desc get exercise log
//@route GET /api/exercises/log:id
// @access only logged in

export const getExerciseLog = asyncHandler(async (req, res) => {
  const exerciseLog = await ExerciseLog.findById(req.params.id).populate(
    "exercise",
    "name imageId"
  );
  if (!exerciseLog) {
    return res.status(404).json({
      errorMessage: "Лог не найден :(",
    });
  }
  return res.json(exerciseLog);
});
