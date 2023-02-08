import { useEffect } from "react";
import { VscMenu, VscNewFile } from "react-icons/vsc";
import { ThreeDots } from "react-loader-spinner";
import { Navigate } from "react-router-dom";

import AlertWithHeader from "../../../components/alert/AlertWithHeader/AlertWithHeader";
import ListProcedures from "../../../components/list/ListScripts/ListScripts";
import Image from "../../../components/modal/Image/Image";
import ScriptsModal from "../../../components/modal/ScriptsModal/ScriptsModal";
import Header from "../../../components/navbar/Header";
import Menu from "../../../components/sidebar/Menu/Menu";
import useScripts from "../hooks/useScripts";
import styles from "./Out.module.css";

function Out() {
  const {
    loading,
    errorMessage,
    error,
    redirect,
    scripts,
    isOpen,
    question,
    answer,
    answerUrl,
    currentUser,
    isOpenMenu,
    answerFile,
    action,
    image,
    isOpenImage,
    titleImage,
    id,
    setTitleImage,
    setImage,
    setAnswerUrl,
    setAnswer,
    setQuestion,
    setAnswerFile,
    setIsOpen,
    setAction,
    setIsOpenMenu,
    getScripts,
    setPage,
    setIsOpenImage,
    createScript,
    deleteScript,
    updateScript,
    setId,
  } = useScripts();

  useEffect(() => {
    if (!redirect) {
      setPage("out");
      getScripts("out");
    }
  }, []);

  function create(
    question: string,
    answer: string,
    answerUrl?: string,
    answerFiles?: FileList
  ) {
    createScript("out", question, answer, answerUrl, answerFiles);
    setIsOpen(false);
  }

  function delet(id: string) {
    deleteScript("out", id);
  }

  function update(
    id: string,
    question: string,
    answer: string,
    answerUrl?: string,
    answerFiles?: FileList
  ) {
    updateScript("out", id, question, answer, answerUrl, answerFiles);
  }

  return (
    <>
      <AlertWithHeader isOpen={error} message={errorMessage} />
      {redirect && <Navigate to={"/"} />}
      {localStorage.getItem("user") && localStorage.getItem("token") && (
        <div className={styles["home-auth-container"]}>
          <div className={styles["header-container"]}>
            <Header />
          </div>
          {loading && (
            <div className={styles["loading-container"]}>
              <ThreeDots
                height="150"
                width="120"
                radius="12"
                color="black"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            </div>
          )}
          {!loading && (
            <>
              {currentUser &&
                currentUser?.role != "user" &&
                !isOpen &&
                !isOpenImage && (
                  <>
                    <div hidden={!isOpenMenu}>
                      <Menu setIsOpenMenu={setIsOpenMenu} />
                    </div>
                    <div
                      hidden={isOpenMenu}
                      className={styles["menu"]}
                      onClick={() => setIsOpenMenu(true)}
                    >
                      <p>Menu</p>
                      <VscMenu />
                    </div>
                  </>
                )}

              <div hidden={!isOpenImage}>
                <div className={styles["modal-container"]}>
                  <Image
                    setIsOpenImage={setIsOpenImage}
                    image={image}
                    title={titleImage}
                  />
                </div>
              </div>

              {!isOpenImage && (
                <div className={styles["card-container-add"]}>
                  <VscNewFile
                    className={styles["icon-add"]}
                    onClick={() => setIsOpen(true)}
                  />
                </div>
              )}
              <div className={styles["body"]}>
                <>
                  {scripts?.map((script) => (
                    <ListProcedures
                      key={script.id}
                      text={script}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      setQuestion={setQuestion}
                      setAnswer={setAnswer}
                      setAnswerUrl={setAnswerUrl}
                      setIsOpenImage={setIsOpenImage}
                      setAction={setAction}
                      delet={delet}
                      setImage={setImage}
                      setTitleImage={setTitleImage}
                      isOpenImage={isOpenImage}
                      setId={setId}
                    />
                  ))}
                </>
                <>
                  <ScriptsModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    question={question}
                    setQuestion={setQuestion}
                    answer={answer}
                    setAnswer={setAnswer}
                    answerFile={answerFile}
                    answerUrl={answerUrl}
                    setAnswerUrl={setAnswerUrl}
                    setAnswerFile={setAnswerFile}
                    action={action}
                    setAction={setAction}
                    setId={setId}
                    id={id}
                    create={create}
                    update={update}
                  />
                </>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Out;
