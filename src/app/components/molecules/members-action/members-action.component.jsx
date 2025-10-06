import React from "react";
import { BiLogoApple, BiLogoPlayStore } from "react-icons/bi";
import styles from "./members-action.module.scss";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../atoms/button/button.component";
import styled from "styled-components";

export const DoubleButton = styled(Button)`
  width: ${({ width }) => width || "40%"};
  height: 44px;
  border-radius: 50px;
  align-self: left;
  font-size: 17px;
  font-weight: 600;
  font-family: Inter;
`;

const MembersAction = ({ isSubmitting }) => {
  return (
    <div className={styles["action"]}>
      <div className={styles["action__top"]}>
        <h2 className={styles["action__top--head"]}>
          Are you ready to take your real estate business to the next level?
        </h2>
        <p className={styles["action__top--para"]}>
          Join 1,500+ users in minimizing risk, saving time and maximizing
          profits
        </p>
      </div>
      <div className={styles["action__btm"]}>
        <div className={styles["double__btn--div"]}>
          <DoubleButton
            className={styles["double__btn--first"]}
            buttonType={BUTTON_TYPE_CLASSES.curved}
            isLoading={isSubmitting}
            type="submit"
          >
            <BiLogoApple /> | <BiLogoPlayStore /> Download app
          </DoubleButton>
          <DoubleButton
            className={styles["double__btn--second"]}
            buttonType={BUTTON_TYPE_CLASSES.curved}
            isLoading={isSubmitting}
            type="submit"
          >
            Get Started
          </DoubleButton>
        </div>
      </div>
    </div>
  );
};

export default MembersAction;
