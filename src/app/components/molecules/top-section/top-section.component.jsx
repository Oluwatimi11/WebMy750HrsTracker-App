import React from "react";
import styles from "./top-section.module.scss";
import ToggleSwitch from "../../atoms/toggle/toggle-switch.component";
import Search from "../../atoms/search/search.component";
import FilterButton from "../../atoms/filter-button/filter-button.component";
import TimerToggle from "../../atoms/timer-toggle/timer-toggle.component";
import { LocalStorageKeys } from "../../../constants";

const TopSection = ({
	content,
	handleFilter,
}) => {
	const user = JSON.parse(localStorage.getItem(LocalStorageKeys.USER));

	return (
		<div className={styles["top__section"]}>
			<div className={styles["top__section--left"]}>
				{content.dashboardPage ? (
					<h4>{content.dashboardPage}</h4>
				) : (
					<h2>Hi, {user?.firstName || `User`}</h2>
				)}
			</div>
			<div className={styles["top__section--mid"]}>
				{content.timer ? <TimerToggle /> : null}
				{content.searchComponent ? (
					<Search searchTitle={content.searchTitle} />
				) : null}
				{content.filterButton ? (
					<FilterButton handleFilter={handleFilter} />
				) : null}
			</div>
			<div className={styles["top__section--right"]}>
				<ToggleSwitch />
			</div>
		</div>
	);
};

export default TopSection;
