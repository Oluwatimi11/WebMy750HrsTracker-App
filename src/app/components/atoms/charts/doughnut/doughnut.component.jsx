import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import styles from "./doughnut.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

// const testData = [
//   {
//     name: "300",
//     value: 300,
//   },
//   {
//     name: "200",
//     value: 200,
//   },
// ];

// const chartColors = [
//   {
//     light: "#FFECE5",
//     dark: "#F56630",
//   },
//   {
//     light: "#2DBA21",
//     dark: "#075201",
//   },
//   {
//     light: "#FEF6E7",
//     dark: "#F19A02",
//   }
// ];

const options = {
  cutout: 55,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
      align: "middle",
      labels: {
		padding: 25,
        usePointStyle: true,
		font: {
			size: 16
		}
      },
    },
  },
};

const DoughnutChart = ({ doughnutData }) => {	
  const chartData = {
    labels: Object.values(doughnutData.labels).map((key) => key),
    datasets: [
      {
        data: Object.values(doughnutData.labels),
        backgroundColor: Object.values(doughnutData.bgColor),
		borderColor: 'transparent',
		borderWidth: 5
      },
    ],
  };

  return (
    <>
      <Doughnut
        className={styles.doughnut}
        data={chartData}
        options={options}
      />
    </>
  );
};

export default React.memo(DoughnutChart);
