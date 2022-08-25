import React from "react";
import Header from "./Header/Header";

import styles from "./Layout.module.sass";

const Layout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
