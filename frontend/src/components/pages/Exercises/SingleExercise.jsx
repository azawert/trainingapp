import React from "react";
import { useMutation } from "react-query";
import { $api } from "../../../api/api";
import Layout from "../../common/Layout";

import bgImage from "../../../images/singleExercise.jpg";

import styles from "./Exercise.module.sass";
import Alert from "../../../ui/Alert/Alert";
import { useParams } from "react-router-dom";
const SingleExercise = () => {
  const { id } = useParams();
  const { mutate, isLoading, data } = useMutation(
    "GetExercise",
    () =>
      $api({
        url: `/exercises/log/${id}`,
      }),
    {}
  );

  React.useEffect(() => {
    mutate();
  }, []);

  return isLoading
    ? "Загрузка..."
    : data && (
        <>
          <Layout
            backlink={true}
            image={bgImage}
            text={data.exercise.name}
            exerciseImage={data.exercise.imageName}
            minutes={data.minutes}
          />

          <div className={styles.page__wrapper}>
            <div className={styles.exercise__wrapper}></div>
            {id % 2 !== 0 && <div className={styles.line}></div>}
          </div>
        </>
      );
};

export default SingleExercise;
