import { Form, Formik } from "formik";
import React from "react";
import {
	ConsentValidator,
	EmailValidator,
	GeneralValidator,
	nameValidator,
} from "../../../../utils/validation/validation.utils";
import * as Yup from "yup";
import styled from "styled-components";
import Button, {
	BUTTON_TYPE_CLASSES,
} from "../../../components/atoms/button/button.component";
import styles from "./support.module.scss";
import PhoneInput from "../../../components/atoms/phone-input/phone-input.component";
import TopSection from "../../../components/molecules/top-section/top-section.component";
import { useSendSupportMessage } from "../../../../hooks/support";

var topContent = {
	dashboardPage: "Support",
	searchComponent: null,
	searchTitle: null,
	filterButton: null,
	timer: null,
};

const AuthButton = styled(Button)`
	margin-top: 2rem;
	width: 480px;
	height: 48px;
	font-family: Inter;
	border-radius: 24px;
	font-size: 16px;
	font-weight: 600;

	//tab-port
	@media only screen and (max-width: 900px) {
		font-family: Inter;
		width: 90%;
		height: 48px;
	}

	//phone
	@media only screen and (max-width: 600px) {
		width: 95%;
	}
`;

const defaultFormFields = {
	firstName: "",
	lastName: "",
	email: "",
	phoneNumber: "",
	message: "",
	agreement: false,
};

const validate = Yup.object({
	firstName: nameValidator("First Name"),
	lastName: nameValidator("Last Name"),
	email: EmailValidator,
	message: GeneralValidator,
	agreement: ConsentValidator,
});

const Support = () => {
	const { mutate: sendMessage, isPending } = useSendSupportMessage();

	const handleSubmit = async (values, { setSubmitting, resetForm }) => {
		try {
			!isPending &&
				sendMessage(values, {
					onSuccess: () => {
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
			<div>
				<TopSection content={topContent} />
			</div>
			<div className={styles["support__div"]}>
				<div className={styles["support__top"]}>
					<h3 className={styles["support__top--3"]}>
						Have a question or concern?
					</h3>
					<h3 className={styles["support__top--3"]}>
						Share your thoughts with us.
					</h3>
				</div>
				<Formik
					initialValues={defaultFormFields}
					validationSchema={validate}
					onSubmit={handleSubmit}
				>
					{({ values, setFieldValue, handleChange, handleBlur }) => (
						<Form>
							<div className={styles["support__btm"]}>
								<div className={styles["support__btm--top"]}>
									<div
										className={
											styles["support__btm--names"]
										}
									>
										<label
											className={
												styles["support__btm--label"]
											}
											htmlFor="firstName"
										>
											First Name
										</label>
										<input
											className={
												styles["support__btm--input"]
											}
											onChange={handleChange}
											onBlur={handleBlur}
											id="firstName"
											type="text"
											name="firstName"
											placeholder="Enter your First Name"
											value={values.firstName}
										/>
									</div>
									<div
										className={
											styles["support__btm--names"]
										}
									>
										<label
											className={
												styles["support__btm--label"]
											}
											htmlFor="lastName"
										>
											Last Name
										</label>
										<input
											className={
												styles["support__btm--input"]
											}
											onChange={handleChange}
											onBlur={handleBlur}
											id="lastName"
											type="text"
											name="lastName"
											placeholder="Enter your Last Name"
											value={values.lastName}
										/>
									</div>
								</div>
								<div className={styles["support__btm--inner"]}>
									<label
										className={
											styles["support__btm--label"]
										}
										htmlFor="email"
									>
										Email Address
									</label>
									<input
										className={
											styles["support__btm--input"]
										}
										onChange={handleChange}
										onBlur={handleBlur}
										id="email"
										type="email"
										name="email"
										placeholder="Enter your Email Address"
										value={values.email}
									/>
								</div>
								<div className={styles["support__btm--inner"]}>
									<PhoneInput name="phoneNumber" />
								</div>
								<div className={styles["support__btm--inner"]}>
									<label
										className={
											styles["support__btm--label"]
										}
										htmlFor="message"
									>
										Message
									</label>
									<textarea
										className={styles["support__btm--area"]}
										onChange={handleChange}
										onBlur={handleBlur}
										id="message"
										type="text"
										name="message"
										rows={5}
										value={values.message}
									/>
								</div>
								<div className={styles["support__btm--check"]}>
									<input
										className={
											styles["support__btm--check-inp"]
										}
										checked={values.agreement}
										onChange={() =>
											setFieldValue(
												"agreement",
												!values.check
											)
										}
										onBlur={handleBlur}
										type="checkbox"
										id="agreement"
										name="agreement"
									/>
									<label
										className={
											styles["support__btm--check-lab"]
										}
										htmlFor="agreement"
									>
										You agree to our friendly
										<a href="/support"> privacy policy.</a>
									</label>
								</div>
							</div>
							<AuthButton
								buttonType={BUTTON_TYPE_CLASSES.curved}
								isLoading={isPending}
								type="submit"
								className="auth--button"
							>
								Send Message
							</AuthButton>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Support;
