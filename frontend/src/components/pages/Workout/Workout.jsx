import React from "react";
import cn from "classnames";
import { useMutation } from "react-query";
import { $api } from "../../../api/api";
import Layout from "../../common/Layout";

import bgImage from "../../../images/new_exercise.jpg";

import styles from "./Workout.module.sass";
import Alert from "../../../ui/Alert/Alert";
import { useParams, useNavigate } from "react-router-dom";
const Workout = () => {
  const [errorValue, setErrorValue] = React.useState("");
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  const [isErrorAlertVisible, setIsErrorAlertVisible] = React.useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    mutate,
    isLoading,
    data: dataWorkout,
  } = useMutation(
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

  const { mutate: mutateLog, isLoading: isLoadingLog } = useMutation(
    "CreateExerciseLog",
    ({ exId, times }) =>
      $api({
        url: `/exercises/log`,
        type: "POST",
        body: { exerciseId: exId, times },
      }),
    {
      onSuccess(data) {
        data && navigate(`/exercises/${data._id}`);
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
    : dataWorkout && (
        <>
          <Layout
            backlink={`/workouts`}
            image={bgImage}
            text={dataWorkout.name}
            minutes={dataWorkout.minutes}
          />

          {errorValue && isErrorAlertVisible && (
            <Alert type="error" text={"Не удалось найти тренировку..."} />
          )}
          {dataWorkout.exercises.map((exercise, index) => {
            return (
              <div className={styles.page__wrapper}>
                <div className={styles.exercise__wrapper}>
                  <button
                    aria-label="go to exercise"
                    onClick={() => {
                      mutateLog({ exId: exercise._id, times: exercise.times });
                    }}
                  >
                    <img
                      src={`../uploads/${exercise.imageName}.svg`}
                      alt={"exercise icon"}
                    ></img>
                    <div>{exercise.name}</div>
                  </button>
                </div>
                {index % 2 !== 0 && <div className={styles.line}></div>}
              </div>
            );
          })}
        </>
      );
};

export default Workout;
