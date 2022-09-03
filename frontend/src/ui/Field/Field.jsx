import React from "react";
import styles from "./Field.module.sass";
const Field = ({ placeholder, onChangeFunc, valueOfField, required, type }) => {
  return (
    <input
      placeholder={placeholder}
      onChange={onChangeFunc}
      value={valueOfField}
      className={styles.input}
      required={required}
      type={type}
    ></input>
  );
};

export default Field;
