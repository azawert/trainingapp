import ExerciseLog from "../../../models/exerciseLogModel.js";
import asyncHandler from "express-async-handler";

//@desc update exercise log
//@route PUT /api/exercise/log/:id
//@access private
export const updateExerciseLog = asyncHandler(async (req, res) => {
  const { logId, timeIndex, key, value } = req.body;

  const editLog = await ExerciseLog.findById(logId);

  if (!editLog) {
    return res.status(404).json({
      errorMessage: "Не найден лог.",
    });
  }

  let newTimes = editLog.times;
  if ((!timeIndex && timeIndex !== 0) || !key || (!value && value !== false && value !== '')) {
    return res.status(404).json({
      errorMessage: "Вы не указали все поля",
    });
  }
  newTimes[timeIndex][key] = value;

  editLog.times = newTimes;
  const updatedLog = await editLog.save();

  return res.json(updatedLog);
});

//@desc update status exercise log
//@route PUT /api/exercise/log/complete
//@access private
export const updateCompleteExerciseLog = asyncHandler(async (req, res) => {
  const { logId, completed} = req.body;

  const editLog = await ExerciseLog.findById(logId).populate(
    "exercise",
    "workout"
  );
    console.log(editLog)
  if (!editLog) {
    return res.status(404).json({
      errorMessage: "Не найден лог.",
    });
  }

  editLog.completed = completed;
  const updatedLog = await editLog.save();

  return res.json(updatedLog);
});
