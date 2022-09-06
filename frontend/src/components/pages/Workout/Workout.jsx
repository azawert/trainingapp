import React from "react";
import cn from "classnames";
import { useMutation } from "react-query";
import { $api } from "../../../api/api";
import Layout from "../../common/Layout";

import bgImage from "../../../images/new_exercise.jpg";

import styles from "./Workout.module.sass";
import Alert from "../../../ui/Alert/Alert";
import { useParams } from "react-router-dom";
const Exercise = () => {
  const [errorValue, setErrorValue] = React.useState("");
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  const [isErrorAlertVisible, setIsErrorAlertVisible] = React.useState(false);
  const [isExerciseDone, setIsExerciseDone] = React.useState(false);
  const [doneExerciseId, setDoneExerciseId] = React.useState();

  const { id } = useParams();
  const { mutate, isLoading, error, isSuccess, data } = useMutation(
    "GetWorkout",
    () =>
      $api({
        url: `/workouts/${id}`,
      }),
    {
      onError() {
        setIsErrorAlertVisible(true);
      },
    }
  );
  setTimeout(() => {
    setIsAlertVisible(false);
    setIsErrorAlertVisible(false);
  }, 5000);
  React.useEffect(() => {
    mutate();
  }, []);
  data && console.log(data);
  return isLoading
    ? "Загрузка..."
    : data && (
        <>
          <Layout image={bgImage} text={data.name} minutes={data.minutes} />
          {/* <div className="wrapper-inner-page"> */}
          {errorValue && isErrorAlertVisible && (
            <Alert type="error" text={"Не удалось найти тренировку..."} />
          )}
          {data.exercises.map((exercise, id) => {
            return (
              <div className={styles.page__wrapper}>
                <div className={styles.exercise__wrapper}>
                  <img
                    src={`../uploads/${exercise.imageName}.svg`}
                    alt={"exercise icon"}
                  ></img>
                  <div>{exercise.name}</div>
                </div>
                {id % 2 !== 0 && <div className={styles.line}></div>}
              </div>
            );
          })}
          {/* </div> */}
        </>
      );
};

export default Exercise;
