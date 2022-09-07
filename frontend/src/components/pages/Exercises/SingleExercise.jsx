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
        url: `/exercises/${id}`,
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
            text={data.name}
            minutes={data.minutes}
          />

          {/* {data.exercises.map((exercise, id) => {
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
          })} */}
        </>
      );
};

export default SingleExercise;
