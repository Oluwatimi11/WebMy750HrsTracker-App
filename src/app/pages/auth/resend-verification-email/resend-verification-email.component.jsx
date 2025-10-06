import React from "react";
import AuthLayout from "../../../layouts/auth.layout";
import { useStore } from "../../../../store";
import * as Yup from "yup";
import {
	EmailValidator,
} from "../../../../utils/validation/validation.utils";
import { useNavigate } from "react-router-dom";
import styles from "./resend-verification-email.module.scss";
import { useResendVerificationEmail } from "../../../../hooks/auth";

var formContent = {
	backButton: "Back",
	heading: "Resend verification mail",
	message:
		"Please enter your email address to receive the verification token.",
	buttonText: "Resend Verification Email",
	subQuestion: "Click here to",
	subOption: "      Enter Verification Token",
	subLink: "/verify-email",
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

const ResendVerificationEmail = () => {
  const navigate = useNavigate();
  const { mutate: resendMail, isPending } = useResendVerificationEmail();


//   const { authStore } = useStore();

  const handleNextPage = async (values, { setSubmitting, resetForm }) => {
		// const response = await authStore.accessToken(secretKey, secretPass);
		// await authStore.login(values, response.data.data);

		// !authStore.errorMessage ? navigate("/dashboard") : navigate("/login");
		try {
			!isPending &&
				resendMail(values, {
					onSuccess: () => {
						setTimeout(() => {
							navigate("/verify-email");
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

export default ResendVerificationEmail;
