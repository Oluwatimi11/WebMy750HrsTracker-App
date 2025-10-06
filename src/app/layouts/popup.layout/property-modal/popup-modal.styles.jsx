import styled from "styled-components";
import { Heading } from "../../../components/atoms/typography";
import Button from "../../../components/atoms/button/button.component";
import FormInput from "../../../components/atoms/form-input/form-input.component";

export const MainPopup = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  z-index: 1;
`;

export const PopupDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 4rem;
  border-radius: 30px;
  width: 60%;

  background-color: #fff;

  @media only screen and (min-width: 320px) {
    width: 60%;
    padding: 1rem 2rem;
  }

  @media only screen and (min-width: 481px) {
    padding: 1rem 4rem;
  }

  @media only screen and (min-width: 769px) {
    width: 60%;
  }

  @media only screen and (min-width: 1025px) {
    width: 60%;
  }
`;

export const PopupTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;

  @media only screen and (min-width: 320px) {
  }

  @media only screen and (min-width: 481px) {
  }

  @media only screen and (min-width: 769px) {
  }

  @media only screen and (min-width: 1025px) {
  }
`;

export const PopupMid = styled.div`
  align-items: center;
  width: 100%;
`;

export const PopupHead = styled(Heading)`
  text-align: center;
  font-size: 18px;
  color: #fff;
`;

export const PopupHeader = styled(Heading)`
  text-align: left;
  font-weight: 400;
  font-family: Inter;
  font-size: 18px;
  line-height: 50px;

  @media only screen and (min-width: 320px) {
    line-height: 30px;
  }
`;

export const PopupIcon = styled.div`
  .Cancel-Icon {
    font-size: 20px;
  }
`;

export const PopupButtons = styled(Button)`
  padding: 0 3px;
  margin-top: 5rem;
`;

export const PopupFormInput = styled(FormInput)`
  width: 90%;
  font-size: 16px;
  font-weight: 400;
  font-family: Inter;
`;

export const PopupButton = styled(Button)`
  margin: 0 auto;
  width: 30%;
  height: 44px;
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

export const ErrorText = styled(Text)`
  color: #ff0000;
  width: 91%;
  border: 1px solid #ed017f;
  text-align: center;
  font-size: 16px !important;
  padding: 0.5rem 0;
  background-color: pink;
  border-radius: 5px;
`;
