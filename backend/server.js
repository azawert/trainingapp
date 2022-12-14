import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
import path from "path";
/*config*/
import { connectDB } from "./config/db.js";

/* Routes */
import userRoutes from "./routes/userRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";

dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(morgan("DEVELOPMENT"));
}

app.use(express.json());
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api/users", userRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/workouts", workoutRoutes);

const PORT = process.env.PORT || 9999;

app.listen(PORT, console.log(`server running on port ${PORT}`));
