import NotFound from "../components/common/NotFound/NotFound";
import Auth from "../components/pages/Auth/Auth";
import Home from "../components/pages/Home/Home";
import NewExercise from "../components/pages/NewExercise/NewExercise";
import NewWorkout from "../components/pages/NewWorkout/NewWorkout";
import Profile from "../components/pages/Profile/Profile";

export const routes = [
  {
    path: "/",
    element: Home,
    auth: false,
  },
  {
    path: "*",
    element: NotFound,
    auth: false,
  },
  {
    path: "/new-workout",
    element: NewWorkout,
    auth: true,
  },
  {
    path: "/auth",
    element: Auth,
    auth: false,
  },
  {
    path: "/new-exercise",
    element: NewExercise,
    auth: true,
  },
  {
    path: "/profile",
    element: Profile,
    auth: true,
  },
];
