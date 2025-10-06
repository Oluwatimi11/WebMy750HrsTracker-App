import { Field } from "formik";
import styled, { css } from "styled-components";

const subColor = "grey";

const errorStyle = css`
  background-color: pink;
  border: 1px solid red;
`;

export const FormInputLabel = styled.label`
  color: ${({ labelcolor }) => labelcolor || "#1B1B1B"};
  font-size: ${({ labelFont }) => labelFont || "14px"};
  font-weight: 500;
  font-family: Inter;

  //tab-port
  @media only screen and (max-width: 900px) {
    font-size: 16px;
  }
`;

export const FormFieldDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: ${({ width }) => width || "100%"};
  background-color: #f0f5fd;
  border-radius: 10px;
  height: 44px;
  margin: 0px 0px 14px 0px;

  &:focus {
    outline: none;
    border: 0.951px solid #e41a80;
  }

  .form__field--icon {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    line-height: 1;
    color: #003889;
    transition: color 0.3s ease-in-out;
    margin-bottom: 20px;
  }

  #form__field--id {
    width: ${({ width }) => width || "90%"};
  }

`;

export const FormField = styled(Field)`
  font-size: ${({ fontSize }) => fontSize || "14px"};
  display: block;
  width: ${({ width }) => width || "100%"};
  height: 44px;
  padding: 15px 20px;
  border: 1px solid #f0f5fd;
  border-radius: 10px;
  margin: 0px 0px 14px 0px;
  background-color: ${({ bgcolor }) => bgcolor || "#f0f5fd"};

  :invalid {
    ${({ error }) => error && errorStyle};
  }

  ::placeholder {
    color: ${subColor};
    opacity: 1;
    font-size: 14px;
  }

  //tab-port
  @media only screen and (max-width: 900px) {
    font-size: 12px;
    font-weight: 400;
    width: ${({ width }) => width || "85%"};
  }
`;

// export const FormFieldDiv = styled.div`
//   font-size: 14px;
//   display: block;
//   width: ${({ width }) => width || "100%"};
//   height: 44px;
//   border: 1px solid #f0f5fd;
//   border-radius: 10px;
//   margin: 0px 0px 14px 0px;
//   background-color: #f0f5fd;
// `;

export const FormFieldInput = styled.input`
  font-size: ${({ fontSize }) => fontSize || "14px"};
  width: ${({ width }) => width || "90%"};
  height: 44px;
  padding: 15px 20px;
  border: 1px solid #f0f5fd;
  border-radius: 10px;
  background-color: #f0f5fd;

  :invalid {
    ${({ error }) => error && errorStyle};
  }

  ::placeholder {
    color: ${subColor};
    opacity: 1;
    font-size: 14px;
  }

  &:focus {
    outline: none;
    border: 0.951px solid #e41a80;
  }

  //tab-port
  @media only screen and (max-width: 900px) {
    font-size: 12px;
    font-weight: 400;
    width: ${({ width }) => width || "85%"};
  }
`;

export const FormFieldSpan = styled.span`
  position: absolute;
  top: 60%;
  right: 15px;
  transform: translateY(-50%);
  cursor: pointer;

  .password-toggle-icon i {
    font-size: 20px;
    line-height: 1;
    color: #1b1b1b;
    transition: color 0.3s ease-in-out;
    margin-bottom: 20px;
  }

  .password-toggle-icon i:hover {
    color: #000;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  position: relative;
  width: ${({ width }) => width || "100%"};
  align-items: ${({ align }) => align || "baseline"};
`;