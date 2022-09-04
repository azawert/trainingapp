// @desc POST reg user
// @route POST /api/users/registration
// @access public
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";
import asyncHandler from "express-async-handler";

export const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    return res.json({
      errorMessage: "Необходимо ввести почту и/или пароль",
    });
  }

  const isUserExists = await User.findOne({ email });

  if (isUserExists) {
    // return res.status(400).json({
    //   errorMessage: "Пользователь с такой почтой уже зарегистрирован",
    // });
    res.status(400);
    throw new Error("Пользователь с такой почтой уже зарегистрирован");
  }

  const user = await User.create({
    email,
    password,
  });
  const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN, {
    expiresIn: "10d",
  });
  return res.json({ user, token });
});
