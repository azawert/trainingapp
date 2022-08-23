// @desc Add new exercise
//@route POST /api/exercises
// @access only logged in

import Exercise from "../../models/exerciseModel.js";

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
  const { name, image, times } = req.body;
  if (!name || !image || !times) {
    return res.status(400).json({
      errorMessage: "Заполните все необходимые поля!",
    });
  }

  const exercise = await Exercise.create({
    name,
    image,
    times,
  });
  res.json(exercise);
};
