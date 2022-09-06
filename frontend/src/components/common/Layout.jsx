import React from "react";
import Header from "./Header/Header";
import cn from "classnames";

import styles from "./Layout.module.sass";

const Layout = ({ children, image, text = "", minutes, profileImage }) => {
  return (
    <>
      <div
        className={cn(styles.wrapper, {
          [styles.otherPage]: !!text,
        })}
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <Header />
        {profileImage && (
          <img
            src={profileImage}
            className={styles.profileImage}
            alt="profilePic"
          ></img>
        )}
        {minutes && <p>{minutes} min.</p>}
        {text && (
          <h1
            className={cn(styles.heading, {
              [styles.headingForWorkout]: minutes,
            })}
          >
            {text}
          </h1>
        )}

        {children && <div>{children}</div>}
      </div>
    </>
  );
};

export default Layout;
