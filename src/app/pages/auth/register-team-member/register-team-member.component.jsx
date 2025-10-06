import React from "react";
import AuthLayout from "../../../layouts/auth.layout";
import * as Yup from "yup";
import {
	nameValidator,
	PasswordValidator,
	ConfirmPasswordValidator,
	VerifyEmailTokenValidator,
} from "../../../../utils/validation/validation.utils";
import { useNavigate } from "react-router-dom";
import styles from "./register-team-member.module.scss";
import { useCreateTeamMember } from "../../../../hooks/team-members";

var formContent = {
	backButton: "Back",
	heading: "Create an account",
	message: null,
	buttonText: "Register",
	subQuestion: `Already have an account? \t`,
	subOption: "Sign in",
	subLink: "/login",
	type: "Submit",
	personalGrid: null,
	form: [
		{
			label: "First Name",
			placeholder: "Enter your first name",
			type: "text",
			name: "firstName",
		},
		{
			label: "Last Name",
			placeholder: "Enter your last name",
			type: "text",
			name: "lastName",
		},
		{
			label: "Password",
			placeholder: "Enter your password",
			type: "password",
			name: "password",
		},
		{
			label: "Confirm Password",
			placeholder: "Confirm your password",
			type: "password",
			name: "confirmPassword",
		},
		{
			label: "Invitation Code",
			placeholder: "Enter Invitation Code",
			type: "text",
			name: "invitationCode",
		},
	],
};

const defaultFormFields = {
	firstName: "",
	lastName: "",
	password: "",
	confirmPassword: "",
	invitationCode: "",
};

const validate = Yup.object({
	firstName: nameValidator("First Name"),
	lastName: nameValidator("Last Name"),
	invitationCode: VerifyEmailTokenValidator,
	password: PasswordValidator,
	confirmPassword: ConfirmPasswordValidator,
});

const RegisterTeamMember = () => {
	const navigate = useNavigate();
	const { mutate: createTeamMember, isPending } = useCreateTeamMember();

	const handleNextPage = async (values, { setSubmitting, resetForm }) => {
		try {
			!isPending &&
				createTeamMember(values, {
					onSuccess: () => {
						setTimeout(() => {
							navigate("/login");
							resetForm();
						}, 3000);
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
			<AuthLayout
				content={formContent}
				validationSchema={validate}
				initialValue={defaultFormFields}
				handleSubmit={handleNextPage}
				isLoading={isPending}
				// error={authStore.errorMessage}
			/>
		</div>
	);
};

export default RegisterTeamMember;
