import React, { useCallback } from "react";
import styles from "./toggle-switch.module.scss";
import { useStore } from "../../../../store";

function ToggleSwitch() {
	const { rentalType, toggleRentalType } = useStore();

	const handleChange = useCallback(() => {
		toggleRentalType(rentalType === "str" ? "ltr" : "str");
	}, [rentalType, toggleRentalType]);

	return (
		rentalType !== undefined && (
			<center>
				<input
					type="checkbox"
					id="switch"
					className={styles["checkbox"]}
					onChange={handleChange}
					checked={rentalType === "str"}
				/>
				<label
					aria-label="Toggle rental type"
					htmlFor="switch"
					className={`${styles["toggle"]} ${
						rentalType && styles["checked"]
					}`}
				>
					<div className={styles["toggle__div"]}>
						<p>STR</p>
						<p>LTR</p>
					</div>
				</label>
			</center>
		)
	);
}

export default React.memo(ToggleSwitch);
// className={`${optionCheck && styles["unchecked"]}`}