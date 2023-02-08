import { Alert } from "reactstrap";

import styles from "./AlertWithHeader.module.css";

function AlertWithHeader({ ...props }) {
  return (
    <div className={styles["alert-container"]}>
      <Alert isOpen={props.isOpen} className={styles["alert"]}>
        {props.message}
      </Alert>
    </div>
  );
}

export default AlertWithHeader;
