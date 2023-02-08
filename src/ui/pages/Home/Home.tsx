import { VscMenu } from "react-icons/vsc";
import { ThreeDots, Comment } from "react-loader-spinner";

import AlertError from "../../components/alert/AlertError";
import AlertWithHeader from "../../components/alert/AlertWithHeader/AlertWithHeader";
import CreateUser from "../../components/form/Home/CreateUser/CreateUser";
import Login from "../../components/form/Home/Login/Login";
import ImageHome from "../../components/img/ImageHome";
import ChatModal from "../../components/modal/ChatModal/ChatModal";
import Header from "../../components/navbar/Header";
import Menu from "../../components/sidebar/Menu/Menu";
import styles from "./Home.module.css";
import { useHome } from "./hooks/useHome";

function Home() {
  const {
    setEmail,
    user,
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
    chatText,
    setChatText,
    insertQuestionChat,
    onClose,
    isOpenMenu,
    setIsOpenMenu,
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
              {user && user?.role != "user" && (
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
