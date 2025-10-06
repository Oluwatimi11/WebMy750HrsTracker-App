import React, { useEffect, useState } from "react";
import TopSection from "../../../components/molecules/top-section/top-section.component";
import styles from "./main-dashboard.module.scss";
import {
  dashboardExport,
  secondDashboardExport,
} from "../../../assets/data/data";
import Image from "../../../components/atoms/image/image.component";
import { useStore } from "../../../../store";
import TableWrapper from "../../../components/molecules/tables/table-wrapper/table-wrapper.component";
import { useGetLogs } from "../../../../hooks/activity-log";
import { logsColumns, mobileLogsColumns, renderMobileLogsCell, renderMobileLogsHeader, renderMobileLogsIcon } from "../logs/data";
import DoughnutChart from "../../../components/atoms/charts/doughnut/doughnut.component";
import { useGetChartData } from "../../../../hooks/dashboard";
import ChartCard from "../../../components/atoms/charts/chart-card/chart-card.component";
import ChartCards from "../../../components/atoms/charts/chart-cards/chart-cards.component";

var topContent = {
  dashboardPage: null,
  searchComponent: false,
  searchTitle: null,
  filterButton: false,
  timer: null,
};

const MainDashboard = () => {
  const { rentalType } = useStore();

  const [years, setYears] = useState([]);

	const [pageNumber, setPageNumber] = useState(1);
	const [pageSize, setPageSize] = useState(2);

	const {isLoading: isChartLoading, data: chartData} = useGetChartData({propertyType: rentalType})
	const { clientData: data, isLoading } = useGetLogs({
		pageNumber,
		pageSize,
	});

	const { teamMembers, count, currentPage } = data || {};

	const handlePageNavigation = (page) => {
		setPageNumber(page);
	};

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const earliestYear = 1990;
    const yearsArray = [];

    for (let year = currentYear; year >= earliestYear; year--) {
      yearsArray.push(year);
    }

    setYears(yearsArray);
  }, []);

  return (
		<div>
			<div>
				<TopSection content={topContent} />
			</div>
			<div className={styles["main__div"]}>
				<div className={styles["main__dashboard"]}>
					<div className={styles["main__dashboard--top"]}>
						<h3 className={styles["main__dashboard--header"]}>
							Dashboard Overview
						</h3>
						<div className={styles["main__date--div"]}>
							<select
								className={styles["main__date--dropdown"]}
								id="date-dropdown"
							>
								{years.map((year, index) => (
									<option
										key={index}
										value={year}
										selected={index === 0 ? true : false}
									>
										{year}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className={styles["main__dashboard--bottom"]}>
						{/* pass data as props to ChartCards */}
						<ChartCards chartData={chartData} />
					</div>
				</div>
				<TableWrapper
					currentPage={parseInt(currentPage)}
					dataSource={teamMembers || []}
					desktopColumns={logsColumns}
					handlePageNavigation={handlePageNavigation}
					loading={isLoading}
					mobileColumns={mobileLogsColumns}
					pageSize={pageSize}
					renderItemHeaderCell={renderMobileLogsHeader}
					renderItemValueCell={renderMobileLogsCell}
					renderMobileIcon={renderMobileLogsIcon}
					totalCount={count}
				/>
			</div>
		</div>
  );
};

export default MainDashboard;
