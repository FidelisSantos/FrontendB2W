import CryptoJS from "crypto-js";
import { createRef, useState } from "react";
import { VscCircleLargeFilled, VscClose, VscFeedback } from "react-icons/vsc";

import ChatTextType from "../../../../types/ChatTextType";
import styles from "./ChatModal.module.css";
import OliviaText from "./Olivia/OliviaText";
import UserText from "./User/UserText";

function ChatModal({ ...props }) {
  const encriptedUser = localStorage.getItem("user") as string;
  const decriptedUser = CryptoJS.AES.decrypt(encriptedUser, "testinho");
  const user = JSON.parse(decriptedUser.toString(CryptoJS.enc.Utf8));
  const [question, setQuestion] = useState("");
  const textRef = createRef<HTMLTextAreaElement>();
  const message =
    `Olá ${user.name}, sou a Olivia nova assistente do Out. Como posso te ajudar?` ||
    "Olá , sou a Olivia nova assistente do Out. Como posso te ajudar?";
  const messageInit: string[] = [];
  messageInit.push(message);
  const initMessage: ChatTextType = {
    sender: "Olivia",
    message: {
      text: messageInit,
    },
  };

  function handleKeyPress(e: any) {
    if (e.keyCode === 13) {
      props.insertQuestionChat(textRef.current?.value);
      if (textRef.current) {
        textRef.current.value = "";
      }
    }
  }

  function fomatterQuestion(question: string) {
    question = question.replace(/(\r\n|\n|\r)/gm, "");
    setQuestion(question);
  }

  return (
    <>
      <div className={styles["chat-header"]}>
        <div className={styles["chat-header-name-status"]}>
          <p>Olivia</p>
          <VscCircleLargeFilled color="green" />
        </div>
        <button onClick={() => props.onClose()}>
          <VscClose className={styles["btn-close"]} />
        </button>
      </div>
      <div className={styles["chat"]}>
        <div className={styles["chat-body"]}>
          <div className={styles["chat-written-container"]}>
            <OliviaText
              isOpen={props.isOpen}
              text={initMessage.message}
              init={true}
              moreThanOneAnswer={props.moreThanOneAnswer}
            />
            <div id="chat-container">
              {props.chatText.map((text: ChatTextType) => (
                // eslint-disable-next-line react/jsx-key
                <div className={styles["chat-written"]}>
                  {text.sender === "Olivia" ? (
                    <OliviaText
                      isOpen={props.isOpen}
                      text={text.message}
                      init={false}
                    />
                  ) : (
                    <UserText {...text.message} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles["chat-container-text"]}>
            <textarea
              className={styles["chat-text"]}
              onChange={(e) => fomatterQuestion(e.currentTarget.value)}
              onKeyDown={(e) => handleKeyPress(e)}
              ref={textRef}
              value={question}
            />
            <button className={styles["chat-button"]}>
              <VscFeedback className={styles["chat-button-icon"]} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatModal;
