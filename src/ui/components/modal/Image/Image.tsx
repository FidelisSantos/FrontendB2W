import { VscClose } from "react-icons/vsc";

import styles from "./Image.module.css";

function Image({ ...props }) {
  return (
    <div className={styles["modal-image"]}>
      <div className={styles["modal-image-header"]}>
        <h1>{props.title}</h1>
        <VscClose
          className={styles["modal-image-header-icon"]}
          onClick={() => props.setIsOpenImage(false)}
        />
      </div>
      <img
        src={props.image}
        alt={props.title}
        className={styles["modal-image-img"]}
      />
    </div>
  );
}

export default Image;
