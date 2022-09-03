import React from "react";
import styles from "./Header.module.sass";
import arrowImage from "../../../images/Arrow 2.svg";
import userImage from "../../../images/header/user.svg";
import Hamburger from "../Hamburger/Hamburger";
import { useNavigate, useLocation } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className={styles.header}>
      {location.pathname !== "/" ? (
        <button type="button">
          <img
            src={arrowImage}
            onClick={() => navigate(-1)}
            alt="arrow-back"
            height={"24px"}
          ></img>
        </button>
      ) : (
        <button type="button">
          <img src={userImage} alt="auth" height={"24px"}></img>
        </button>
      )}
      <Hamburger />
    </header>
  );
};

export default Header;
