import React from "react";
import hamburgerImage from "../../../images/header/hamburger.svg";
import hamburgerClose from "../../../images/header/hamburger-close.svg";
import styles from "./Hamburger.module.sass";
import { Link } from "react-router-dom";
const Hamburger = () => {
  const [isShow, setIsShow] = React.useState(false);
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
            alt="auth"
            onClick={() => setIsShow(!isShow)}
          ></img>
          <ul className={styles.menu}>
            {options.map((option) => (
              <>
                <li>
                  <Link to={option.link}>{option.name}</Link>
                </li>
              </>
            ))}
            <li>
              <a onClick={() => {}}>Logout</a>
            </li>
          </ul>

          <nav className={styles.options}></nav>
        </button>
      ) : (
        <button type="button">
          <img
            src={hamburgerImage}
            alt="auth"
            onClick={() => setIsShow(!isShow)}
          ></img>
        </button>
      )}
    </div>
  );
};

export default Hamburger;