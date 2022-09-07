import React from "react";
import cn from "classnames";
import { useMutation } from "react-query";
import { $api } from "../../../api/api";
import Layout from "../../common/Layout";

import bgImage from "../../../images/new_exercise.jpg";

import styles from "./Workout.module.sass";
import Alert from "../../../ui/Alert/Alert";
import { Link, useParams } from "react-router-dom";
const Workout = () => {
  const [errorValue, setErrorValue] = React.useState("");
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  const [isErrorAlertVisible, setIsErrorAlertVisible] = React.useState(false);

  const { id } = useParams();
  const { mutate, isLoading, data } = useMutation(
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

  return isLoading
    ? "Загрузка..."
    : data && (
        <>
          <Layout
            backlink={`/workouts`}
            image={bgImage}
            text={data.name}
            minutes={data.minutes}
          />

          {errorValue && isErrorAlertVisible && (
            <Alert type="error" text={"Не удалось найти тренировку..."} />
          )}
          {data.exercises.map((exercise, index) => {
            return (
              <div className={styles.page__wrapper}>
                <div className={styles.exercise__wrapper}>
                  <Link to={`/exercises/${exercise._id}`}>
                    <img
                      src={`../uploads/${exercise.imageName}.svg`}
                      alt={"exercise icon"}
                    ></img>
                    <div>{exercise.name}</div>
                  </Link>
                </div>
                {index % 2 !== 0 && <div className={styles.line}></div>}
              </div>
            );
          })}
        </>
      );
};

export default Workout;
