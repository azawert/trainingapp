import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    times: {
      type: Number,
      required: true,
    },

    imageName: {
      type: String,
      required: true,
      default: "chest",
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;
