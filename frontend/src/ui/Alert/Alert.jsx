import styles from "./Alert.module.sass";
import cn from "classnames";
const Alert = ({ type = "error", text }) => {
  return (
    <div
      className={cn(styles.alert, {
        [styles.error]: type === "error",
        [styles.warning]: type === "warning",
        [styles.info]: type === "info",
        [styles.success]: type === "success",
      })}
      style={{
        height: 50,
        textAlign: "center",
        display: "flex",
        padding: "5px",
      }}
    >
      <p className={styles.text} style={{ alignSelf: "center" }}>
        {text}
      </p>
    </div>
  );
};

export default Alert;
