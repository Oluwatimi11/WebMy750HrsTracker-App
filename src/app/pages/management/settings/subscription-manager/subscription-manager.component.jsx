import React from "react";
import { subscriptionData } from "../../../../assets/data/data";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../../../components/atoms/button/button.component";
import styled from "styled-components";
import styles from "./subscription-manager.module.scss";
import { GiCheckMark } from "react-icons/gi";

export const SubButton = styled(Button)`
  width: 288px;
  height: 44px;
  border-radius: 50px;
  align-self: left;
  font-size: 16px;
  font-weight: 600;
  font-family: Inter;
  background-color: #fff;
  color: #003889;
  border: 1px solid #003889;

  &:hover {
    background-color: #003889;
    color: #fff;
  }

  &:active {
    background-color: #003889;
    color: #fff;
  }
`;

const SubscriptionManager = () => {
  return (
    <div className={styles["sub__div"]}>
      {subscriptionData.map((el, i) => {
        const { index, plan, amount, packages, btn } = el;
        return (
          <div key={`sub_${index}`} className={styles["sub__card"]}>
            <div className={styles["sub__card--head"]}>
              <h5 className={styles["sub__card--head-5"]}>{plan} plan</h5>
              <h3 className={styles["sub__card--head-3"]}>${amount}</h3>
              <hr />
            </div>
            {/* <div className={styles["sub__card--body"]}> */}
              <div id={`mid_${index}`} className={styles["sub__card--mid"]}>
                <ul className={styles["sub__card--mid-ul"]}>
                  {packages.map((pack, packIndex) => (
                    <li
                      key={`sub_${packIndex}`}
                      className={styles["sub__card--mid-li"]}
                      id={`li_${index}`}
                    >
                      <i className={styles["sub__card--mid-icn"]}>
                        <GiCheckMark />
                      </i>
                      {pack}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles["sub__card--bottom"]}>
                <span></span>
                <SubButton
                  buttonType={BUTTON_TYPE_CLASSES.curved}
                  type="submit"
                  className="sub--button"
                >
                  {btn}
                </SubButton>
              </div>
            {/* </div> */}
          </div>
        )
      })}
    </div>
  );
};

export default SubscriptionManager;
