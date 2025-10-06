import PropTypes from "prop-types";
import React from "react";

import styles from "./table-wrapper.module.scss";
import DesktopTable from "../desktop-table/desktop-table.component";
import MobileTable from "../mobile-table/mobile-table.component";
import Pagination from "../../pagination/pagination.component";
import { useWindowSize } from "../../../../../hooks/useWindowSize";

/**
 * TableWrapper component wraps the table and provides additional functionalities.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @param {boolean} props.allowOnRowClick - Indicates whether clicking row triggers an action.
 * @param {number} props.currentPage - The current page number of the table.
 * @param {Array} props.dataSource - The data source for the table.
 * @param {Array} props.desktopColumns - The columns configuration for the desktop table.
 * @param {Function} [props.handlePageNavigation] - Callback function to handle page number change of the table.
 * @param {Function} [props.handleOnRowClick] - Callback function to handle row click.
 * @param {boolean} props.loading - Indicates whether data is loading.
 * @param {Array} props.mobileColumns - The columns configuration for the mobile table.
 * @param {number} [props.pageSize] - The limit of the number of items to render for the table.
 * @param {string} [props.renderMobileIcon] - The render function that returns dropdown icon for the mobile table.
 * @param {string} [props.renderItemHeaderCell] - The render function that returns header for mobile table.
 * @param {string} [props.renderItemValueCell] - The render function that returns cell value for mobile table.
 * @param {string} [props.title] - The title for the table.
 * @param {number} [props.totalCount] - The total number of items for the table.
 * @return {JSX.Element} React component.
 */

const TableWrapper = ({
	allowOnRowClick,
	currentPage,
	dataSource,
	desktopColumns,
	handlePageNavigation,
	handleOnRowClick,
	pageSize,
	loading,
	mobileColumns,
	renderItemHeaderCell,
	renderItemValueCell,
	renderMobileIcon,
	title,
	totalCount,
}) => {
	
	const { width } = useWindowSize();
	const isMobile = !!width && width <= 768;

	let table;
	if (isMobile) {
		table = (
			<MobileTable
				allowOnRowClick={allowOnRowClick}
				columns={mobileColumns}
				dataSource={dataSource}
				loading={loading}
				onClickItem={handleOnRowClick}
				renderItemHeaderCell={renderItemHeaderCell}
				renderItemValueCell={renderItemValueCell}
				renderMobileIcon={renderMobileIcon}
			/>
		);
	} else {
		table = (
			<DesktopTable
				allowOnRowClick={allowOnRowClick}
				columns={desktopColumns}
				dataSource={dataSource}
				handleOnRowClick={handleOnRowClick}
				loading={loading}
			/>
		);
	}

	return (
		<div className={styles.tableWrapper}>
			<h3>{title}</h3>
			{table}
			<div>
				<Pagination
					currentPage={currentPage}
					onPageChange={handlePageNavigation}
					pageSize={pageSize}
					totalCount={totalCount}
				/>
			</div>
		</div>
	);
};

TableWrapper.defaultProps = {
	allowOnRowClick: false,
	pageSize: 10,
	renderMobileIcon: () => {},
	title: "",
};

TableWrapper.propTypes = {
	allowOnRowClick: PropTypes.bool,
	currentPage: PropTypes.number.isRequired,
	desktopColumns: PropTypes.array.isRequired,
	dataSource: PropTypes.array.isRequired,
	handleOnRowClick: PropTypes.func,
	handlePageNavigation: PropTypes.func.isRequired,
	pageSize: PropTypes.number,
	loading: PropTypes.bool.isRequired,
	mobileColumns: PropTypes.array.isRequired,
	renderItemHeaderCell: PropTypes.func.isRequired,
	renderItemValueCell: PropTypes.func.isRequired,
	renderMobileIcon: PropTypes.func,
	title: PropTypes.string,
	totalCount: PropTypes.number.isRequired,
};

export default TableWrapper;
