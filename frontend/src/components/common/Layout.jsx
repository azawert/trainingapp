import React from "react";
import Header from "./Header/Header";
import cn from "classnames";

import styles from "./Layout.module.sass";

const Layout = ({
  children,
  image,
  text = "",
  minutes,
  profileImage,
  backlink,
  height,
}) => {
  return (
    <>
      <div
        className={cn(styles.wrapper, {
          [styles.otherPage]: !!text,
        })}
        style={{
          backgroundImage: `url(${image})`,
          height: height,
        }}
      >
        <Header backlink={backlink} />
        {profileImage && (
          <img
            src={profileImage}
            className={styles.profileImage}
            alt="profilePic"
          ></img>
        )}
        <div>
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
        </div>

        {children && <div>{children}</div>}
      </div>
    </>
  );
};

export default Layout;
