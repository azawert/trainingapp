import React from "react";
import styles from "./Header.module.sass";
import arrowImage from "../../../images/Arrow 2.svg";
import userImage from "../../../images/header/user.svg";
import logInImage from "../../../images/header/log-in-svgrepo-com.svg";
import Hamburger from "../Hamburger/Hamburger";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, setIsAuth } = useAuth();
  React.useEffect(() => {
    localStorage.getItem("token") && setIsAuth(true);
  }, []);

  return (
    <header className={styles.header}>
      {location.pathname !== "/" ? (
        <button type="button">
          <img
            src={arrowImage}
            onClick={() => navigate("/")}
            alt="arrow-back"
          ></img>
        </button>
      ) : isAuth ? (
        <button type="button">
          <img
            src={userImage}
            alt="auth"
            onClick={() => navigate("profile")}
          ></img>
        </button>
      ) : (
        <button type="button">
          <img
            src={logInImage}
            alt="auth"
            onClick={() => navigate("auth")}
            width="24px"
          ></img>
        </button>
      )}
      <Hamburger />
    </header>
  );
};

export default Header;
