import React from "react";
import { useStore } from "../../../../../store";
import * as Yup from "yup";
import {
	ConfirmPasswordValidator,
	PasswordValidator,
} from "../../../../../utils/validation/validation.utils";
import styles from "./security-settings.module.scss";
import AuthLayout from "../../../../layouts/auth.layout";
import FormInput from "../../../../components/atoms/form-input/form-input.component";
import { Formik, Form } from "formik";
import TopSection from "../../../../components/molecules/top-section/top-section.component";
import DoubleBtn from "../../../../components/molecules/double-btn/double-btn.component";
import { LocalStorageKeys } from "../../../../constants";

const formData = [
	{
		label: "Enter Old Password",
		placeholder: "Enter Old Password",
		type: "password",
		name: "oldPassword",
	},
	{
		label: "Enter New Password",
		placeholder: "Enter New Password",
		type: "password",
		name: "newPassword",
	},
	{
		label: "Confirm New Password",
		placeholder: "Confirm New Password",
		type: "password",
		name: "confirmNewPassword",
	},
];

const defaultFormFields = {
	oldPassword: "",
	newPassword: "",
	confirmNewPassword: "",
};

const validationSchema = Yup.object({
	oldPassword: PasswordValidator,
	newPassword: PasswordValidator,
	confirmNewPassword: ConfirmPasswordValidator,
});

const SecuritySettings = ({ isPending, changePassword }) => {
	const user = JSON.parse(localStorage.getItem(LocalStorageKeys.USER));

	const handleSubmit = async (values, { setSubmitting, resetForm }) => {
		try {
			!isPending &&
				changePassword(
					{ values, id: user?.id },
					{
						onSuccess: () => {
							resetForm();
						},
					}
				);
		} catch (error) {
			throw error;
		} finally {
			setSubmitting(false);
		}
	};
	return (
		<div className={styles["container"]}>
			<Formik
				initialValues={defaultFormFields}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ values, isSubmitting }) => (
					<Form>
						<div className={styles["form__div"]}>
							<div className={styles["form__head"]}>
								<h4 className={styles["form__head--title"]}>
									Change Password
								</h4>
							</div>
							<div className={styles["form__div--inner"]}>
								{formData.map((el, i) => {
									const { label, name, placeholder, type } =
										el;
									return (
										<div
											className={
												styles["form__div--comp"]
											}
											key={`column_${name}${i}`}
										>
											<FormInput
												className={
													styles["form__div--input"]
												}
												label={label}
												name={name}
												type={type}
												placeholder={placeholder}
											/>
										</div>
									);
								})}
							</div>
							<div className={styles["form__div--btn"]}>
								<DoubleBtn
									firstbtn="Cancel"
									secondbtn="Save Changes"
									isSubmitting={isSubmitting}
								/>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default SecuritySettings;
