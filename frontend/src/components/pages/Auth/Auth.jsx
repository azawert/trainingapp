import React from "react";
import Layout from "../../common/Layout";
import Field from "../../../ui/Field/Field";
import bgImage from "../../../images/Maskgroup.jpg";
import Button from "../../../ui/Button/Button.jsx";
import styles from "./Auth.module.sass";
import Alert from "../../../ui/Alert/Alert";
import { useMutation } from "react-query";
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
        localStorage.setItem("token", data.token);
        setEmail("");
        setPassword("");
        setIsAuth(true);
        navigate("/");
      },
      onError() {
        console.log(isError);
        console.log(error);
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
      console.log("auth");
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
      <Layout image={bgImage} text="Регистрация" />
      <div className="wrapper-inner-page">
        {isError && (
          <Alert type="error" text={"Пользователь уже зарегестрирован"} />
        )}
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
// import { useState } from "react";

// import Layout from "../../common/Layout";

// import { useMutation } from "react-query";

// import styles from "./Auth.module.sass";
// import { $api } from "../../../api/api";
// import Field from "../../../ui/Field/Field";
// import Button from "../../../ui/Button/Button";

// const Auth = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [type, setType] = useState("auth");

//   const successLogin = (token) => {
//     localStorage.setItem("token", token);

//     setPassword("");
//     setEmail("");
//   };
//   const handleEmail = (e) => {
//     setEmail(e.event.target);
//     console.log(email);
//   };

//   const {
//     mutate: register,
//     isLoading,
//     error,
//   } = useMutation(
//     "Registration",
//     () =>
//       $api({
//         url: "/users",
//         type: "POST",
//         body: { email, password },
//         auth: false,
//       }),
//     {
//       onSuccess(data) {
//         successLogin(data.token);
//       },
//       onError(e) {
//         alert("unluck");
//       },
//     }
//   );

//   const {
//     mutate: auth,
//     isLoading: isLoadingAuth,
//     error: errorAuth,
//   } = useMutation(
//     "Auth",
//     () =>
//       $api({
//         url: "/users/login",
//         type: "POST",
//         body: { email, password },
//         auth: false,
//       }),
//     {
//       onSuccess(data) {
//         successLogin(data.token);
//       },
//     }
//   );

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(password, email);
//     if (type === "auth") {
//       auth();
//     } else {
//       register();
//     }
//   };

//   return (
//     <>
//       <Layout bgImage={""} heading="Auth || Register" />
//       <div className="wrapper-inner-page">
//         <form onSubmit={handleSubmit}>
//           <Field
//             type="email"
//             placeholder="Enter email"
//             value={email}
//             onChange={handleEmail}
//             required
//           />
//           <Field
//             placeholder="Enter password"
//             value={password}
//             onChange={({ target: { value } }) => setPassword(value)}
//             required
//             type="password"
//           />
//           <div className={styles.wrapperButtons}>
//             <Button text="Sign in" callback={() => setType("auth")} />
//             <Button text="Sign up" callback={() => setType("reg")} />
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Auth;
