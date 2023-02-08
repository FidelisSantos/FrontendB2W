import { useEffect, useState } from "react";
import { Comment } from "react-loader-spinner";

import styles from "./OliviaText.module.css";

function OliviaText({ ...props }) {
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
    <div className={styles["olivia"]}>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/b2w-teste-f3c4b.appspot.com/o/App%2Folivia.jpeg?alt=media&token=4fa03d76-e7b9-4303-b9c9-1ea298cf7df6"
        alt="Olivia"
        className={styles["olivia-image"]}
      />
      <div className={styles["olivia-text-container"]}>
        {loadingChat ? (
          <div className={styles["loading-text"]}>
            <Comment color="black" backgroundColor="rgb(58, 255, 229)" />
          </div>
        ) : (
          <div className={styles["text"]}>
            {props.text.image && (
              <img
                src={props.text.image}
                alt="answer"
                className={styles["text-image"]}
              />
            )}
            {props.text.text.map((text: string) => (
              // eslint-disable-next-line react/jsx-key
              <p>{text}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OliviaText;
