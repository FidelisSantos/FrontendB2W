import styles from "./ListScriptsHome.module.css";

function ListScriptsHome({ ...props }) {
  function openScript() {
    props.setQuestion(props.script.question);
    props.setAnswer(props.script.answer);
    props.setUrl(props.script.imgAnswer);
    props.setIsOpenScript(true);
  }
  return (
    <div className={styles["btn-script-container"]}>
      <button className={styles["btn-script"]} onClick={openScript}>
        {props.script.question}
      </button>
    </div>
  );
}

export default ListScriptsHome;
