import React from "react";
import AuthLayout from "../../../layouts/auth.layout";
import { useStore } from "../../../../store";
import * as Yup from "yup";
import {
	PasswordValidator,
	ConfirmPasswordValidator,
	VerifyEmailTokenValidator,
} from "../../../../utils/validation/validation.utils";
import { useNavigate } from "react-router-dom";
import styles from "./reset-password.module.scss";
import { useResetPassword } from "../../../../hooks/auth";

var formContent = {
	backButton: "Back",
	heading: "Reset Password",
	message: "Enter your new password to continue",
	buttonText: "Reset password",
	subQuestion: "Don't have an account?",
	subOption: "      Sign Up",
	subLink: "/register",
	successMessage: "Password reset successful",
	personalGrid: null,
	form: [
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
			label: "Reset Token",
			placeholder: "Enter your reset token",
			type: "text",
			name: "resetToken",
		},
	],
};

const defaultFormFields = {
	password: "",
	confirmPassword: "",
	resetToken: "",
};

const validate = Yup.object({
	password: PasswordValidator,
	confirmPassword: ConfirmPasswordValidator,
	resetToken: VerifyEmailTokenValidator,
});

const ResetPassword = () => {
	const navigate = useNavigate();
	const { mutate: resetPassword, isPending } = useResetPassword();
	//   const { authStore } = useStore();

	const handleNextPage = async (values, { setSubmitting, resetForm }) => {
		// const response = await authStore.accessToken(secretKey, secretPass);
		// await authStore.login(values, response.data.data);

		// !authStore.errorMessage ? navigate("/dashboard") : navigate("/login");
		try {
			!isPending &&
				resetPassword(values, {
					onSuccess: () => {
						setTimeout(() => {
							navigate("/login");
						}, 3000);
						resetForm();
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

export default ResetPassword;
