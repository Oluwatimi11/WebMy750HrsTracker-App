import PropTypes from "prop-types";
import React from "react";
import * as Yup from "yup";
import styles from "./property-modal.module.scss";
import FormDropDown from "../../components/atoms/form-dropdown/form-dropDown.component";
import PopupLayout from "../../layouts/popup.layout/property-modal/popup-modal.component";
import {
	GeneralValidator,
	nameValidator,
} from "../../../utils/validation/validation.utils";

var optionList = [
	{
		id: 1,
		address: "STR",
		myValue: "STR",
	},
	{
		id: 2,
		address: "LTR",
		myValue: "LTR",
	},
];

var formContent = {
	heading: "Add new property",
	buttonText: "Save",
	personalGrid: null,
	form: [
		{
			label: "Enter house address",
			placeholder: "Property address",
			type: "text",
			name: "address",
		},
		{
			label: "Enter a name for your property",
			placeholder: "Name of property",
			type: "text",
			name: "name",
		},
	],
};

const validate = Yup.object({
	address: GeneralValidator,
	name: nameValidator("Property Name"),
});

const PropertyModal = ({ handleClose, handleAction, formData, isEdit }) => {
	const defaultFormFields = {
		address: formData?.address || "",
		name: formData?.name || "",
		propertyType: isEdit ? formData?.propertyType : optionList[0]?.myValue,
	};

	const handleNextPage = async (values, { setSubmitting, resetForm }) => {
		const data = isEdit ? { ...values, id: formData?.id } : { ...values };

		try {
			await handleAction(data, {
				onSuccess: () => {
					resetForm();
					handleClose();
				},
			});
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className={styles["container"]}>
			<PopupLayout
				content={formContent}
				Children={
					<FormDropDown
						optionList={optionList}
						labelName="Select property type"
						initialName="propertyType"
						className={styles["entry__dropdown--form"]}
					/>
				}
				validationSchema={validate}
				initialValue={defaultFormFields}
				handleSubmit={handleNextPage}
				handleClose={handleClose}
				// error={authStore.errorMessage}
			/>
		</div>
	);
};

PropertyModal.defaultProps = {
	isEdit: false,
};

PropertyModal.propTypes = {
	isEdit: PropTypes.bool,
};

export default PropertyModal;
