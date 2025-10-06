import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {
  AuthButton,
  AuthContainer,
  AuthFormInput,
  AuthHeading,
  AuthMessage,
  AuthQuestion,
  AuthSpan,
  Authmessage,
  AuthCircleOne,
  AuthCircleTwo
} from "./auth.styles";
import Image from "../../components/atoms/image/image.component";
import { Form, Formik } from "formik";
import { BUTTON_TYPE_CLASSES } from "../../components/atoms/button/button.component";
import Text from "../../components/atoms/typography";
import BackArrow from "../../components/atoms/back-arrow/back-arrow.component";
import ErrorModal from "../../components/atoms/error-modal/error-modal.component";
import { useNavigate } from "react-router-dom";

const layoutImage =
  "https://res.cloudinary.com/dftu6mjmt/image/upload/v1710765786/750HoursTracker/tracker-auth_hrzsvc.png";
const logoImage =
  "https://res.cloudinary.com/dftu6mjmt/image/upload/v1710765782/750HoursTracker/tracker-logo_copq4t.png";

const AuthLayout = observer(
  ({
    content,
    validationSchema,
    handleSubmit,
    // handleReturn,
    initialValue,
    error,
    PostChildren,
    Children,
    isLoading
  }) => {
    let navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      if (error) {
        setShowModal(true);
      }
    }, [error]);

    const handleShowClose = () => {
      setShowModal(false);
    };

    return (
		<AuthContainer>
			<div className="auth--layout__left">
				<div className="auth--layout__div">
					<Image
						className="auth--layout__img"
						url={layoutImage}
						alt="Layout Image"
					/>
				</div>
			</div>
			<div className="auth--layout__right">
				{content.backButton && (
					<BackArrow
						handleReturn={() => navigate(-1)}
						title={content.backButton}
					/>
				)}
				<Image
					className="auth--layout__logo-1"
					url={logoImage}
					alt="Logo Image"
				/>
				{content.heading && (
					<AuthHeading>{content.heading}</AuthHeading>
				)}
				{content.message && (
					<AuthMessage>
						<Authmessage>{content.message}</Authmessage>
					</AuthMessage>
				)}
				<AuthCircleOne></AuthCircleOne>
				<div className="auth--form">
					<Formik
						initialValues={initialValue}
						validationSchema={validationSchema}
						onSubmit={(values, { setSubmitting, resetForm }) => {
							setSubmitting(true);
							handleSubmit(values, { setSubmitting, resetForm });
							// resetForm({values: ''});
						}}
					>
						{({ values, isSubmitting }) => (
							<Form>
								{showModal && (
									<ErrorModal
										errorText={error}
										handleClose={handleShowClose}
									/>
								)}
								{PostChildren}
								{content &&
									content.form.map((el, i) => {
										const {
											label,
											name,
											placeholder,
											type,
										} = el;
										return (
											<AuthFormInput
												className="auth--form__input"
												label={label}
												name={name}
												placeholder={placeholder}
												type={type}
												required
												key={i}
											/>
										);
									})}
								{Children}
								{content.buttonText && (
									<AuthButton
										buttonType={BUTTON_TYPE_CLASSES.curved}
										isLoading={isLoading}
										type="submit"
										className="auth--button"
									>
										{content.buttonText}
									</AuthButton>
								)}
								{content.subQuestion && (
									<AuthQuestion>
										{content.subQuestion}
										<AuthSpan>
											<a href={content.subLink}>
												{content.subOption}
											</a>
										</AuthSpan>
									</AuthQuestion>
								)}
							</Form>
						)}
					</Formik>
				</div>
				<AuthCircleTwo></AuthCircleTwo>
			</div>
		</AuthContainer>
	);
  }
);

export default AuthLayout;
