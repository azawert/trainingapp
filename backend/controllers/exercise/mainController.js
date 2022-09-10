// @desc Add new exercise
//@route POST /api/exercises
// @access only logged in

import Exercise from "../../models/exerciseModel.js";
import asyncHandler from "express-async-handler";

export const addNewExercise = async (req, res) => {
  const { name, imageName, times } = req.body;
  if (!name) {
    return res.status(400).json({
      errorMessage: "Введите название упражнения",
    });
  }
  const exerciseExist = await Exercise.findOne({
    name,
  });
  if (exerciseExist) {
    return res.status(400).json({
      errorMessage: "Данное название уже занято.",
    });
  }
  const exercise = await Exercise.create({
    name,
    imageName,
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
  const { name, times, imageName, exerciseId } = req.body;

  const exercise = await Exercise.findById(exerciseId);

  if (!exercise) {
    return res.status(404).json({
      errorMessage: "Не найдено упражнение",
    });
  }

  exercise.name = name;
  exercise.times = times;
  exercise.image = imageName;
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

// @desc Get exercises
//@route GET /api/exercises
// @access only logged in

export const getExercises = async ( res) => {
  const exercise = await Exercise.find({});
  if (!exercise) {
    return res.status(404).json({
      errorMessage: "Упражнение не найдено...",
    });
  }

  res.json(exercise);
};
