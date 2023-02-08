import { useEffect } from "react";
import { VscChromeClose, VscPassFilled } from "react-icons/vsc";

import ActionEnum from "../../../../enum/ActionEnum";
import {
  textAreaAnswerRef,
  inputQuestionRef,
  inputAnswerUrlRef,
  inputAnswerFileRef,
} from "../../../../ref/ref";
import styles from "./ScriptsModal.module.css";

function ScriptsModal({ ...props }) {
  function close() {
    props.setQuestion("");
    props.setAnswer("");
    props.setAnswerUrl("");
    props.setAction(ActionEnum.Create);
    props.setIsOpen(false);
  }

  function create() {
    const question = inputQuestionRef.current?.value || "";
    const answer = textAreaAnswerRef.current?.value || "";
    const answerUrl = inputAnswerUrlRef.current?.value;
    const answerFile = inputAnswerFileRef.current?.files;
    props.create(question, answer, answerUrl, answerFile);
  }

  useEffect(() => {
    if (props.action === ActionEnum.Update) {
      if (textAreaAnswerRef.current)
        textAreaAnswerRef.current.value = props.answer || "";
      if (inputAnswerUrlRef.current)
        inputAnswerUrlRef.current.value = props.answerUrl || "";
      if (inputQuestionRef.current)
        inputQuestionRef.current.value = props.question || "";
    } else {
      if (inputAnswerFileRef.current) inputAnswerFileRef.current.value = "";
      if (textAreaAnswerRef.current) textAreaAnswerRef.current.value = "";
      if (inputAnswerUrlRef.current) inputAnswerUrlRef.current.value = "";
    }
    return () => {
      if (inputAnswerFileRef.current) inputAnswerFileRef.current.value = "";
      if (textAreaAnswerRef.current) textAreaAnswerRef.current.value = "";
      if (inputAnswerUrlRef.current) inputAnswerUrlRef.current.value = "";
      if (inputQuestionRef.current) inputQuestionRef.current.value = "";
    };
  }, [props.isOpen]);

  function setQuestion(e: any) {
    if (e.keyCode === 13) props.setIsOpen(false);
    props.setQuestion(e.target.value);
    console.log(e.target.value, props.question);
  }

  function setAnswer(e: any) {
    if (e.keyCode === 13) props.setIsOpen(false);
    props.setAnswer(e.target.value);
    console.log(e.target.value, props.answer);
  }

  function setAnswerUrl(e: any) {
    if (e.keyCode === 13) props.setIsOpen(false);
    props.setAnswerUrl(e.target.value);
    console.log(e.target.value, props.answerUrl);
  }

  function setAnswerFile(e: any) {
    props.setAnswerFile(e.target.files);
    console.log(e.target.files, props.answerFile);
  }

  return (
    <div className={styles["modal-scripts"]} hidden={!props.isOpen}>
      <div className={styles["modal-scripts-header"]}>
        <h2>{props.action === ActionEnum.Create ? "Criar" : "Atualizar"}</h2>
        <VscChromeClose
          className={styles["modal-scripts-header-icon"]}
          onClick={close}
        />
      </div>
      <div className={styles["modal-scripts-form"]}>
        <label>Palavra Chave</label>
        <input
          type="text"
          placeholder="Informe seu questionamento"
          className={styles["modal-scripts-form-question"]}
          defaultValue={props.question}
          onKeyDown={(e) => setQuestion(e)}
          ref={inputQuestionRef}
        />
        <label>Procedimento</label>
        <textarea
          placeholder="Informe o Procedimento"
          className={styles["modal-scripts-form-answer-text"]}
          defaultValue={props.answer}
          onKeyDown={(e) => setAnswer(e)}
          ref={textAreaAnswerRef}
        />
        <label>Imagem</label>
        <input
          type="url"
          placeholder="Coloque url da imagem ou arquivo"
          className={styles["modal-scripts-form-answer-imageUrl"]}
          defaultValue={props.answerUrl}
          onKeyDownCapture={(e) => setAnswerUrl(e)}
          disabled={props.answerFile}
          ref={inputAnswerUrlRef}
        />
        <input
          type="file"
          className={styles["modal-scripts-form-answer-imageUrl"]}
          onChange={(e) => setAnswerFile(e)}
          disabled={props.answerUrl}
          ref={inputAnswerFileRef}
        />
      </div>
      <div className={styles["modal-scripts-icon-container"]}>
        <button className={styles["modal-scripts-icon-button"]}>
          <VscPassFilled
            color="green"
            className={styles["modal-scripts-icon"]}
            onClick={() =>
              props.action === ActionEnum.Create
                ? create()
                : console.log("update")
            }
          />
        </button>
      </div>
    </div>
  );
}

export default ScriptsModal;
