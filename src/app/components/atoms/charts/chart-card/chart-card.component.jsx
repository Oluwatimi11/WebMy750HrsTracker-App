import React from "react";
import Proptype from "prop-types";
import styles from "./chart-card.module.scss";
import DoughnutComponent from "../doughnut/doughnut.component";
import Avatars from "../../avatars/avatars.component";
const ChartCard = ({
  title,
  totalHours,
  isDoughnut,
  ischartOption,
  chartData,
  avatarData,
}) => {
  return (
    <article className={styles.chartCard}>
      <div className={styles.chartTop}>
        <div className={styles.indicator}></div>
        <div className={styles.title}>{chartData?.heading}</div>
      </div>
      <div className={styles.totalTime}>
        <h2>{chartData?.value}</h2>
      </div>
      {!ischartOption ? (
        ""
      ) : isDoughnut ? (
        <DoughnutComponent doughnutData={chartData?.doughnutData} />
      ) : (
        <Avatars data={avatarData} />
      )}
    </article>
  );
};

ChartCard.defaultProps = {
  isDoughnut: true,
  title: "Chart Card",
  totalHours: "4 hours",
  chartData: [],
  avatarData: [],
};

ChartCard.propTypes = {
  title: Proptype.string.isRequired,
  isDoughnut: Proptype.bool,
};

export default ChartCard;
