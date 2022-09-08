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
  exerciseImage,
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
        <div className={styles.exercisePageWrapper}>
          {minutes && <p>{minutes} min</p>}
          {exerciseImage && (
            <img
              src={`../uploads/${exerciseImage}White.svg`}
              alt={"exerciseimage"}
              height={34}
            ></img>
          )}
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
