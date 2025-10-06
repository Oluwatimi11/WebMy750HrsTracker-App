import React, { useState } from "react";
import styles from "./tips.module.scss";
import TopSection from "../../../components/molecules/top-section/top-section.component";
import TopNav from "../../../components/molecules/topnav/topnav.component";
import Usings from "./using/using.component";
import { useStore } from "../../../../store";
import Claim from "./claiming-reps/claim.component";

var topContent = {
  dashboardPage: "Tips",
  searchComponent: false,
  searchTitle: null,
  filterButton: false,
  timer: null,
};

const topList = [
  {
    index: 1,
    name: "Claiming Reps",
    route: "claim"
  },
  {
    index: 2,
    name: "Using my750hrsTracker",
    route: "using"
  },
];

const Tips = () => {
  const [showContent, setShowContent] = useState(topList[0].route)

  const handlePageChange = (route) => {
    setShowContent(route)
  }

  return (
    <div className={styles["tips"]}>
      <div className={styles["settings__top"]}>
        <div>
          <TopSection content={topContent} />
        </div>
        <TopNav topBar={topList} onChange={handlePageChange} defaultActive={showContent} />

      </div>
      <div className={styles["tips__right"]}>
        {showContent === 'claim' ? <Claim /> : <Usings />}
      </div>
    </div>
  );
};

export default Tips;


