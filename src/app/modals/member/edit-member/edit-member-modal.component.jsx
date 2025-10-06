import React from "react";
import * as Yup from "yup";
import styles from "./edit-member-modal.module.scss";
import { GUIDValidator } from "../../../../utils/validation/validation.utils";
import FormDropDown from "../../../components/atoms/form-dropdown/form-dropDown.component";
import PopupLayout from "../../../layouts/popup.layout/property-modal/popup-modal.component";
import { useGetRoles } from "../../../../hooks/team-members";
import { mapOptions } from "../../../pages/dashboard/record-time/utils";

var formContent = {
	heading: "Edit Member",
	buttonText: "Save",
	personalGrid: null,
	form: [
		{
			label: "Enter your team member name",
			placeholder: "Name team member",
			type: "text",
			name: "name",
			disabled: true
		},
	],
};

const validate = Yup.object({
	roleId: GUIDValidator,
});

const EditMemberModal = ({ handleClose, handleAction, formData }) => {
	const { clientData: {roles} } = useGetRoles();

	const roleOptions = mapOptions(roles);

	const defaultFormFields = {
		name: formData?.name || "",
		roleId: formData?.roleId || "",
	};

	const handleNextPage = async (values, { setSubmitting, resetForm }) => {
		handleAction(
			{ ...values, userId: formData?.id },
			{
				onSuccess: () => {
					setSubmitting(false);
					resetForm();
					handleClose();
				},
			}
		);
	};

	return (
		<div className={styles["container"]}>
			<PopupLayout
				postChildren={
					<FormDropDown
						optionList={roleOptions}
						labelName="Role"
						initialName="roleId"
						initialValue={formData?.roleId}
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

export default EditMemberModal;
