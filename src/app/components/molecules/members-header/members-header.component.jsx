import React from "react";
import { memberNav } from "../../../assets/data/nav";
import styles from "./members-header.module.scss";
import Image from "../../atoms/image/image.component";

const logoImage =
  "https://res.cloudinary.com/dftu6mjmt/image/upload/v1710765782/750HoursTracker/tracker-logo_copq4t.png";

const MembersHeader = () => {
  return (
    <div className={styles["member"]}>
      <div lassName={styles["member__limb"]}>
        <Image
          className={styles["member__logo"]}
          url={logoImage}
          altName="logo-image"
        />
      </div>

      <div className={styles["member__body"]}>
        <div className={styles["member__comp"]}>
          <ul className={styles["member__comp--ul"]}>
            {memberNav.map((el, index) => {
              const { navroute, name } = el;
              return (
                <li key={index} className={styles["member__comp--li"]}>
                  <a href={navroute}>{name}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MembersHeader;
