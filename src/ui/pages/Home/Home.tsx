import {
  VscCircleLargeFilled,
  VscCommentDiscussion,
  VscFoldDown,
  VscFoldUp,
} from "react-icons/vsc";

import AlertError from "../../components/alert/AlertError";
import CreateUser from "../../components/form/Home/CreateUser/CreateUser";
import Login from "../../components/form/Home/Login/Login";
import ImageHome from "../../components/img/ImageHome";
import ChatModal from "../../components/modal/ChatModal/ChatModal";
import Header from "../../components/navbar/Header";
import styles from "./Home.module.css";
import { useHome } from "./hooks/useHome";

function Home() {
  const {
    setEmail,
    email,
    password,
    setPassword,
    error,
    loading,
    name,
    setName,
    confirmPassword,
    setConfirmPassword,
    errorMessage,
    createNewUser,
    setCreateNewUser,
    isOpenChat,
    setIsOpenChat,
    login,
    createUser,
  } = useHome();

  return (
    <>
      <AlertError isOpen={error} message={errorMessage} />
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
                />
              )}
            </div>
          </>
        )}
        {localStorage.getItem("token") && (
          <div className={styles["header-container"]}>
            <Header />
            <VscCommentDiscussion
              className={styles["chat-Olivia"]}
              onClick={() => setIsOpenChat(!isOpenChat)}
            />
            <div className={styles["chat-container"]}>
              <div className={styles["chat-header"]}>
                <div className={styles["chat-header-name-status"]}>
                  <p>Olivia</p>
                  <VscCircleLargeFilled
                    color={isOpenChat ? "green" : "yellow"}
                  />
                </div>
                <button onClick={() => setIsOpenChat(!isOpenChat)}>
                  {isOpenChat ? <VscFoldDown /> : <VscFoldUp />}
                </button>
              </div>
              <div className={styles["chat-body"]} hidden={!isOpenChat}>
                <ChatModal isOpen={isOpenChat} setIsOpen={setIsOpenChat} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
