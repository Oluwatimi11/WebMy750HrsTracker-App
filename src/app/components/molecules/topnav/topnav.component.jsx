import React, { useState } from "react";
import styles from "./topnav.module.scss";
import { Link } from "react-router-dom";

const TopNav = ({topBar, onChange, defaultActive}) => {
  const [activeRoute, setActiveRoute] = useState(defaultActive);


  const handleChange = (route) => {
    setActiveRoute(route)
    onChange(route)
  }

  return (
    <div className={styles["topnav"]}>
      <div className={styles["topnav__top"]}>
        {topBar.map((data, index) => (
          <div
            className={styles["topnav__list"]}
            key={index}
            onClick={() => handleChange(data.route)}
          >
            <Link
              className={`${styles.topnav__links} ${
                activeRoute === data.route ? styles.active : ""
              }`}
              // to={data.route}
            >
              {data.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopNav;
