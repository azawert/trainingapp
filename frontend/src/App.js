import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { routes } from "./routes/routes";
import { useAuth } from "./hooks/useAuth";
import NoAuth from "./components/pages/NoAuth/NoAuth";
import Home from "./components/pages/Home/Home";
const queryClient = new QueryClient();
const App = () => {
  const { isAuth, setIsAuth } = useAuth();
  React.useEffect(() => {
    localStorage.getItem("token") && setIsAuth(true);
  });
  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
