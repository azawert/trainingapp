// @desc Get profile
//@route GET /api/users/profile
// @access only logged in

import User from "../../models/userModel.js";

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
};
