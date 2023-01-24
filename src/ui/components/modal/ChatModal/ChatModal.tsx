import { useEffect, useState } from "react";
import { VscFeedback } from "react-icons/vsc";
import { Comment } from "react-loader-spinner";

import styles from "./ChatModal.module.css";

function ChatModal({ ...props }) {
  const name = localStorage.getItem("name") || "deu Ruim";
  const initMessage = `Olá ${name}, sou a Olivia nova assistente da B2W. Como posso te ajudar?`;
  const [loadingChat, setLoadingChat] = useState(true);
  useEffect(() => {
    const interval = setTimeout(() => {
      setLoadingChat(false);
    }, 3000);
    return () => {
      setLoadingChat(true);
      clearTimeout(interval);
    };
  }, [props.isOpen]);
  return (
    <div className={styles["chat-body"]}>
      <div className={styles["olivia"]}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/b2w-teste-f3c4b.appspot.com/o/App%2Folivia.jpeg?alt=media&token=4fa03d76-e7b9-4303-b9c9-1ea298cf7df6"
          alt="Olivia"
        />
        <div className={styles["olivia-text-container"]}>
          {loadingChat ? (
            <Comment color="black" backgroundColor="rgb(58, 255, 229)" />
          ) : (
            <p>{initMessage}</p>
          )}
        </div>
      </div>
      <div className={styles["chat-container-text"]}>
        <textarea className={styles["chat-text"]}></textarea>
        <button className={styles["chat-button"]}>
          <VscFeedback className={styles["chat-button-icon"]} />
        </button>
      </div>
    </div>
  );
}

export default ChatModal;
