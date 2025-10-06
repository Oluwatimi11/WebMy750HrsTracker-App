import React from "react";
import AuthLayout from "../../../layouts/auth.layout";
import { useStore } from "../../../../store";
import * as Yup from "yup";
import {
  VerifyEmailTokenValidator,
} from "../../../../utils/validation/validation.utils";
import { useNavigate } from "react-router-dom";
import styles from "./verify-email.module.scss";
import { useVerifyEmail } from "../../../../hooks/auth";

var formContent = {
	backButton: "Back",
	heading: "Verify your account",
	message: "Please enter the verification token sent to your email address to verify your account. If you don't see the email, check your spam folder or contact support for further assistance.",
	buttonText: "Verify Account",
	subQuestion: "Click here to",
	subOption: "      Resend Verification Email",
	subLink: "/resend-verification-email",
	personalGrid: null,
	form: [
		{
			label: "Verify Token",
			placeholder: "Enter the verification token",
			type: "text",
			name: "verificationToken",
		},
	],
};

const defaultFormFields = {
	verificationToken: "",
};

const validate = Yup.object({
	verificationToken: VerifyEmailTokenValidator,
});

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { mutate: verifyUser, isPending } = useVerifyEmail();


//   const { authStore } = useStore();

  const handleNextPage = async (values, { setSubmitting, resetForm }) => {
		// const response = await authStore.accessToken(secretKey, secretPass);
		// await authStore.login(values, response.data.data);

		// !authStore.errorMessage ? navigate("/dashboard") : navigate("/login");
		try {
			!isPending &&
				verifyUser(values, {
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

export default VerifyEmail;
