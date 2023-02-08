import { VscTrash } from "react-icons/vsc";

import styles from "./ListUsers.module.css";

function ListUsers({ ...props }) {
  function updateToadmin(e: any) {
    e.preventDefault();
    props.updateToadmin(props.user.id);
  }

  function removeAdmin(e: any) {
    e.preventDefault();
    props.removeAdmin(props.user.id);
  }

  function validUser(e: any) {
    e.preventDefault();
    props.validUser(props.user.id);
  }

  function resetPassword(e: any) {
    e.preventDefault();
    props.resetPassword(props.user.id);
  }

  function deleteUser(e: any) {
    e.preventDefault();
    props.deleteUser(props.user.id);
  }

  return (
    <div className={styles["list-container"]}>
      <div className={styles["name-role-container"]}>
        <div className={styles["name"]}>
          <p>
            <strong>{props.user.name}</strong>
          </p>
        </div>
        {props.user.role === "owner" && (
          <p className={styles["role"]}>Supervisor</p>
        )}
        {props.user.role === "admin" && (
          <p className={styles["role"]}>Suporte</p>
        )}
      </div>
      <div className={styles["buttons-container"]}>
        {!props.user.isValid && (
          <button className={styles["buttons"]} onClick={(e) => validUser(e)}>
            Validar Usuário
          </button>
        )}
        {props.user.role !== "owner" && (
          <button
            className={styles["buttons"]}
            onClick={(e) => resetPassword(e)}
          >
            Resetar Senha
          </button>
        )}
        {props.currentUser.role === "owner" && (
          <>
            {props.user.isValid && (
              <>
                {props.user.role === "user" && (
                  <button
                    className={styles["buttons"]}
                    onClick={(e) => updateToadmin(e)}
                  >
                    Tornar Admin
                  </button>
                )}
                {props.user.role === "admin" && (
                  <button
                    className={styles["buttons"]}
                    onClick={(e) => removeAdmin(e)}
                  >
                    Retirar Admin
                  </button>
                )}
              </>
            )}
            <button
              className={styles["btn-remove"]}
              onClick={(e) => deleteUser(e)}
            >
              <VscTrash color="rgb(145, 2, 2)" />{" "}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ListUsers;
