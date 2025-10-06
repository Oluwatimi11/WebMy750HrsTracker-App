import React from "react";
import styles from "./avatars.module.scss";
import { HiMiniUser } from "react-icons/hi2";

const Avatars = ({ data }) => {
  return (
    <article className={styles.avatarCard}>
      <div className={styles.list}>
        <i className={styles.icon}>
          <HiMiniUser />
        </i>
        <h4>You</h4>
      </div>
      <div className={styles.list}>
        <i className={styles.icon}>
          <HiMiniUser />
        </i>
        <h4>Spouse</h4>
      </div>
    </article>
  );
};

export default Avatars;
