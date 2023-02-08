import { VscClose } from "react-icons/vsc";

import styles from "./ScriptModalHome.module.css";

function ScriptModalHome({ ...props }) {
  function close() {
    props.setQuestion("");
    props.setAnswer("");
    props.setUrl("");
    props.setIsOpenScript(false);
  }

  return (
    <div className={styles["open-script-container"]}>
      <div className={styles["open-script-title"]}>
        <h2>{props.question}</h2>
        <VscClose onClick={close} className={styles["open-script-close"]} />
      </div>
      {props.url && (
        <img
          src={props.url}
          alt={props.question}
          className={styles["open-script-img"]}
        />
      )}
      <div className={styles["open-script-text"]}>{props.answer}</div>
    </div>
  );
}

export default ScriptModalHome;
