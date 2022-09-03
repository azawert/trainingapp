import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Home from "./components/pages/Home/Home";
import NotFound from "./components/common/NotFound/NotFound";
import NewWorkout from "./components/pages/NewWorkout/NewWorkout";
import Auth from "./components/pages/Auth/Auth";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/new-workout" element={<NewWorkout />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
