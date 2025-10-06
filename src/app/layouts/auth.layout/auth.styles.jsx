import { styled } from "styled-components";
import Text, { Heading } from "../../components/atoms/typography";
import Button from "../../components/atoms/button/button.component";
import FormInput from "../../components/atoms/form-input/form-input.component";

export const AuthContainer = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: row;
  /* height: 100%; */

  //tab-port
  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }

  .auth--layout__left {
    width: 50%;

    //tab-port
    @media only screen and (max-width: 900px) {
      width: 100%;
      height: 100%;
    }
  }

  .auth--layout__div {
    position: relative;
    height: 100%;

    //tab-port
    @media only screen and (max-width: 900px) {
      display: flex;
      padding-top: 63px;
      align-items: center;
      justify-content: center;
    }
  }

  .auth--layout__img {
    width: 100% !important;
    height: 1024px;
    object-fit: cover;
    opacity: 90%;

    //tab-port
    @media only screen and (max-width: 900px) {
      display: none;
    }
  }

  .auth--layout__logo-1 {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 118px;
    height: 79.27px;

    //tab-port
    @media only screen and (max-width: 900px) {
      display: none;
    }
  }

  .auth--layout__right {
    width: 50%;
    padding: 70px;
    background-color: #f0f5fd;

    //tab-port
    @media only screen and (max-width: 900px) {
      width: 100%;
      padding: 30px 5%;
    }

    //phone
    @media only screen and (max-width: 600px) {
      width: 100%;
      padding: 30px 3%;
    }
  }

  .auth--personal__grid {
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
    width: 93%;

    //phone
    @media only screen and (max-width: 600px) {
      width: 100%;
    }
  }

  .auth--form {
    width: 447px;
    /* height: 100%; */
    background-color: #fff;
    border-radius: 24px;
    padding: 15px 20px;
    margin: 0 auto;
    box-shadow: 1px 2px 1px;
    position: relative;
    z-index: 2 !important;
  }

  .auth--form__input {
  }

  .auth--rule {
    padding-right: 8%;
  }

  .auth--button {
    border-radius: 24px;
    font-size: 16px;
    font-weight: 600;
  }
`;

export const AuthLottie = styled.div`
  /* display: flex; */
  flex-direction: space-between;
  flex-direction: row;
  height: 200px;
`;

export const AuthHeading = styled(Heading)`
  font-family: Inter;
  font-weight: 600;
  font-size: 30px;
  line-height: normal;
  color: #1b1b1b;
  text-align: center;
  margin: 35px auto 20px auto;
  /* text-shadow: 1.5px 1.5px 3px #000000; */

  //tab-port
  @media only screen and (max-width: 900px) {
    font-weight: 600;
    font-size: 20px;
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


export const AuthMessage = styled.div``;

export const Authmessage = styled.p`
  font-size: 16px;
  font-family: Inter;
  font-weight: 400;
  line-height: 173.5%;
  text-align: center;
  color: #1B1B1B;
  margin-bottom: 1rem;


  //tab-port
  @media only screen and (max-width: 900px) {
    font-family: Inter;
    font-size: 16px;
    font-weight: 500;
    width: 100%;
  }

  //phone
  @media only screen and (max-width: 600px) {
    width: 90%;
  }
`;

export const AuthFormInput = styled(FormInput)``;

export const AuthQuestion = styled.div`
  text-align: center;
  margin-top: 1rem;

  //tab-port
  @media only screen and (max-width: 900px) {
    font-family: Inter;
    font-size: 16px;
    font-weight: 500;
  }
`;

export const AuthSpan = styled.span`
  color: #003889;
  font-weight: 500;
`;




export const AuthRequest = styled.div`
  color: #e41a80;
  text-align: center;
  font-family: Inter;
  font-size: 18px;
  font-weight: 600;

  //tab-port
  @media only screen and (max-width: 900px) {
    font-family: Inter;
    font-size: 16px;
    font-weight: 500;
  }
`;

export const AuthButton = styled(Button)`
  margin-top: 2rem;
  width: 100%;
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


export const AuthCircleOne = styled.div`
  border: 5px solid #003889;
  border-radius: 100%;
  width: 70px;
  height: 70px;
  position: absolute;
  top: 20rem;
  right: 35rem;
`;

export const AuthCircleTwo = styled.div`
  border: 5px solid #CD932A;
  border-radius: 100%;
  width: 70px;
  height: 70px;
  position: absolute;
  top: 32rem;
  right: 6rem;
`;


