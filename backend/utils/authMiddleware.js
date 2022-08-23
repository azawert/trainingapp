import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    const userFound = await User.findById(decoded._id);
    if (userFound) {
      req.user = userFound;
      next();
    } else {
      res.status(403).json({
        message: "Не авторизован",
        token: token,
      });
    }
  }
  if (!token) {
    res.status(401).json({
      message: "Нет авторизации",
    });
  }
});
