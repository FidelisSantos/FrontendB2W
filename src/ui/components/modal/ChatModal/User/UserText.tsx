import MessageType from "../../../../../types/MessageType";
import styles from "./UserText.module.css";

function UserText(props: MessageType) {
  return (
    <div className={styles["user"]}>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/b2w-teste-f3c4b.appspot.com/o/App%2Fvader.webp?alt=media&token=74f41c1a-7e1b-4eb7-a35e-a6ef97cdb104"
        alt="user"
      />
      <div className={styles["user-text-container"]}>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default UserText;
