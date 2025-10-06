import React, { useEffect } from "react";
import AuthLayout from "../../../layouts/auth.layout";
import { useStore } from "../../../../store";
import * as Yup from "yup";
import {
	nameValidator,
	EmailValidator,
	PasswordValidator,
	ConfirmPasswordValidator,
} from "../../../../utils/validation/validation.utils";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.scss";
import { useSignUp } from "../../../../hooks/auth";

var formContent = {
	backButton: "Back",
	heading: "Create an account",
	message: null,
	buttonText: "Register",
	subQuestion: "Already have an account?",
	subOption: "Sign in",
	subLink: "/login",
	type: "Submit",
	personalGrid: null,
	form: [
		{
			label: "First Name",
			placeholder: "Enter your first name",
			type: "text",
			name: "firstname",
		},
		{
			label: "Last Name",
			placeholder: "Enter your last name",
			type: "text",
			name: "lastname",
		},
		{
			label: "Email Address",
			placeholder: "Enter your email address",
			type: "email",
			name: "email",
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
	],
};

const defaultFormFields = {
	firstname: "",
	lastname: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const validate = Yup.object({
	firstname: nameValidator("First Name"),
	lastname: nameValidator("Last Name"),
	email: EmailValidator,
	password: PasswordValidator,
	confirmPassword: ConfirmPasswordValidator,
});

const Register = () => {
	const navigate = useNavigate();
	const { mutate: createUser, isPending } = useSignUp();
	//   const { authStore } = useStore();

	const handleNextPage = async (values, { setSubmitting, resetForm }) => {
		// const response = await authStore.accessToken(secretKey, secretPass);
		// await authStore.login(values, response.data.data);

		// !authStore.errorMessage ? navigate("/login") : navigate("/register");
		try {
			!isPending &&
				createUser(values, {
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

export default Register;
