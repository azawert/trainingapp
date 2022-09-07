import React from "react";
import Button from "../../../ui/Button/Button";
import Counters from "../../../ui/Counters/Counters";
import Layout from "../../common/Layout";
import styles from "./Profile.module.sass";
import { Link } from "react-router-dom";
import bgImage from "../../../images/profile.png";
import profileimage from "../../../images/profilepic.svg";
import bodyImage from "../../../images/bodypic.jpg";
import { useAuth } from "../../../hooks/useAuth";

import { $api } from "../../../api/api";
import { useQuery } from "react-query";
const Profile = () => {
  const { isAuth } = useAuth();

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
      <Layout
        height={365}
        image={bgImage}
        text={data.email}
        profileImage={profileimage}
      >
        {isAuth && isSuccess && data ? (
          <div>
            <div className={styles.counters}>
              <Counters
                minutes={data.minutes}
                workouts={data.workouts}
                kg={data.kg}
              />
            </div>
          </div>
        ) : (
          "Не удалось получить данные профиля..."
        )}
      </Layout>
      <div className={styles.pictures_wrapper}>
        <div>
          <p>Before</p>
          <img alt="bodyImage" src={bodyImage}></img>
        </div>
        <div>
          <p>After</p>
          <img alt="bodyImage" src={bodyImage}></img>
        </div>
      </div>
    </div>
  );
};

export default Profile;
