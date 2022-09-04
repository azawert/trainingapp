import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { routes } from "./routes/routes";
import { useAuth } from "./hooks/useAuth";
import NoAuth from "./components/pages/NoAuth/NoAuth";
import Home from "./components/pages/Home/Home";
const queryClient = new QueryClient();

const App = () => {
  const { isAuth } = useAuth();
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Routes>
        {routes.map((route) => {
          if (route.auth && !isAuth) {
            return <Route path={route.path} element={<NoAuth />} />;
          }
          if (route.path === "/auth" && isAuth) {
            return <Route path={"/"} element={<Home />} />;
          }
          return <Route path={route.path} element={<route.element />} />;
        })}
      </Routes>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
