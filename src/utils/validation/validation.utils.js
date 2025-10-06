import * as Yup from "yup";
import { parse } from "date-fns";

export const ConfirmPasswordValidator = Yup.string().oneOf(
    [Yup.ref("password"), Yup.ref("newPassword"), null],
    "Password must match"
).required("Confirm Password is required");

export const PasswordValidator = Yup.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    "Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
).required("Password is required");

export const EmailValidator = Yup.string()
    .email("Email is invalid")
    .required("Email is required");

export const nameValidator = (name = "") =>
    Yup.string().required(name ? `${name} is required` : "Required");

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const guidRegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

const fourDigitsRegex = /^\d{4}$/;
const sixDigitsRegex = /^\d{6}$/;
const eightDigitsRegex = /^\d{8}$/;
const elevenDigitsRegex = /^\d{11}$/;
const tenDigitsRegex = /^\d{10}$/;

export const PhoneNumberValidator = Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone Number is Required");
    
export const GeneralValidator = Yup.string().required("Required Field");

export const ConsentValidator = Yup.bool()
    .test(
        "acceptTerms",
        "You have to agree with our Terms and Conditions!",
        (value) => value === true
    )
    .required("You have to agree with our Terms and Conditions!");

export const NumberValidator = Yup.number().required("Required");

export const BVNValidator = Yup.string()
    .matches(elevenDigitsRegex, "Must be 11 digits")
    .required("Required");

export const AccountNumberValidator = Yup.string()
.matches(tenDigitsRegex, "Must be 10 digits")
.required("Required");

export const PinValidator = Yup.string()
.matches(fourDigitsRegex, "Must be 4 digits")
.required("Pin is Required");

export const TokenValidator = Yup.string()
.matches(sixDigitsRegex, "Must be 6 digits")
.required("Token is Required");

export const VerifyEmailTokenValidator = Yup.string()
.matches(eightDigitsRegex, "Must be 8 digits")
.required("Token is Required");

export const GUIDValidator = Yup.string()
    .matches(guidRegExp, "Invalid GUID")
    .required("GUID is Required");

export const DateValidator = Yup.date()
  .transform(function (value, originalValue) {
    if (this.isType(value)) {
      return value;
    }
    const result = parse(originalValue, "yyyy/MM/dd", new Date());
    return result;
  })
  .typeError("Please enter a valid date")
  .required("Date is required")
  .min(new Date("1990-11-13"), "Date is too early");