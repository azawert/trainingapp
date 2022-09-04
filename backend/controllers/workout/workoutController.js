// @desc Add new workout
//@route POST /api/workout
// @access only logged in

import Exercise from "../../models/exerciseModel.js";
import Workout from "../../models/workoutModel.js";
import asyncHandler from "express-async-handler";

export const addNewWorkout = asyncHandler(async (req, res) => {
  const { name, exerciseIds } = req.body;
  const workoutExists = await Workout.findOne({
    name,
  });
  if (workoutExists) {
    return res.status(400).json({
      errorMessage: "Такое название тренировки уже занято",
    });
  }
  if (!name) {
    return res.status(400).json({
      errorMessage: "Тренировке необходимо дать название!",
    });
  }
  // const findExercise = await Exercise.findById(exerciseIds);
  // if (!findExercise) {
  //   return res.status(404).json({
  //     errorMessage: "Не удалось найти упражнение",
  //   });
  // }
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
});

// @desc get a single workout
//@route get /api/workout/:id
// @access only logged in

export const getWorkout = async (req, res) => {
  const workout = await Workout.findById(req.params.id)
    .populate("exercises")
    .lean();
  if (workout) {
    const minutes = Math.ceil(workout.exercises.length * 3.7);
    res.json({ ...workout, minutes });
  }
  if (!workout) {
    return res.status(400).json({
      errorMessage: "Тренировка не найдена",
    });
  }
};

//@desc update workouts
//@route PUT /api/workouts
//@access private
export const updateWorkout = asyncHandler(async (req, res) => {
  const { name, exerciseIds, workoutId } = req.body;

  const workout = await Workout.findById(workoutId);

  if (!workout) {
    return res.status(404).json({
      errorMessage: "Не найдена тренировка",
    });
  }

  workout.name = name;
  workout.exercises = exerciseIds;
  const updatedWorkout = await workout.save();

  return res.json(updatedWorkout);
});

//@desc delete workout
//@route DELETE /api/workouts
//@access private
export const deleteWorkout = asyncHandler(async (req, res) => {
  const { workoutId } = req.body;
  const workout = await Workout.findById(workoutId);
  if (!workout) {
    return res.status(404).json({
      errorMessage: "Тренировка не найдена...",
    });
  }
  workout.remove();
  return res.json({
    message: "Тренировка успешно удалена",
  });
});

// @desc Get workouts
//@route GET /api/workouts
// @access only logged in

export const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).populate("exercises");
  if (!workouts || workouts.length === 0) {
    return res.status(404).json({
      errorMessage: "Тренировки не найдены...",
    });
  }

  res.json(workouts);
};
