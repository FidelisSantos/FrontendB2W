import { useContext, useState, useEffect } from "react";
import {
  VscBrowser,
  VscClearAll,
  VscFoldDown,
  VscFoldUp,
  VscListUnordered,
  VscPerson,
  VscPin,
} from "react-icons/vsc";
import { NavLink } from "react-router-dom";

import AppContext from "../../../../context/AppContext";
import styles from "./Menu.module.css";

function Menu({ ...props }) {
  const { page, setPage } = useContext(AppContext);
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [selectOnScripts, setSelectOnScripts] = useState(false);

  useEffect(() => {
    if (page == "procedures" || page == "out" || page == "off")
      setSelectOnScripts(true);
    else setSelectOnScripts(false);
  });

  return (
    <div className={styles["menu-container"]}>
      <div className={styles["menu-header"]}>
        <h2 className={styles["menu-title"]}>Menu</h2>
        <VscClearAll
          className={styles["menu-header-icon"]}
          onClick={() => props.setIsOpenMenu(false)}
        />
      </div>
      <div className={styles["menu-container-options"]}>
        <div>
          <div
            className={
              page === "home"
                ? styles["menu-container-options-div-selected"]
                : styles["menu-container-options-div"]
            }
          >
            <NavLink
              to="/"
              onClick={() => setPage("home")}
              className={
                page === "home"
                  ? styles["menu-container-link-selected"]
                  : styles["menu-container-link"]
              }
            >
              <div className={"menu-container-link-title"}>
                <VscBrowser className={styles["menu-container-link-icon"]} />
                Home
              </div>
              {page === "home" && (
                <div>
                  <VscPin className={styles["selected"]} />
                </div>
              )}
            </NavLink>
          </div>
        </div>
        <div>
          <div
            className={
              page === "user"
                ? styles["menu-container-options-div-selected"]
                : styles["menu-container-options-div"]
            }
          >
            <NavLink
              to="/users"
              onClick={() => setPage("user")}
              className={
                page === "user"
                  ? styles["menu-container-link-selected"]
                  : styles["menu-container-link"]
              }
            >
              <div>
                <VscPerson className={styles["menu-container-link-icon"]} />
                Usuários
              </div>
              {page === "user" && (
                <div>
                  <VscPin className={styles["selected"]} />
                </div>
              )}
            </NavLink>
          </div>
        </div>
        <div
          className={
            !isOpenOptions
              ? styles["menu-container-options-drop-title-open"]
              : selectOnScripts
              ? styles["menu-container-options-drop-title-selected"]
              : styles["menu-container-options-drop-title"]
          }
          onClick={() => setIsOpenOptions(!isOpenOptions)}
        >
          <div className={styles["menu-container-options-drop-title-part"]}>
            <VscListUnordered className={styles["menu-container-link-icon"]} />
            Scripts
            {selectOnScripts && isOpenOptions && (
              <VscPin className={styles["selected-script"]} />
            )}
          </div>
          <div>{isOpenOptions ? <VscFoldDown /> : <VscFoldUp />}</div>
        </div>
        <div className={styles["menu-container-options-dropdown"]}>
          <ul className={styles["menu-container-options-drop-container"]}>
            <div
              className={styles["menu-container-options-drop-container-div"]}
              hidden={isOpenOptions}
            >
              <NavLink
                to={"/procedures"}
                onClick={() => setPage("procedures")}
                className={
                  page === "procedures"
                    ? styles["menu-container-options-drop-selected"]
                    : styles["menu-container-options-drop"]
                }
              >
                <div>
                  <p>Procedimentos</p>
                </div>
                {page === "procedures" && (
                  <div>
                    <VscPin className={styles["selected-drop"]} />
                  </div>
                )}
              </NavLink>
              <NavLink
                to={"/out"}
                onClick={() => setPage("out")}
                className={
                  page === "out"
                    ? styles["menu-container-options-drop-selected"]
                    : styles["menu-container-options-drop"]
                }
              >
                <div>
                  <p>Out</p>
                </div>
                {page === "out" && (
                  <div>
                    <VscPin className={styles["selected-drop"]} />
                  </div>
                )}
              </NavLink>
              <NavLink
                to={"/off"}
                onClick={() => setPage("off")}
                className={
                  page === "off"
                    ? styles["menu-container-options-drop-selected"]
                    : styles["menu-container-options-drop"]
                }
              >
                <div>
                  <p>Off</p>
                </div>
                {page === "off" && (
                  <div>
                    <VscPin className={styles["selected-drop"]} />
                  </div>
                )}
              </NavLink>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Menu;
