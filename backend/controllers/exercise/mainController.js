// @desc Add new exercise
//@route POST /api/exercises
// @access only logged in

import Exercise from "../../models/exerciseModel.js";
import asyncHandler from "express-async-handler";

export const addNewExercise = async (req, res) => {
  const { name, imageId, times } = req.body;
  if (!name) {
    return res.status(400).json({
      errorMessage: "Введите название упражнения",
    });
  }

  const exercise = await Exercise.create({
    name,
    imageId,
    times,
  });
  res.json(exercise);
};

// @desc Get exercise
//@route GET /api/exercise/:id
// @access only logged in

export const getExercise = async (req, res) => {
  const exercise = await Exercise.findById(req.params.id);
  if (!exercise) {
    return res.status(404).json({
      errorMessage: "Упражнение не найдено...",
    });
  }

  res.json(exercise);
};

//@desc update exercise
//@route PUT /api/exercises
//@access private
export const updateExercise = asyncHandler(async (req, res) => {
  const { name, times, imageId, exerciseId } = req.body;

  const exercise = await Exercise.findById(exerciseId);

  if (!exercise) {
    return res.status(404).json({
      errorMessage: "Не найдено упражнение",
    });
  }

  exercise.name = name;
  exercise.times = times;
  exercise.image = imageId;
  if (!name) {
    return exercise.name;
  }
  if (!times) {
    return exercise.times;
  }
  const updatedExercise = await exercise.save();

  return res.json(updatedExercise);
});

//@desc delete exercise
//@route DELETE /api/exercises
//@access private
export const deleteExercise = asyncHandler(async (req, res) => {
  const { exerciseId } = req.body;
  const exercise = await Exercise.findById(exerciseId);
  if (!exercise) {
    return res.status(404).json({
      errorMessage: "Упражнение не найдено...",
    });
  }
  exercise.remove();
  return res.json({
    message: "Упражнение успешно удалено",
  });
});
