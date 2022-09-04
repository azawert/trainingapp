import React from "react";
import ReactSelect from "react-select";
import { Link } from "react-router-dom";

import Layout from "../../common/Layout";
import Field from "../../../ui/Field/Field";
import Alert from "../../../ui/Alert/Alert";

import bgImage from "../../../images/Maskgroup.jpg";
import Button from "../../../ui/Button/Button.jsx";
import { useQuery, useMutation } from "react-query";
import { $api } from "../../../api/api";
import { useAuth } from "../../../hooks/useAuth";

const NewWorkout = () => {
  const [nameValue, setNameValue] = React.useState("");
  const [exercises, setExercises] = React.useState([]);
  const [fetchError, setFetchError] = React.useState("");
  const [isWorkoutCreationSuccess, setIsWorkoutCreationSuccess] =
    React.useState(false);
  const [errorInCreation, setErrorInCreation] = React.useState(false);
  const onChangeNameField = (e) => {
    setNameValue(e.target.value);
    console.log(nameValue);
  };
  const { isAuth, setIsAuth } = useAuth();
  const {
    data,
    isSuccess,
    isLoading: isLoadingExercises,
  } = useQuery(
    "getExercises",
    () =>
      $api({
        url: "/exercises",
      }),
    {
      refetchOnWindowFocus: false,
      enabled: isAuth,
      onError() {
        setFetchError("Произошла ошибка при получении упражнений.");
      },
    }
  );
  const {
    mutate: createNewWorkout,
    isLoading: isCreatingLoading,
    error,
  } = useMutation(
    "createNewWorkout",
    (exerciseIds) =>
      $api({
        url: "/workouts",
        type: "POST",
        body: { name: nameValue, exerciseIds },
      }),
    {
      onError() {
        setErrorInCreation(true);
      },
      onSuccess() {
        setIsWorkoutCreationSuccess(true);
        setExercises([]);
        setNameValue("");
      },
    }
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const exerciseIds = exercises.map((exercise) => exercise.value);
    createNewWorkout(exerciseIds);
  };

  setTimeout(() => {
    setFetchError(false);
    setIsWorkoutCreationSuccess(false);
    setErrorInCreation(false);
  }, 10000);

  return (
    <>
      <Layout image={bgImage} text="Создать новую тренировку" />
      <div className="wrapper-inner-page">
        {fetchError && <Alert text={fetchError} type="error" />}
        {isWorkoutCreationSuccess && (
          <Alert type="success" text="Тренировка сохранена" />
        )}
        {errorInCreation && <Alert type="error" text={error} />}
        <form onSubmit={handleSubmit}>
          <Field
            placeholder="Введите название тренировки..."
            valueOfField={nameValue}
            onChangeFunc={onChangeNameField}
          />

          <Link to="/new-exercise" className="darklink">
            Создать новое упражнение...
          </Link>
          {isLoadingExercises
            ? "Загрузка упражнений..."
            : isSuccess &&
              data && (
                <ReactSelect
                  classNamePrefix="select2-selection"
                  placeholder="Упражнения"
                  title="Упражнения"
                  options={data.map((exercise) => ({
                    value: exercise._id,
                    label: exercise.name,
                  }))}
                  // { value: "афафца", label: "Отжимания" },
                  value={exercises}
                  onChange={setExercises}
                  isMulti={true}
                />
              )}
          <Button text="Создать" callback={() => {}} />
        </form>
      </div>
    </>
  );
};

export default NewWorkout;
