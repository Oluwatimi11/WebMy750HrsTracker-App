import { Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ConsentValidator,
  EmailValidator,
  GeneralValidator,
  PasswordValidator,
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
import { useStore } from "../../../../../store";

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
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  message: "",
  agreement: "",
};

const validate = Yup.object({
  firstname: nameValidator("First Name"),
  lastname: nameValidator("Last Name"),
  email: EmailValidator,
  password: PasswordValidator,
  message: GeneralValidator,
  agreement: ConsentValidator,
});

const Support = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    navigate("/support");
    setTimeout(() => {
      setSubmitting(false);
    }, 4000);
  };

  return (
    <div className={styles["container"]}>
      <div>
        <TopSection
          content={topContent}
        />
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
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            handleSubmit(values, { setSubmitting });
            // resetForm({values: ''});
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <div className={styles["support__btm"]}>
                <div className={styles["support__btm--top"]}>
                  <div className={styles["support__btm--names"]}>
                    <label
                      className={styles["support__btm--label"]}
                      htmlFor="firstname"
                    >
                      First Name
                    </label>
                    <input
                      className={styles["support__btm--input"]}
                      id="firstname"
                      type="text"
                      name="firstname"
                      placeholder="Enter your First Name"
                    />
                  </div>
                  <div className={styles["support__btm--names"]}>
                    <label
                      className={styles["support__btm--label"]}
                      htmlFor="lastname"
                    >
                      Last Name
                    </label>
                    <input
                      className={styles["support__btm--input"]}
                      id="lastname"
                      type="text"
                      name="lastname"
                      placeholder="Enter your Last Name"
                    />
                  </div>
                </div>
                <div className={styles["support__btm--inner"]}>
                  <label
                    className={styles["support__btm--label"]}
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    className={styles["support__btm--input"]}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your Email Address"
                  />
                </div>
                <div className={styles["support__btm--inner"]}>
                  <PhoneInput />
                </div>
                <div className={styles["support__btm--inner"]}>
                  <label
                    className={styles["support__btm--label"]}
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    className={styles["support__btm--area"]}
                    id="message"
                    type="text"
                    name="phone"
                    rows={5}
                  />
                </div>
                <div className={styles["support__btm--check"]}>
                  <input
                    className={styles["support__btm--check-inp"]}
                    type="checkbox"
                    id="agreement"
                    name="agreement"
                  />
                  <label
                    className={styles["support__btm--check-lab"]}
                    htmlFor="agreement"
                  >
                    You agree to our friendly
                    <a href="/support"> privacy policy.</a>
                  </label>
                </div>
              </div>
              <AuthButton
                buttonType={BUTTON_TYPE_CLASSES.curved}
                isLoading={isSubmitting}
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
