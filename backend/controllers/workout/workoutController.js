// @desc Add new workout
//@route POST /api/workout
// @access only logged in

import Workout from "../../models/workoutModel.js";

export const addNewWorkout = async (req, res) => {
  const { name, exerciseIds } = req.body;
  if (!name) {
    return res.status(400).json({
      errorMessage: "Тренировке необходимо дать название!",
    });
  }
  if (!exerciseIds) {
    return res.status(500).json({
      errorMessage: "Не удалось получить упражнения ",
    });
  }

  const workout = await Workout.create({
    name,
    exercises: exerciseIds,
  });
  res.json(workout);
};

// @desc get a single workout
//@route get /api/workout/:id
// @access only logged in

export const getWorkout = async (req, res) => {
  const workout = await Workout.findById(req.params.id)
    .populate("exercises")
    .lean();
  const minutes = Math.ceil(workout.exercises.length * 3.7);
  if (!workout) {
    return res.status(400).json({
      errorMessage: "Тренировка не найдена",
    });
  }
  res.json({ ...workout, minutes });
};
