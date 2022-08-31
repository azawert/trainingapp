import React from "react";
import Button from "../../../ui/Button/Button";
import Counters from "../../../ui/Counters/Counters";
import Layout from "../../common/Layout";
import styles from "./Home.module.sass";
import { Link } from "react-router-dom";
import bgImage from "../../../images/header/home-bg.jpg";
const Home = () => {
  return (
    <div className={styles.wrapper}>
      <Layout height="100vh" image={bgImage}>
        <Link to="/new-workout">
          <Button
            type="main"
            text="New"
            callback={() => {}}
            className={styles.button}
          />
        </Link>
        <h1 className={styles.heading}>EXERCSISES FOR</h1>
        <Counters />
      </Layout>
    </div>
  );
};

export default Home;
