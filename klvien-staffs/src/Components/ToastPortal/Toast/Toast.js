import { useMemo, useEffect } from "react";
import styles from "./styles.module.css";
import error from "../../../Assets/error.svg";
import warning from "../../../Assets/warning.svg";
import info from "../../../Assets/info.svg";
import success from "../../../Assets/success.svg";

export const Toast = ({ mode, onClose, message }) => {
  const classes = useMemo(() => [styles.toast, styles[mode]].join(" "), [mode]);

  useEffect(() => {
    console.log(mode);
  }, [mode]);

  return (
    <div onClick={onClose} className={classes}>
      <div>
        <img
          style={{ width: 30, marginRight: 10 }}
          src={
            mode == "error"
              ? error
              : mode == "warning"
              ? warning
              : mode == "info"
              ? info
              : mode == "success"
              ? success
              : null
          }
        />
      </div>
      <div className={styles.message}>{message}</div>
    </div>
  );
};
