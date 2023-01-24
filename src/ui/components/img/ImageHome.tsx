import styles from "./ImageHome.module.css";

function ImageHome() {
  return (
    <div className={styles["container"]}>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/b2w-teste-f3c4b.appspot.com/o/App%2FlogoServices.jpeg?alt=media&token=37596fc8-fada-421e-ac4d-80c912e011d5"
        alt="logo"
      />
    </div>
  );
}

export default ImageHome;
