import React from "react";
import styles from "./Header.module.sass";

import userImage from "../../../images/header/user.svg";
import Hamburger from "../Hamburger/Hamburger";

const Header = () => {
  return (
    <header className={styles.header}>
      <button type="button">
        <img src={userImage} alt="auth"></img>
      </button>
      <Hamburger />
    </header>
  );
};

export default Header;
