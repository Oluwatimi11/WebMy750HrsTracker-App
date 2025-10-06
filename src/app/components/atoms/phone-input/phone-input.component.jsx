import React from "react";
import { PhoneInput as IntlTelInput } from "react-international-phone";
import "react-international-phone/style.css";
import styles from "./phone-input.module.scss";
import { useField } from "formik";

const PhoneInput = ({name}) => {
  const [field, , helpers] = useField(name);

	return (
		<div className={styles["intl-tel-input"]}>
			<label className={styles["phone__btm--label"]}>Phone Number</label>
			<IntlTelInput
				className={styles["phone__btm--input"]}
				value={field.value}
				placeholder="Phone Number"
				preferredCountries={["ca", "us", "gb"]}
				name={name}
				onChange={(phone) => helpers.setValue(phone)}
				containerClassName="intl-tel-input"
			/>
		</div>
	);
};

export default React.memo(PhoneInput);
