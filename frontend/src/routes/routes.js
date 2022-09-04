import NotFound from "../components/common/NotFound/NotFound";
import Auth from "../components/pages/Auth/Auth";
import Home from "../components/pages/Home/Home";
import NewWorkout from "../components/pages/NewWorkout/NewWorkout";

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
];
