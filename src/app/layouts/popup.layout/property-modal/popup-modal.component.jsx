import React, { useEffect, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { Formik, Form } from "formik";
import {
	MainPopup,
	PopupButton,
	PopupDiv,
	PopupFormInput,
	PopupHeader,
	PopupIcon,
	PopupMid,
	PopupTop,
} from "./popup-modal.styles";
import ErrorModal from "../../../components/atoms/error-modal/error-modal.component";
import { BUTTON_TYPE_CLASSES } from "../../../components/atoms/button/button.component";

const PopupLayout = ({
	content,
	validationSchema,
	handleClose,
	handleSubmit,
	initialValue,
	postChildren,
	error,
	Children,
}) => {
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
		<MainPopup onClick={handleClose}>
			<PopupDiv
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<PopupTop>
					<PopupHeader>{content.heading}</PopupHeader>
					<PopupIcon>
						<LiaTimesSolid
							onClick={handleClose}
							className="Cancel-Icon"
						/>
					</PopupIcon>
				</PopupTop>
				<PopupMid>
					<Formik
						initialValues={initialValue}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
						// onSubmit={(values, { setSubmitting, resetForm }) => {
						//   setSubmitting(true);
						//   handleSubmit(values, { setSubmitting, resetForm });
						//   // resetForm({values: ''});
						// }}
					>
						{({ values, isSubmitting }) => (
							<Form>
								{showModal && (
									<ErrorModal
										errorText={error}
										handleClose={handleShowClose}
									/>
								)}
								{postChildren}
								{content &&
									content.form.map((el, i) => {
										const {
											label,
											name,
											placeholder,
											type,
											disabled,
										} = el;
										return (
											<PopupFormInput
												className="popup--form__input"
												disabled={disabled}
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
									<PopupButton
										buttonType={BUTTON_TYPE_CLASSES.curved}
										isLoading={isSubmitting}
										type="submit"
										className="popup--button"
									>
										{content.buttonText}
									</PopupButton>
								)}
							</Form>
						)}
					</Formik>
				</PopupMid>
			</PopupDiv>
		</MainPopup>
	);
};

export default PopupLayout;
