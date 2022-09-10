import React from "react";
import { useMutation } from "react-query";
import { $api } from "../../../api/api";
import Layout from "../../common/Layout";

import bgImage from "../../../images/singleExercise.jpg";
import notCompletedCheckbox from "../../../images/completed.svg";
import completedCheckbox from "../../../images/completed_checked.svg";
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
          <div className={styles.wrapper}>
            <div className={styles.row}>
              <div>
                <span>Previous</span>
              </div>
              <div>
                <span>Repeat & weight</span>
              </div>
              <div>
                <span>Completed</span>
              </div>
            </div>
            {data.times.map((item, index) => {
              console.log(item);
              return (
                <div>
                  <div className={styles.opacity}>
                    <input type={"number"} value={`${item.prevWeight}`} />
                    <i>/</i>
                    <input type={"number"} value={`${item.prevReps}`} />
                  </div>
                  <div>
                    <input type={"number"} value={`${item.weight}`} />
                    <i>/</i>
                    <input type={"number"} value={`${item.reps}`} />
                  </div>
                  <div>
                    <img
                      alt="checkbox"
                      src={
                        item.completed
                          ? completedCheckbox
                          : notCompletedCheckbox
                      }
                      className={styles.checkbox}
                    ></img>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
};

export default SingleExercise;
