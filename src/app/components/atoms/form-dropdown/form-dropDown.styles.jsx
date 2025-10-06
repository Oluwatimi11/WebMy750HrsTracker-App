import { styled } from "styled-components";

export const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  position: relative;
  /* margin-bottom: 1rem; */
`;

export const FormLabel = styled.label`
  font-size: 14px;
  color: #1B1B1B;
  font-weight: 400;
  font-family: Inter;
  text-transform: capitalize;
`;

export const FormSelect = styled.select`
  font-size: 18px;
  width: ${({ width }) => width || "90%"};
  height: ${({ height }) => height || "58px"};
  padding: 15px 20px;
  border: 1px solid #D0D5DD;
  border-radius: 10px;
  margin: 15px 0px 20px 0px;
  font-family: Inter;
  background-color: #fff !important;

  //tab-port
  @media only screen and (max-width: 900px) {
    width: 92%;
  }

  //phone
  @media only screen and (max-width: 600px) {
    width: 95%;
  }
`;

export const FormOption = styled.option`
  font-size: 18px;
  width: 92%;
  padding: 15px 20px;
  border: 1px solid #888;
  border-radius: 4px;
  margin: 15px 0px;
  font-family: Mulish;
  background-color: #fff !important;
`;
