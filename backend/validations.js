import { body } from "express-validator";

export const registrationValidator = [
  body("email", "Необходимо ввести корректную почту").isEmail(),
  body("password", "Длина пароля должна быть от 5 до 25 символов").isLength({
    min: 5,
    max: 25,
  }),
];

export const exerciseValidator = [
  body("name", "Название упражнение должно быть больше 2-х символов").isLength({
    min: 2,
  }),
];

export const workoutValidator = [
  body("name", "Название тренировки должно быть больше 2-х символов").isLength({
    min: 2,
  }),
];
