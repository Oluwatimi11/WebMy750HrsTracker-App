import React from "react";
import styles from "./chart-cards.module.scss";
import ChartCard from "../chart-card/chart-card.component";

const ChartCards = ({ chartData, data }) => {
  //LTR
  // Extracting totalRepsHours
  const totalRepsHours = chartData?.data?.totalRepsHours || 0;
  const ltrTotalTeamMembers = chartData?.data?.userHours || 0;

  // Extracting userHours where categories.name is "General Activity" and isAdmin is true
  const generalActivityAdminHours = (chartData?.data?.logHours || [])
    .flatMap((log) => log.categories || [])
    .filter((cat) => cat.name === "General Activity")
    .flatMap((cat) => cat.userHours || [])
    .filter((userHour) => userHour.isAdmin)
    .reduce((acc, userHour) => acc + userHour.hours, 0);

  // Extracting userHours where categories.name is "General Activity" and isSpouse is true
  const generalActivitySpouseHours = (chartData?.data?.logHours || [])
    .flatMap((log) => log.categories || [])
    .filter((cat) => cat.name === "General Activity")
    .flatMap((cat) => cat.userHours || [])
    .filter((userHour) => userHour.isSpouse)
    .reduce((acc, userHour) => acc + userHour.hours, 0);

  const totalGeneralActivityHours =
    generalActivityAdminHours + generalActivitySpouseHours;

  // Extracting userHours where categories.name is "Material Participation" and isAdmin is true
  const materialParticipationAdminHours = (chartData?.data?.logHours || [])
    .flatMap((log) => log.categories || [])
    .filter((cat) => cat.name === "Material Participation")
    .flatMap((cat) => cat.userHours || [])
    .filter((userHour) => userHour.isAdmin)
    .reduce((acc, userHour) => acc + userHour.hours, 0);

  // Extracting userHours where categories.name is "Material Participation" and isSpouse is true
  const materialParticipationSpouseHours = (chartData?.data?.logHours || [])
    .flatMap((log) => log.categories || [])
    .filter((cat) => cat.name === "Material Participation")
    .flatMap((cat) => cat.userHours || [])
    .filter((userHour) => userHour.isSpouse)
    .reduce((acc, userHour) => acc + userHour.hours, 0);

  const totalMaterialParticipationHours =
    materialParticipationAdminHours + materialParticipationSpouseHours;

  const totalRepsSpouseHours =
    generalActivityAdminHours + materialParticipationAdminHours;
  const totalRepsAdminHours =
    generalActivitySpouseHours + materialParticipationSpouseHours;


	//STR
	const totalStrHours = chartData?.data?.totalRepsHours || 0;
	const totalHoursDstr = chartData?.data?.logHours?.reduce((acc, log) => acc + log.totalHours, 0) || 0;
	const strTotalTeamMembers = chartData?.data?.userHours?.reduce((acc, hrs) => acc + hrs.hours, 0) || 0;


  const ltrDataArray = [
    {
	  ischartOption: true,
      isDoughnut: true,
      heading: "Total REPS Hours",
      value: `${totalRepsHours} Hours`,
      doughnutData: {
        labels: {
          label1: totalRepsSpouseHours,
          label2: totalRepsAdminHours,
        },
        bgColor: {
          bgColor1: "#FFECE5",
          bgColor2: "#F56630",
        },
      },
    },
    {
	  ischartOption: true,
      isDoughnut: true,
      heading: "General RE Hours",
      value: `${totalGeneralActivityHours} Hours`,
      doughnutData: {
        labels: {
          label1: generalActivityAdminHours,
          label2: generalActivitySpouseHours,
        },
        bgColor: {
          bgColor1: "#2DBA21",
          bgColor2: "#075201",
        },
      },
    },
    {
	  ischartOption: true,
      isDoughnut: true,
      heading: "Material Hours",
      value: `${totalMaterialParticipationHours} Hours`,
      doughnutData: {
        labels: {
          label1: materialParticipationAdminHours,
          label2: materialParticipationSpouseHours,
        },
        bgColor: {
          bgColor1: "#FEF6E7",
          bgColor2: "#F19A02",
        },
      },
    },
    {
	  ischartOption: true,
      isDoughnut: false,
      heading: "Team Members",
      value: `${ltrTotalTeamMembers} Members`,
      doughnutData: {
        labels: {
          label1: materialParticipationAdminHours,
          label2: materialParticipationSpouseHours,
        },
        bgColor: {
          bgColor1: "#3247FC",
          bgColor2: "#3247FC",
        },
      },
    },
  ];

  const strDataArray = [
    {
	  ischartOption: false,
      isDoughnut: true,
      heading: "Total STR Hours",
      value: `${totalStrHours} Hours`,
      doughnutData: {
        labels: {
          label1: totalRepsSpouseHours,
          label2: totalRepsAdminHours,
        },
        bgColor: {
          bgColor1: "#FEF6E7",
          bgColor2: "#F19A02",
        },
      },
    },
    {
	  ischartOption: true,
      isDoughnut: true,
      heading: "Hours Distribution",
      value: `${totalHoursDstr} Hours`,
      doughnutData: {
        labels: {
          label1: "You",
          label2: "Spouse",
        },
        bgColor: {
          bgColor1: "#FFECE5",
          bgColor2: "#F56630",
        },
      },
    },
    {
	  ischartOption: true,
      isDoughnut: false,
      heading: "Team Members",
      value: `${strTotalTeamMembers} Members`,
      doughnutData: {
        labels: {
          label1: materialParticipationAdminHours,
          label2: materialParticipationSpouseHours,
        },
        bgColor: {
          bgColor1: "#3247FC",
          bgColor2: "#3247FC",
        },
      },
    },
  ];

  const chartsDataArray = chartData?.data?.propertyType === "LTR" ? ltrDataArray : strDataArray;

  return (
    <section className={styles.chartCards}>
      {chartsDataArray.map((data, index) => (
        <ChartCard key={index} chartData={data} isDoughnut={data?.isDoughnut} ischartOption={data?.ischartOption} />
      ))}
    </section>
  );
};

ChartCards.defaultProps = {
  data: Array.from({ length: 3 }),
};

export default ChartCards;