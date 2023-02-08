import CryptoJS from "crypto-js";
import { useContext, useEffect } from "react";
import { VscSignOut, VscTriangleDown } from "react-icons/vsc";
import { NavLink } from "react-router-dom";

import AppContext from "../../../context/AppContext";
import styles from "./Header.module.css";

function Header() {
  const { user, setUser, page, setPage } = useContext(AppContext);

  useEffect(() => {
    if (!localStorage.getItem("token") || !localStorage.getItem("user")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      location.reload();
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("scripts");
    location.reload();
  }

  return (
    <nav>
      <ul className={styles["header-container"]}>
        <li className={styles["header-container-logo"]}>
          <a href="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/b2w-teste-f3c4b.appspot.com/o/App%2FlogoServices.jpeg?alt=media&token=37596fc8-fada-421e-ac4d-80c912e011d5"
              alt="logo"
            />
          </a>
        </li>
        <li className={styles["header-container-options"]}>
          <NavLink
            to="/"
            onClick={logout}
            className={styles["header-container-options-nav"]}
          >
            <VscSignOut className={styles["header-container-options-logout"]} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
