import React from "react";
import ReactSelect from "react-select";
import { Link } from "react-router-dom";
import Layout from "../../common/Layout";
import Field from "../../../ui/Field/Field";

import bgImage from "../../../images/Maskgroup.jpg";
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
      <Layout image={bgImage} text="Создать новую тренировку" />
      <div className="wrapper-inner-page">
        <form onSubmit={() => {}}>
          <Field
            placeholder="Введите название тренировки..."
            valueOfField={nameValue}
            onChangeFunc={onChangeNameField}
          />
        </form>
        <Link to="/new-exercise" className="darklink">
          Создать новое упражнение...
        </Link>
        <ReactSelect
          classNamePrefix="select2-selection"
          placeholder="Упражнения"
          title="Упражнения"
          options={[
            { value: "афафца", label: "Отжимания" },
            { value: "ф", label: "Подтягивания" },
          ]}
          value={exercises}
          onChange={setExercises}
          isMulti={true}
        />
        <Button text="Создать" callback={() => {}} />
      </div>
    </>
  );
};

export default NewWorkout;
