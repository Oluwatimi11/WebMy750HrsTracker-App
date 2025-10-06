import React, { useState } from "react";
import TopSection from "../../../components/molecules/top-section/top-section.component";
import styles from "./properties.module.scss";
import Table from "../../../components/molecules/table/table.component";
import { propertyColumns, propertySource } from "../../../assets/data/table";
import Button, {
	BUTTON_TYPE_CLASSES,
} from "../../../components/atoms/button/button.component";
import { HiPlusCircle } from "react-icons/hi";
import styled from "styled-components";
import UserContext from "../../../../hooks/userContext";
import PropertyModal from "../../../modals/property/property-modal.component";
import { useStore } from "../../../../store";
import {
	useCreateProperty,
	useDeleteProperty,
	useGetProperties,
} from "../../../../hooks/properties";
import TableWrapper from "../../../components/molecules/tables/table-wrapper/table-wrapper.component";
import { mobilePropertiesColumns, propertiesColumns, renderMobilePropertiesCell, renderMobilePropertiesHeader, renderMobilePropertiesIcon } from "./data";

var topContent = {
	dashboardPage: "Properties",
	searchComponent: true,
	searchTitle: "Search property",
	filterButton: false,
	timer: null,
};

export const AddButton = styled(Button)`
	width: 213px;
	height: 49px;
	border-radius: 50px;
	align-self: left;
	margin-top: 3rem;
	margin-left: 35%;
	font-size: 18px;
	font-weight: 500;
`;

const Properties = () => {
	const [show, setShow] = useState(false);
	const [pageNumber, setPageNumber] = useState(1);
	const [pageSize, setPageSize] = useState(2);
	const { isLoading, clientData: data } = useGetProperties({ pageNumber, pageSize });
	const { mutate, isPending } = useCreateProperty();
	const {isPending: isPropertyDeleting} = useDeleteProperty()

	const { properties, count, currentPage } = data || {};

	const handleShow = () => {
		setShow(true);
	};

	const handleShowClose = () => {
		setShow(false);
	};

	const handlePageNavigation = (page) => {
		setPageNumber(page);
	};

	return (
		<UserContext.Provider value={handleShow}>
			{show && (
				<PropertyModal
					handleAction={!isPending && mutate}
					handleClose={handleShowClose}
					isEdit={false}
				/>
			)}

			<div className={styles["property__container"]}>
				<div>
					<TopSection
						content={topContent}
					/>
				</div>
				<div className={styles["property__div"]}>
					<div>
						<TableWrapper
							currentPage={parseInt(currentPage)}
							dataSource={properties || []}
							desktopColumns={propertiesColumns}
							handlePageNavigation={handlePageNavigation}
							loading={isLoading || isPropertyDeleting}
							mobileColumns={mobilePropertiesColumns}
							pageSize={pageSize}
							renderItemHeaderCell={renderMobilePropertiesHeader}
							renderItemValueCell={renderMobilePropertiesCell}
							renderMobileIcon={renderMobilePropertiesIcon}
							totalCount={count}
						/>
					</div>
					<div>
						<AddButton
							buttonType={BUTTON_TYPE_CLASSES.curved}
							// isLoading={isSubmitting}
							onClick={handleShow}
							type="submit"
							className={styles["entry__bottom--btn"]}
						>
							<HiPlusCircle />
							Add Property
						</AddButton>
					</div>
				</div>
			</div>
		</UserContext.Provider>
	);
};

export default Properties;
