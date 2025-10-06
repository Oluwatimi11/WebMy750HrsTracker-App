import React, { useState } from "react";
import styled from "styled-components";
import { useViewport } from "../../../../hooks/useViewPort";
import { ErrorMessage, useField } from "formik";
import {
  FormGroup,
  FormInputLabel,
  FormField,
  FormFieldDiv
} from "./form-input.styles";
import { FiEye, FiEyeOff } from "react-icons/fi";
import classnames from "classnames";

export const ErrorText = styled.div`
  font-size: 12px;
  margin-bottom: 10px;
  color: red;
`;

const FormInput = ({ label, className, onChange, ...otherProps }) => {
  const { mobile } = useViewport();
  const [field, meta] = useField(otherProps);
  const [isPasswordVisible, setPasswordVisible] = useState(true); // State for password visibility
  const togglePasswordVisibility = () => setPasswordVisible(!isPasswordVisible); // Function to toggle password visibility
  const fieldName = field?.name;

  return (
    <FormGroup>
      {label && (
        <FormInputLabel
          shrink={field.value?.length}
          htmlFor={field?.name}
          color={mobile ? "#fff" : null}
          // className={classnames(styles["form__input--label"], className)}
        >
          {label}
        </FormInputLabel>
      )}
      {fieldName === "password" || fieldName === "confirmPassword" || fieldName === "newPassword" || fieldName === "oldPassword"  ? (
        <FormFieldDiv className={className}>
          <FormField
            id="form__field--id"
            className={className}
            {...otherProps}
            error={meta.touched && meta.error}
            type={isPasswordVisible ? "password" : "text"}
          ></FormField>
          <i className="form__field--icon" onClick={togglePasswordVisibility}>{isPasswordVisible ? <FiEyeOff /> : <FiEye />}</i>
        </FormFieldDiv>
      ) : (
        <FormField {...otherProps} error={meta.touched && meta.error} className={className} />
      )}
      <ErrorMessage name={field?.name}>
        {(msg) => <ErrorText id="text">{msg}</ErrorText>}
      </ErrorMessage>
    </FormGroup>
  );
};

export default FormInput;
