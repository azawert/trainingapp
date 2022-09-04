import React from "react";
import Layout from "../../common/Layout";
import Field from "../../../ui/Field/Field";
import bgImage from "../../../images/Maskgroup.jpg";
import Button from "../../../ui/Button/Button.jsx";
import styles from "./Auth.module.sass";
import Alert from "../../../ui/Alert/Alert";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { $api } from "../../../api/api";
import Loader from "../../../ui/Loader";
import { useAuth } from "../../../hooks/useAuth";
const Auth = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);
  const [type, setType] = React.useState("auth"); //auth || reg
  const { setIsAuth } = useAuth();
  const navigate = useNavigate();
  const successLog = (token) => {
    localStorage.removeItem("token");

    setEmail("");
    setPassword("");
    setIsAuth(true);
    navigate("/");
    localStorage.setItem("token", token);
  };

  const {
    mutate: register,
    isLoading,
    error,
    isError,
  } = useMutation(
    "Registration",
    () =>
      $api({
        url: "/users",
        type: "POST",
        body: { email, password },
        auth: false,
      }),
    {
      onSuccess(data) {
        successLog(data.token);
      },
    }
  );
  const {
    mutate: auth,
    isLoading: isLoadingAuth,
    error: errorAuth,
    isError: isErrorAuth,
  } = useMutation(
    "Authentication",
    () =>
      $api({
        url: "/users/login",
        type: "POST",
        body: { email, password },
        auth: false,
      }),
    {
      onSuccess(data) {
        successLog(data.token);
      },
    }
  );

  const setEmailValue = (e) => {
    setEmail(e.target.value);
  };
  const setPasswordValue = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "auth") {
      auth();
    } else {
      if (password.length > 5) {
        register();
      } else {
        setIsPasswordValid(false);
      }
    }
  };

  return (
    <>
      <Layout image={bgImage} text="Вход на платформу" />
      <div className="wrapper-inner-page">
        {error && <Alert type="error" text={error} />}
        {errorAuth && <Alert type="error" text={errorAuth} />}
        {!isPasswordValid && (
          <Alert type="error" text="Пароль должен быть больше 5 символов" />
        )}
        {isLoading && <Loader />}
        <form onSubmit={handleSubmit}>
          <Field
            type="email"
            placeholder="Введите вашу почту"
            valueOfField={email}
            onChangeFunc={setEmailValue}
            required={true}
          />
          <Field
            placeholder="Введите ваш пароль"
            valueOfField={password}
            onChangeFunc={setPasswordValue}
            required={true}
          />
          <div className={styles.button_wrapper}>
            <Button text="Sign in" callback={() => setType("auth")} />
            <Button text="Sign up" callback={() => setType("reg")} />
          </div>
        </form>
      </div>
    </>
  );
};

export default Auth;
