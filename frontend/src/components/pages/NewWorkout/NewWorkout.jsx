import React from "react";
import Layout from "../../common/Layout";
import Field from "../../../ui/Field/Field";
import styles from "./NewWorkout.module.sass";
import bgImage from "../../../images/header/home-bg.jpg";
import Button from "../../../ui/Button/Button.jsx";
const NewWorkout = () => {
  const [nameValue, setNameValue] = React.useState("");
  const [exercises, setExercises] = React.useState([]);
  const onChangeNameField = (e) => {
    setNameValue(e.target.value);
    console.log(nameValue);
  };
  return (
    <>
      <Layout image={bgImage} />
      <div className={styles.wrapper}>
        <form onSubmit={() => {}}>
          <Field
            placeholder="Введите название упражнения..."
            valueOfField={nameValue}
            onChangeFunc={onChangeNameField}
          />
        </form>
        <Button text="Создать" callback={() => {}} />
      </div>
    </>
  );
};

export default NewWorkout;
