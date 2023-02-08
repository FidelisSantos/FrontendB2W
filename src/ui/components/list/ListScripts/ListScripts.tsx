import { useState } from "react";
import { VscEdit, VscTrash } from "react-icons/vsc";

import ActionEnum from "../../../../enum/ActionEnum";
import Image from "../../modal/Image/Image";
import styles from "./ListScripts.module.css";

function ListScripts({ ...props }) {
  const [isOpenImage, setISOpenImage] = useState(false);
  function updateScript() {
    props.setQuestion(props.text.question);
    props.setAnswer(props.text.answer);
    props.setAnswerUrl(props.text.imgAnswer);
    props.setAction(ActionEnum.Update);
    props.setIsOpen(true);
  }

  function delet() {
    props.delet(props.text.id);
  }

  function viewImage() {
    props.setImage(props.text.imgAnswer);
    props.setTitleImage(props.text.question);
    props.setIsOpenImage(true);
  }

  return (
    <>
      <div
        className={
          props.isOpen
            ? styles["card-container-filter"]
            : styles["card-container"]
        }
      >
        <div className={styles["card-title-container"]}>
          <p className={styles["card-title"]}>{props.text.question}</p>
        </div>
        <div className={styles["card-text-container"]}>
          {props.text.imgAnswer && (
            <img
              src={props.text.imgAnswer}
              alt="answer"
              className={styles["text-image"]}
              onClick={viewImage}
            />
          )}
          <p
            className={
              props.text.imgAnswer ? "" : styles["card-text-container-text"]
            }
          >
            {props.text.answer}
          </p>
        </div>
        <div className={styles["card-button-container"]}>
          <button className={styles["card-button"]}>
            <VscTrash
              color="red"
              className={styles["card-button-icon"]}
              onClick={delet}
            />
          </button>
          <button className={styles["card-button"]}>
            <VscEdit
              color="blue"
              className={styles["card-button-icon"]}
              onClick={updateScript}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default ListScripts;
