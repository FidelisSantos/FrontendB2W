import { NavLink } from "react-router-dom";

import styles from "./Header.module.css";

function Header() {
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    location.reload();
  }

  return (
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
        <NavLink to="/" onClick={logout}>
          Sair
        </NavLink>
      </li>
      <li className={styles["header-container-options"]}>
        <NavLink to="/">News</NavLink>
      </li>
      <li className={styles["header-container-options"]}>
        <a href="contact.asp">Contact</a>
      </li>
      <li className={styles["header-container-options"]}>
        <a href="about.asp">About</a>
      </li>
    </ul>
  );
}

export default Header;
