import React from "react";
import Button from "../../../ui/Button/Button";
import Counters from "../../../ui/Counters/Counters";
import Layout from "../../common/Layout";
import styles from "./Home.module.sass";
import { Link } from "react-router-dom";
import bgImage from "../../../images/header/home-bg.jpg";

import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";

import { $api } from "../../../api/api";
import { useQueryClient, useQuery } from "react-query";
const Home = () => {
  const { isAuth, setIsAuth } = useAuth();
  const queryClient = useQueryClient();
  const { data, isSuccess, isLoading } = useQuery(
    "getDataFromProfile",
    () =>
      $api({
        url: "/users/profile",
      }),
    {
      refetchOnWindowFocus: false,
      enabled: isAuth,
    }
  );

  return isLoading ? (
    "Loading..."
  ) : (
    <div className={styles.wrapper}>
      <Layout image={bgImage}>
        <Link to="/new-workout" className={styles.button_wrapper}>
          <Button
            type="main"
            text="New"
            callback={() => {}}
            className={styles.button}
          />
        </Link>
        <h1 className={styles.heading}>Тренировки :)</h1>
        {isAuth && isSuccess ? (
          <Counters
            minutes={data.minutes}
            workouts={data.workouts}
            kg={data.kg}
          />
        ) : (
          ""
        )}
      </Layout>
    </div>
  );
};

export default Home;
