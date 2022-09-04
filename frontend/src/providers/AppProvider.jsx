import { useState } from "react";
import { AuthContext } from "../components/contexts/AuthContext";
import App from "../App";

export const AppProvider = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <App />
    </AuthContext.Provider>
  );
};
