import React from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./error-modal.module.scss";

const ErrorModal = ({ errorText, handleClose }) => {
  return (
    <div onClick={handleClose} className={styles.error__main__div}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.error__div}
      >
        <div className={styles.error__text__div}>
          <p className={styles.error__text}>{errorText}</p>
        </div>
        <div>
          <FaTimes onClick={handleClose} className={styles.cancel__icon} />
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
