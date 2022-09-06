import React from "react";
import { useMutation } from "react-query";
import { $api } from "../../../api/api";
import Layout from "../../common/Layout";

import bgImage from "../../../images/new_exercise.jpg";

import styles from "./Workout.module.sass";
import Alert from "../../../ui/Alert/Alert";
import { Link } from "react-router-dom";

const ListWorkouts = () => {
  const { mutate, isLoading, data } = useMutation(
    "GetWorkout",
    () =>
      $api({
        url: `/workouts`,
      }),
    {
      onError() {},
    }
  );

  React.useEffect(() => {
    mutate();
  }, []);

  return isLoading ? (
    "Загрузка..."
  ) : data ? (
    <>
      <Layout image={bgImage} text={"Список тренировок"} />
      {data.map((workout, id) => {
        return (
          <div className={styles.page__wrapper}>
            <Link to={`${workout._id}`}>
              <div className={styles.workout__wrapper}>
                <div>{workout.name}</div>
              </div>
            </Link>
            {id % 2 !== 0 && <div className={styles.line}></div>}
          </div>
        );
      })}
    </>
  ) : (
    <Layout text="Тренировки не найдены" image={bgImage} />
  );
};

export default ListWorkouts;
