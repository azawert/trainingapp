import React from "react";
import cn from "classnames";
import { useMutation } from "react-query";
import { $api } from "../../../api/api";
import Layout from "../../common/Layout";
import Field from "../../../ui/Field/Field";

import bgImage from "../../../images/new_exercise.jpg";
import Button from "../../../ui/Button/Button.jsx";
import styles from "./NewExercise.module.sass";
import Alert from "../../../ui/Alert/Alert";
const NewExercise = () => {
  const [name, setName] = React.useState("");
  const [times, setTimes] = React.useState(1);
  const [imageName, setImageName] = React.useState("chest");
  const [errorValue, setErrorValue] = React.useState("");
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  const [isErrorAlertVisible, setIsErrorAlertVisible] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length <= 2 || !name) {
      setIsErrorAlertVisible(true);
      return setErrorValue("Введите корректное название");
    }
    setIsAlertVisible(true);
    mutate();
  };
  const onChangeNameField = (e) => {
    setName(e.target.value);
  };
  const onChangeTimes = (e) => {
    setTimes(e.target.value);
  };
  const images = ["chest", "shoulders", "biceps", "legs", "cardio"];

  const { mutate, isLoading, error, isSuccess } = useMutation(
    "CreateExercise",
    () =>
      $api({
        url: "/exercises",
        type: "POST",
        body: { name, times, imageName },
      }),
    {
      onSuccess() {
        setName("");
        setTimes(1);
        setImageName("chest");
        setErrorValue("");
      },
    }
  );
  setTimeout(() => {
    setIsAlertVisible(false);
    setIsErrorAlertVisible(false);
  }, 5000);
  return isLoading ? (
    "Загрузка..."
  ) : (
    <>
      <Layout image={bgImage} text="Создать новую тренировку" />
      <div className="wrapper-inner-page">
        <form onSubmit={handleSubmit}>
          {isSuccess && isAlertVisible && (
            <Alert type="success" text="Упражнение создано!" />
          )}
          {error && isAlertVisible && <Alert type="error" text={error} />}
          {errorValue && isErrorAlertVisible && (
            <Alert type="error" text={errorValue} />
          )}
          <Field
            placeholder="Введите название упражнения..."
            valueOfField={name}
            onChangeFunc={onChangeNameField}
          />
          <Field
            placeholder="Введите количество подходов..."
            valueOfField={times}
            onChangeFunc={onChangeTimes}
          />
          <div className={styles.images}>
            {images.map((image, id) => {
              return (
                <img
                  className={cn({
                    [styles.active]: imageName === image,
                  })}
                  key={id}
                  src={`/uploads/${image}.svg`}
                  alt={image}
                  onClick={() => setImageName(image)}
                ></img>
              );
            })}
          </div>
          <Button text="Создать" callback={() => {}} />
        </form>
      </div>
    </>
  );
};

export default NewExercise;
