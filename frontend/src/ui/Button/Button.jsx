import React from "react";
import styles from "./Button.module.sass";

const Button = ({ text, callback, type = "s" }) => {
  return (
    <div>
      <button onClick={callback} className={`${styles.button} ${styles[type]}`}>
        {text}
      </button>
    </div>
  );
};

export default Button;
