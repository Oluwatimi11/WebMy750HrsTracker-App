import React, { useState } from "react";
import styles from "./team-members-icon-wrapper.module.scss";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import EditMemberModal from "../../../modals/member/edit-member/edit-member-modal.component";
import {
	useDeleteTeamMember,
	useEditTeamMember,
} from "../../../../hooks/team-members";
import { renderRoles } from "../../../pages/dashboard/team-members/data";

const TeamMembersIconWrapper = ({ data }) => {
	const { isPending: isEditingTeamMember, mutate: editTeamMember } =
		useEditTeamMember();
	const { isPending: isDeletingTeamMember, mutate: deleteTeamMember } =
		useDeleteTeamMember();

	const [show, setShow] = useState(false);

	const handleEdit = () => {
		setShow(true);
	};

	const handleDelete = () => {
		!isDeletingTeamMember && deleteTeamMember(data?.id);
	};

	const handleShowClose = () => {
		setShow(false);
	};

	const editFormData = {
		id: data?.id,
		name: data?.name,
	};

	const roles = renderRoles(data?.roles);
	const isAdmin = roles.includes("Admin");

	return (
		<div className={styles.iconsWrapper}>
			{show && (
				<EditMemberModal
					handleAction={!isEditingTeamMember && editTeamMember}
					handleClose={handleShowClose}
					formData={editFormData}
				/>
			)}
			<div className={styles.icon}>
				<TbEdit color="#FF8300" onClick={handleEdit} />
			</div>
			{!isAdmin && (
				<div className={styles.icon}>
					<RiDeleteBin5Line color="#F12525" onClick={handleDelete} />
				</div>
			)}
		</div>
	);
};

export default React.memo(TeamMembersIconWrapper);
