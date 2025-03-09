import React from "react";
import styles from "../../screens/RegisterAndLogin/Register.module.css";

const Loader = () => {
  //! JSX START
  return (
    <div className={styles.spinner_container}>
      <span className={styles.spinner}></span>
    </div>
  );
};

export default Loader;
