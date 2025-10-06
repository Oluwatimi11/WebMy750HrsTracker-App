import React from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../../atoms/button/button.component";
import styles from "./members-footer.module.scss";

const MembersFooter = () => {
  return (
    <div className={styles["footer"]}>
      <div className={styles["footer__top"]}>
        <div className={styles["footer__top--head"]}>
            <h3 className={styles["footer__top--header"]}>Join our newsletter</h3>
            <p className={styles["footer__top--para"]}>We'll send you in a nice letter once per week. No spam.</p>
        </div>
        <div className={styles["footer__top--field"]}>
            <input className={styles["footer__top--input"]} type="email" placeholder="Enter your email"/>
            <Button className={styles["footer__top--btn"]} buttonType={BUTTON_TYPE_CLASSES.curved}>Subscribe</Button>
        </div>
      </div>
      <hr />
      <div className={styles["footer__btm"]}>
        <div className={styles["footer__btm--div"]}>
            <h5 className={styles["footer__btm--head"]}>Product</h5>
            <ul className={styles["footer__btm--ul"]}>
                <li className={styles["footer__btm--li"]}>Overview</li>
                <li className={styles["footer__btm--li"]}>Features</li>
                <li className={styles["footer__btm--li"]}>Pricing</li>
            </ul>
        </div>
        <div className={styles["footer__btm--div"]}>
            <h5 className={styles["footer__btm--head"]}>Company</h5>
            <ul className={styles["footer__btm--ul"]}>
                <li className={styles["footer__btm--li"]}>About Us</li>
                <li className={styles["footer__btm--li"]}>Contact</li>
            </ul>
        </div>
        <div className={styles["footer__btm--div"]}>
            <h5 className={styles["footer__btm--head"]}>Resources</h5>
            <ul className={styles["footer__btm--ul"]}>
                <li className={styles["footer__btm--li"]}>Newsletter</li>
                <li className={styles["footer__btm--li"]}>Support</li>
            </ul>
        </div>
        <div className={styles["footer__btm--div"]}>
            <h5 className={styles["footer__btm--head"]}>Social</h5>
            <ul className={styles["footer__btm--ul"]}>
                <li className={styles["footer__btm--li"]}>Twitter</li>
                <li className={styles["footer__btm--li"]}>LinkedIn</li>
                <li className={styles["footer__btm--li"]}>Facebook</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default MembersFooter;
