import { Alert } from "reactstrap";

import styles from "./AlertError.module.css";

function AlertError({ ...props }) {
  return (
    <div className={styles["alert-container"]}>
      <Alert isOpen={props.isOpen} className={styles["alert"]}>
        {props.message}
      </Alert>
    </div>
  );
}

export default AlertError;
