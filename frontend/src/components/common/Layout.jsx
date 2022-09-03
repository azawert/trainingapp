import React from "react";
import Header from "./Header/Header";
import cn from "classnames";

import styles from "./Layout.module.sass";

const Layout = ({ children, image, text = "" }) => {
  return (
    <div
      className={cn(styles.wrapper, {
        [styles.otherPage]: !!text,
      })}
      style={{ backgroundImage: `url(${image})` }}
    >
      <Header />
      {text && <h1 className={styles.heading}>{text}</h1>}
      {children && <div>{children}</div>}
    </div>
  );
};

export default Layout;
