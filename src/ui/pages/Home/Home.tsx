import { VscMenu, VscSearch, VscSearchStop } from "react-icons/vsc";
import { ThreeDots, Comment } from "react-loader-spinner";

import { inputSearchOffRef, inputSearchOutRef } from "../../../ref/ref";
import AlertError from "../../components/alert/AlertError";
import AlertWithHeader from "../../components/alert/AlertWithHeader/AlertWithHeader";
import CreateUser from "../../components/form/Home/CreateUser/CreateUser";
import Login from "../../components/form/Home/Login/Login";
import ImageHome from "../../components/img/ImageHome";
import ListScriptsHome from "../../components/list/ListScriptsHome/ListScriptsHome";
import ChatModal from "../../components/modal/ChatModal/ChatModal";
import Image from "../../components/modal/Image/Image";
import ScriptModalHome from "../../components/modal/ScriptModalHome/ScriptModalHome";
import Header from "../../components/navbar/Header";
import Menu from "../../components/sidebar/Menu/Menu";
import styles from "./Home.module.css";
import { useHome } from "./hooks/useHome";

function Home() {
  const {
    user,
    email,
    password,
    error,
    loading,
    name,
    confirmPassword,
    errorMessage,
    createNewUser,
    isOpenChat,
    chatText,
    isOpenMenu,
    isOpenImage,
    image,
    titleImage,
    scriptsOut,
    scriptsOff,
    isSearchOut,
    isSearchOff,
    isOpenScript,
    question,
    answer,
    url,
    setEmail,
    setPassword,
    setName,
    setConfirmPassword,
    setCreateNewUser,
    setIsOpenChat,
    login,
    createUser,
    setChatText,
    insertQuestionChat,
    onClose,
    setIsOpenMenu,
    setIsOpenImage,
    setImage,
    setTitleImage,
    searchOut,
    setIsSearchOut,
    resetSearchOut,
    searchOff,
    resetSearchOff,
    setIsOpenScript,
    setQuestion,
    setAnswer,
    setUrl,
  } = useHome();

  return (
    <>
      {localStorage.getItem("token") && localStorage.getItem("user") ? (
        <AlertWithHeader isOpen={error} message={errorMessage} />
      ) : (
        <AlertError isOpen={error} message={errorMessage} />
      )}
      {!localStorage.getItem("token") && (
        <div className={styles["home-container"]}>
          {!localStorage.getItem("token") && (
            <>
              <div className={styles["image-container"]}>
                <ImageHome />
              </div>

              <div className={styles["form-container"]}>
                {!createNewUser && (
                  <Login
                    email={email}
                    password={password}
                    setPassword={setPassword}
                    setEmail={setEmail}
                    login={login}
                    setCreateNewUser={setCreateNewUser}
                    error={error}
                  />
                )}
                {createNewUser && (
                  <CreateUser
                    name={name}
                    email={email}
                    password={password}
                    confirmPassword={confirmPassword}
                    setName={setName}
                    setPassword={setPassword}
                    setEmail={setEmail}
                    setConfirmPassword={setConfirmPassword}
                    createUser={createUser}
                    setCreateNewUser={setCreateNewUser}
                    error={error}
                  />
                )}
              </div>
            </>
          )}
        </div>
      )}
      {localStorage.getItem("token") && localStorage.getItem("user") && (
        <div className={styles["home-auth-container"]}>
          {localStorage.getItem("token") && (
            <div className={styles["header-container"]}>
              <Header />
            </div>
          )}
          {loading && localStorage.getItem("token") && (
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
              {user && user?.role != "user" && !isOpenChat && (
                <div>
                  <div
                    hidden={!isOpenMenu}
                    className={styles["menu-container"]}
                  >
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
                </div>
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

              {!isOpenMenu && !isOpenChat && (
                <div hidden={!isOpenScript}>
                  <div className={"open-script"}>
                    <ScriptModalHome
                      setIsOpenScript={setIsOpenScript}
                      setQuestion={setQuestion}
                      setAnswer={setAnswer}
                      setUrl={setUrl}
                      question={question}
                      answer={answer}
                      url={url}
                    />
                  </div>
                </div>
              )}

              <div className={styles["list-scripts-container"]}>
                <div className={styles["list-scripts"]}>
                  <div className={styles["scripts-container"]}>
                    <h1>Scripts Out</h1>
                    <div className={styles["icon-container"]}>
                      <input
                        type="text"
                        placeholder="Pesquisa"
                        className={styles["list-scripts-search"]}
                        disabled={isSearchOut}
                        onKeyDown={(e: any) =>
                          e.keyCode === 13 ? searchOut() : null
                        }
                        ref={inputSearchOutRef}
                      />
                      <div>
                        {isSearchOut ? (
                          <VscSearchStop
                            onClick={resetSearchOut}
                            className={styles["scripts-icon"]}
                          />
                        ) : (
                          <VscSearch
                            onClick={searchOut}
                            className={styles["scripts-icon"]}
                          />
                        )}
                      </div>
                    </div>
                    {scriptsOut.map((script) => (
                      <ListScriptsHome
                        key={script.id}
                        script={script}
                        setIsOpenScript={setIsOpenScript}
                        setQuestion={setQuestion}
                        setAnswer={setAnswer}
                        setUrl={setUrl}
                      />
                    ))}
                  </div>
                  <div className={styles["scripts-container"]}>
                    <h1>Scripts Off</h1>
                    <div className={styles["icon-container"]}>
                      <input
                        type="text"
                        placeholder="Pesquisa"
                        className={styles["list-scripts-search"]}
                        ref={inputSearchOffRef}
                        disabled={isSearchOff}
                        onKeyDown={(e: any) =>
                          e.keyCode === 13 ? searchOff() : null
                        }
                      />
                      <div>
                        {isSearchOff ? (
                          <VscSearchStop
                            onClick={resetSearchOff}
                            className={styles["scripts-icon"]}
                          />
                        ) : (
                          <VscSearch
                            onClick={searchOff}
                            className={styles["scripts-icon"]}
                          />
                        )}
                      </div>
                    </div>

                    {scriptsOff.map((script) => (
                      <ListScriptsHome
                        key={script.id}
                        script={script}
                        setIsOpenScript={setIsOpenScript}
                        setQuestion={setQuestion}
                        setAnswer={setAnswer}
                        setUrl={setUrl}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles["body"]}>
                <div
                  className={styles["chat-Olivia"]}
                  onClick={() => setIsOpenChat(true)}
                >
                  <Comment
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="comment-loading"
                    wrapperStyle={{}}
                    color="white"
                    backgroundColor="black"
                  />
                </div>
                <div className={styles["chat-container"]}>
                  <div className={styles["chat-body"]} hidden={!isOpenChat}>
                    <ChatModal
                      isOpen={isOpenChat}
                      setIsOpen={setIsOpenChat}
                      chatText={chatText}
                      setChatText={setChatText}
                      insertQuestionChat={insertQuestionChat}
                      onClose={onClose}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Home;
