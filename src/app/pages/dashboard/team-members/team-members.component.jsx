import React, { useState } from "react";
import TopSection from "../../../components/molecules/top-section/top-section.component";
import styles from "./team-members.module.scss";
import Table from "../../../components/molecules/table/table.component";
import { memberColumns, memberSource } from "../../../assets/data/table";
import Button, { BUTTON_TYPE_CLASSES } from "../../../components/atoms/button/button.component";
import { LuPlusCircle } from "react-icons/lu";
import styled from "styled-components";
import UserContext from "../../../../hooks/userContext";
import AddMemberModal from "../../../modals/member/add-member/add-member-modal.component";
import { useStore } from "../../../../store";
import TableWrapper from "../../../components/molecules/tables/table-wrapper/table-wrapper.component";
import { useGetTeamMembers } from "../../../../hooks/team-members";
import { mobileTeamMembersColumns, renderMobileTeamMembersCell, renderMobileTeamMembersHeader, renderMobileTeamMembersIcon, teamMembersColumns } from "./data";

var topContent = {
  dashboardPage: "Team Members",
  searchComponent: false,
  searchTitle: null,
  filterButton: false,
  timer: null,
};

export const TeamButton = styled(Button)`
  width: 213px;
  height: 49px;
  border-radius: 50px;
  align-self: left;
  margin-top: 3rem;
  margin-left: 35%;
  font-size: 18px;
  font-weight: 500;
`;


const TeamMembers = () => {
  const [show, setShow] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
	const [pageSize, setPageSize] = useState(2);

  const { clientData: data, isLoading } = useGetTeamMembers({
		pageNumber,
		pageSize,
	});

	const { teamMembers, count, currentPage } = data || {};

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
			{show && <AddMemberModal handleClose={handleShowClose} />}
			
			<div>
				<div>
					<TopSection content={topContent} />
				</div>
				<div className={styles["team__div"]}>
					<div>
						<TableWrapper
							currentPage={parseInt(currentPage)}
							dataSource={teamMembers || []}
							desktopColumns={teamMembersColumns}
							handlePageNavigation={handlePageNavigation}
							loading={isLoading}
							mobileColumns={mobileTeamMembersColumns}
							pageSize={pageSize}
							renderItemHeaderCell={renderMobileTeamMembersHeader}
							renderItemValueCell={renderMobileTeamMembersCell}
							renderMobileIcon={renderMobileTeamMembersIcon}
							totalCount={count}
						/>
					</div>
					<div>
						<TeamButton
							buttonType={BUTTON_TYPE_CLASSES.curved}
							// isLoading={isSubmitting}
							onClick={handleShow}
							type="submit"
							className={styles["entry__bottom--btn"]}
						>
							<LuPlusCircle />
							Add Member
						</TeamButton>
					</div>
				</div>
			</div>
		</UserContext.Provider>
  );
};

export default TeamMembers;
