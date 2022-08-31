import React from "react";
import styles from "./Field.module.sass";
const Field = ({ placeholder, onChangeFunc, valueOfField }) => {
  return (
    <input
      placeholder={placeholder}
      onChange={onChangeFunc}
      value={valueOfField}
      className={styles.input}
    ></input>
  );
};

export default Field;
