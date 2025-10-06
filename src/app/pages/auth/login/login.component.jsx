import React from "react";
import AuthLayout from "../../../layouts/auth.layout";
import { useStore } from "../../../../store";
import * as Yup from "yup";
import {
	EmailValidator,
	PasswordValidator,
} from "../../../../utils/validation/validation.utils";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";
import { useSignIn } from "../../../../hooks/auth";

var formContent = {
	backButton: "Back",
	heading: "Signin to account",
	message: "Welcome back! Please enter your details",
	buttonText: "Sign In",
	subQuestion: "Don't have an account yet?",
	subOption: "      Sign Up",
	subLink: "/register",
	personalGrid: null,
	form: [
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
	],
};

const defaultFormFields = {
	email: "",
	password: "",
};

const validate = Yup.object({
	email: EmailValidator,
	password: PasswordValidator,
});

const Login = () => {
	const navigate = useNavigate();
	const { mutate: login, isPending } = useSignIn();

	//   const { authStore } = useStore();

	const handleNextPage = async (values, { setSubmitting, resetForm }) => {
		// const response = await authStore.accessToken(secretKey, secretPass);
		// await authStore.login(values, response.data.data);

		// !authStore.errorMessage ? navigate("/dashboard") : navigate("/login");
		try {
			!isPending &&
				login(values, {
					onSuccess: () => {
						setTimeout(() => {
							navigate("/");
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
				Children={
					<div className={styles["container--One"]}>
						<div>
							<input
								className={styles["container--div__input"]}
								type="checkbox"
							/>
							<label
								htmlFor="rememberMe"
								className={styles["container--div__labelOne"]}
							>
								Remember Me
							</label>
						</div>
						<div>
							<div className={styles["container--Two"]}>
								<a
									href="/forgot-password"
									className={
										styles["container--div__labelTwo"]
									}
								>
									Forgot Password?
								</a>
							</div>
						</div>
					</div>
				}
				validationSchema={validate}
				initialValue={defaultFormFields}
				handleSubmit={handleNextPage}
				isLoading={isPending}
				// error={authStore.errorMessage}
			/>
		</div>
	);
};

export default Login;
