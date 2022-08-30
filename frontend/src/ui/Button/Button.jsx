import React from "react";
import styles from "./Button.module.sass";

const Button = ({ text, callback, type = "main" }) => {
  return (
    <div>
      <button onClick={callback} className={`${styles.button} ${styles[type]}`}>
        {text}
      </button>
    </div>
  );
};

export default Button;
