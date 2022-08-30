import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import NotFound from "./components/common/NotFound/NotFound";
import NewWorkout from "./components/pages/NewWorkout/NewWorkout";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/new-workout" element={<NewWorkout />} />
    </Routes>
  );
};

export default App;
