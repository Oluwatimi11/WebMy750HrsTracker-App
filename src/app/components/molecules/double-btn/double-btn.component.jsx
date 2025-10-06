import React from "react";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../atoms/button/button.component";
import styled from "styled-components";
import styles from "./double-btn.module.scss";

export const DoubleButton = styled(Button)`
  width: ${({ width }) => width || "135px"};
  height: 44px;
  border-radius: 50px;
  align-self: left;
  font-size: 12px;
  font-weight: 600;
  font-family: Inter;
`;

const DoubleBtn = ({ firstbtn, secondbtn, isSubmitting }) => {
  return (
    <div className={styles["double__btn--div"]}>
      <DoubleButton
        className={styles["double__btn--first"]}
        buttonType={BUTTON_TYPE_CLASSES.curved}
        isLoading={isSubmitting}
        type={firstbtn === "Cancel" ? "button" : "submit"}
      >
        {firstbtn}
      </DoubleButton>
      <DoubleButton
        className={styles["double__btn--second"]}
        buttonType={BUTTON_TYPE_CLASSES.curved}
        isLoading={isSubmitting}
        type="submit"
      >
        {secondbtn}
      </DoubleButton>
    </div>
  );
};

export default DoubleBtn;
