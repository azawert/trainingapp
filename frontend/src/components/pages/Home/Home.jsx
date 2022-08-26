import React from "react";
import Button from "../../../ui/Button/Button";
import Counters from "../../../ui/Counters/Counters";
import Layout from "../../common/Layout";
import styles from "./Home.module.sass";

import bgImage from "../../../images/index.jpg";
const Home = () => {
  return (
    <div>
      <Layout height="100vh" image={bgImage}>
        <Button
          type="main"
          text="New"
          callback={() => {}}
          className={styles["home-wrapper"]}
        />
        <h1>EXERCSISES FOR</h1>
        <Counters />
      </Layout>
    </div>
  );
};

export default Home;
