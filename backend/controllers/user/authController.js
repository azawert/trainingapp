import User from "../../models/userModel.js";
import jwt from "jsonwebtoken";

//@desc auth user
//@route POST /api/login
//@access public

export const authUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      errorMessage: "Необходимо заполнить поля",
    });
  }
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "10d",
    });
    return res.status(200).json({ user, token });
  } else {
    return res.status(401).json({
      errorMessage: "Неправильные данные",
    });
  }
};
