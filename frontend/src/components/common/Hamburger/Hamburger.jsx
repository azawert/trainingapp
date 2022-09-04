import React, { useRef } from "react";
import hamburgerImage from "../../../images/header/hamburger.svg";
import hamburgerClose from "../../../images/header/hamburger-close.svg";
import styles from "./Hamburger.module.sass";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
const Hamburger = () => {
  const location = useLocation();
  const [isShow, setIsShow] = React.useState(false);
  const { isAuth, setIsAuth } = useAuth();
  const logOut = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setIsShow(false);
  };
  const options = [
    {
      name: "Workouts",
      link: "/workouts",
    },
    {
      name: "Create new",
      link: "/new-workout",
    },

    {
      name: "Profile",
      link: "/profile",
    },
  ];

  return (
    <div className={styles.wrapper}>
      {isShow ? (
        <button type="button">
          <img
            src={hamburgerClose}
            alt="menu"
            onClick={() => setIsShow(false)}
            height={"24px"}
          ></img>
          <ul className={styles.menu}>
            {options.map((option, id) => (
              <>
                <li>
                  <Link to={option.link} key={id}>
                    {option.name}
                  </Link>
                </li>
              </>
            ))}
            {location.pathname !== "/auth" &&
              (isAuth ? (
                <li>
                  <Link to="/" onClick={logOut}>
                    Logout
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="auth">Login</Link>
                </li>
              ))}
          </ul>

          <nav className={styles.options}></nav>
        </button>
      ) : (
        <button type="button">
          <img
            src={hamburgerImage}
            alt="menu"
            onClick={() => setIsShow(true)}
            height={"24px"}
          ></img>
        </button>
      )}
    </div>
  );
};

export default Hamburger;
