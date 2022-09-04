import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../ui/Button/Button";
const NoAuth = () => {
  return (
    <div>
      <h1>Нет прав для просмотра данной страницы!</h1>
      <Link to="/auth">
        <Button text={"Авторизируйтесь"}></Button>
      </Link>
    </div>
  );
};

export default NoAuth;
