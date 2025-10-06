import React from "react";
import AuthLayout from "../../../layouts/auth.layout";
import { useStore } from "../../../../store";
import * as Yup from "yup";
import { EmailValidator } from "../../../../utils/validation/validation.utils";
import { useNavigate } from "react-router-dom";
import styles from "./forgot-password.module.scss";
import { useForgotPassword } from "../../../../hooks/auth";

var formContent = {
	backButton: "Back",
	heading: "Forgot Password?",
	message: "Enter your e-mail address to get a link to reset password.",
	buttonText: "Reset password",
	subQuestion: "Don't have an account?",
	subOption: "      Sign Up",
	subLink: "/register",
	successMessage:
		"A link has been ssent to your email. Please check to reset password",
	personalGrid: null,
	form: [
		{
			label: "Email Address",
			placeholder: "Enter your email address",
			type: "email",
			name: "emailAddress",
		},
	],
};

const defaultFormFields = {
	emailAddress: "",
};

const validate = Yup.object({
	emailAddress: EmailValidator,
});

const ForgotPassword = () => {
	const navigate = useNavigate();
	const { mutate: forgotPassword, isPending } = useForgotPassword();

	//   const { authStore } = useStore();

	const handleNextPage = async (values, { setSubmitting, resetForm }) => {
		// const response = await authStore.accessToken(secretKey, secretPass);
		// await authStore.login(values, response.data.data);

		// !authStore.errorMessage ? navigate("/dashboard") : navigate("/login");
		try {
			!isPending &&
				forgotPassword(values, {
					onSuccess: () => {
						setTimeout(() => {
							navigate("/reset-password");
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

export default ForgotPassword;
