// @desc Get profile
//@route GET /api/users/profile
// @access only logged in

import ExerciseLog from "../../models/exerciseLogModel.js";

import User from "../../models/userModel.js";
import WorkoutLog from "../../models/workoutLogModel.js";

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password").lean();
  if (!user) {
    return res.status(404).json({
      errorMessage: "Пользователь не найден",
    });
  }
  const exerciseLogByUser = await ExerciseLog.find({
    user: user._id,
    completed: true,
  });
  let kg = 0;
  let countExerciseCompleted = 0;
  exerciseLogByUser.forEach((log) => {
    countExerciseCompleted += log.times.length;
    log.times.forEach((item) => {
      kg += item.weight;
    });
  });
  const minutes = Math.ceil(countExerciseCompleted * 2.3);
  const workouts = await WorkoutLog.find({
    user: user._id,
    completed: true,
  }).countDocuments();
  res.json({
    ...user,
    minutes,
    workouts,
    kg,
  });
};
