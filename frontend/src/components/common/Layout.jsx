import React from "react";
import Header from "./Header/Header";

import styles from "./Layout.module.sass";

const Layout = ({ children, height = "350px", image }) => {
  return (
    <div
      className={styles.wrapper}
      style={{ height, backgroundImage: `url(${image})` }}
    >
      <Header />

      {children}
    </div>
  );
};

export default Layout;
