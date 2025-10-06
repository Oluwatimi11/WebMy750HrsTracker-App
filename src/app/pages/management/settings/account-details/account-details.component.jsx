import { Form, Formik } from "formik";
import React, { useState } from "react";
import { PhoneNumberValidator, nameValidator } from "../../../../../utils/validation/validation.utils";
import * as Yup from "yup";
import styles from "./account-details.module.scss";
import DoubleBtn from "../../../../components/molecules/double-btn/double-btn.component";
import FileUpload from "../../../../components/atoms/file-upload/file-upload.component";
import Image from "../../../../components/atoms/image/image.component";
import {
  useGetUser,
  useUpdateUserDetails,
  useUpdateUserPhoto,
  useUserDetail,
} from "../../../../../hooks/user";
import { LocalStorageKeys } from "../../../../constants";

const fallBackImage = "https://res.cloudinary.com/dftu6mjmt/image/upload/v1710765786/750HoursTracker/tracker-auth_hrzsvc.png";

const AccountDetails = () => {
  const user = JSON.parse(localStorage.getItem(LocalStorageKeys.USER));

  const { phoneNumber, firstName, lastName, id } = useUserDetail();
  const { mutate: updateUserDetails, isPending } = useUpdateUserDetails();
  const { mutate: updateUserPhoto } = useUpdateUserPhoto();
  const { data } = useGetUser(id);

	const { profilePic, email } = data || {};
  const [uploadedFileCount, setUploadedFileCount] = useState(0);

  const defaultFormFields = {
    firstname: firstName,
    lastname: lastName,
    phone: phoneNumber || ''
  };

  const validate = Yup.object({
    firstname: nameValidator("First Name"),
    lastname: nameValidator("Last Name"),
    phone: PhoneNumberValidator
  });

  const handleFileUpload = (count) => {
    setUploadedFileCount(count);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      !isPending &&
        updateUserDetails(
          { ...values, id: user?.id },
          {
            onSuccess: () => {
              resetForm();
            },
          }
        );
    } catch (error) {
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const handleImgSubmit = async (values, { setSubmitting, resetForm }) => {
    const file = values.profilePhoto;
  
    if (!file) {
      return;
    }

    const { name, type, size } = values.profilePhoto;
    const nameSplit = name.split(".");
    const fileName = name;
    const contentType = type;
    const fileExtension = nameSplit[1];
    const data = size;

    try {
      !isPending &&
        (updateUserPhoto(
          {
            ...values,
            id: user?.id,
            profilePicture: [
              {
                fileName: fileName,
                fileExtension: fileExtension,
                contentType: contentType,
                data: btoa(data.toString()),
              },
            ],
          },
          {
            onSuccess: () => {
              resetForm();
            },
          }
        ));
    } catch (error) {
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  return (
		<div className={styles["container"]}>
			<div className={styles["details__div"]}>
				<Formik
					initialValues={defaultFormFields}
					validationSchema={validate}
					onSubmit={handleSubmit}
				>
					{({ values, handleBlur, handleChange }) => (
						<Form>
							<div className={styles["details__btm"]}>
								<div className={styles["details__btm--top"]}>
									<div
										className={
											styles["details__btm--names"]
										}
									>
										<label
											className={
												styles["details__btm--label"]
											}
											htmlFor="firstname"
										>
											First Name
										</label>
										<input
											className={
												styles["details__name--input"]
											}
											id="firstname"
											type="text"
											name="firstname"
											onChange={handleChange}
											onBlur={handleBlur}
											placeholder="Enter your First Name"
											value={values.firstname}
										/>
									</div>
									<div
										className={
											styles["details__btm--names"]
										}
									>
										<label
											className={
												styles["details__btm--label"]
											}
											htmlFor="lastname"
										>
											Last Name
										</label>
										<input
											className={
												styles["details__name--input"]
											}
											id="lastname"
											type="text"
											name="lastname"
											onChange={handleChange}
											onBlur={handleBlur}
											placeholder="Enter your Last Name"
											value={values.lastname}
										/>
									</div>
								</div>
								<div className={styles["details__btm--inner"]}>
									<label
										className={
											styles["details__btm--label"]
										}
										htmlFor="email"
									>
										Email Address
									</label>
									<div
										className={
											styles["details__btm--mail--div"]
										}
									>
										<h4
											className={
												styles["details__btm--mail"]
											}
										>
											{email}
										</h4>
									</div>
								</div>
								<div className={styles["details__btm--inner"]}>
									<label
										className={
											styles["details__btm--label"]
										}
										htmlFor="phone"
									>
										Phone Number
									</label>
									<input
										className={
											styles["details__btm--input"]
										}
										id="phone"
										type="tel"
										name="phone"
										placeholder="Enter your Phone Number"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.phone}
									/>
								</div>
							</div>
							<div className={styles["details__btn--inner"]}>
								<DoubleBtn
									firstbtn="Cancel"
									secondbtn="Save Changes"
									isSubmitting={isPending}
								/>
							</div>
						</Form>
					)}
				</Formik>
			</div>
			<div className={styles["details__upload--div"]}>
				<Formik
					initialValues={{ profilePhoto: "" }}
					// validationSchema={validate}
					onSubmit={handleImgSubmit}
				>
					{({ isSubmitting, handleChange }) => (
						<Form>
							<div className={styles["details__btm"]}>
								<div className={styles["details__btm--upload"]}>
									<div
										className={
											styles["details__upload--head"]
										}
									>
										<h4>Your Photo</h4>
										<p>
											This will be displayed on your
											profile
										</p>
									</div>
									<div
										className={
											styles["details__upload--body"]
										}
									>
										<div
											className={
												styles["details__upload--image"]
											}
										>
											<Image
												className={
													styles[
														"details__upload--img"
													]
												}
												url={
													profilePic ||
													fallBackImage
												}
												altName="logo-image"
											/>
										</div>
										<FileUpload
											onFileUpload={handleFileUpload}
											className={
												styles["details__upload--file"]
											}
											icnName={
												styles["details__upload--icn"]
											}
											fileType="SVG, PNG, JPG, or GIF(max. 800x400px)"
											fileMax={1}
											name="profilePhoto"
											handleChange={handleChange}
										/>
									</div>
								</div>
								<div className={styles["details__btn--inner"]}>
									<DoubleBtn
										firstbtn="Cancel"
										secondbtn="Upload Image"
										isSubmitting={isSubmitting}
									/>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
  );
};

export default AccountDetails;