import React from "react";
import * as Yup from "yup";
import styles from "./add-member-modal.module.scss";
import FormDropDown from "../../../components/atoms/form-dropdown/form-dropDown.component";
import PopupLayout from "../../../layouts/popup.layout/property-modal/popup-modal.component";
import {
	EmailValidator,
	GUIDValidator,
} from "../../../../utils/validation/validation.utils";
import {
	useGetRoles,
	useInviteTeamMember,
} from "../../../../hooks/team-members";
import { mapOptions } from "../../../pages/dashboard/record-time/utils";

var formContent = {
	heading: "Add Member",
	buttonText: "Save",
	personalGrid: null,
	form: [
		{
			label: "Email",
			placeholder: "Email Address",
			type: "email",
			name: "emailAddress",
		},
	],
};

const defaultFormFields = {
	roleId: "",
	emailAddress: "",
};

const validate = Yup.object({
	emailAddress: EmailValidator,
	roleId: GUIDValidator,
});

const AddMemberModal = ({ handleClose }) => {
	const { isPending, mutate: inviteTeamMember } = useInviteTeamMember();
	const {
		clientData: { roles },
	} = useGetRoles();

	const roleOptions = mapOptions(roles);

	const handleNextPage = async (values, { setSubmitting, resetForm }) => {
		try {
			!isPending &&
				inviteTeamMember(values, {
					onSuccess: () => {
						resetForm();
						handleClose();
					},
				});
		} catch (error) {
			throw error;
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className={styles["container"]}>
			<PopupLayout
				postChildren={
					<FormDropDown
						optionList={roleOptions}
						labelName="Role"
						initialName="roleId"
						className={styles["member__dropdown--form"]}
					/>
				}
				content={formContent}
				validationSchema={validate}
				initialValue={defaultFormFields}
				handleSubmit={handleNextPage}
				handleClose={handleClose}
				// error={authStore.errorMessage}
			/>
		</div>
	);
};

export default AddMemberModal;
