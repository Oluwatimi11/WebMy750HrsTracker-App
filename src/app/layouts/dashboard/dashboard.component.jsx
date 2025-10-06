import React, { useState } from "react";
import SideNav from "../../components/molecules/sidenav/sidenav.component";
import styles from "./dashboard.module.scss";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  // const [activeRoute, setActiveRoute] = useState('/main-dashboard');
  const [activeComponent, setActiveComponent] = useState('');

  const handleNavItemClick = (component) => {
    // setActiveRoute(route)
    setActiveComponent(component);
  };

  return (
    <div className={styles["dashboard"]}>
      <div className={styles["dashboard__left"]}>
        <SideNav onNavItemClick={handleNavItemClick}/>
      </div>
      <div className={styles["dashboard__right"]}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
