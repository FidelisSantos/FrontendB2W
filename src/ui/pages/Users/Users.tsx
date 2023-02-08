import { VscMenu } from "react-icons/vsc";
import { ThreeDots } from "react-loader-spinner";
import { Navigate } from "react-router-dom";

import AlertWithHeader from "../../components/alert/AlertWithHeader/AlertWithHeader";
import ListUsers from "../../components/list/ListUsers/ListUsers";
import Header from "../../components/navbar/Header";
import Menu from "../../components/sidebar/Menu/Menu";
import useUsers from "./hooks/useUsers";
import styles from "./Users.module.css";

function Users() {
  const {
    users,
    loading,
    errorMessage,
    error,
    currentUser,
    redirect,
    isOpenMenu,
    updateToadmin,
    removeAdmin,
    validUser,
    resetPassword,
    deleteUser,
    setIsOpenMenu,
  } = useUsers();
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
              {currentUser && currentUser?.role != "user" && (
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
              <div className={styles["body"]}>
                {users.map((user) => (
                  <>
                    {currentUser.id != user.id && (
                      <ListUsers
                        key={user.id}
                        user={user}
                        currentUser={currentUser}
                        updateToadmin={updateToadmin}
                        removeAdmin={removeAdmin}
                        validUser={validUser}
                        resetPassword={resetPassword}
                        deleteUser={deleteUser}
                      />
                    )}
                  </>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Users;
