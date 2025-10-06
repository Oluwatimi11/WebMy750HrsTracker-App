import { CgArrowLongLeft } from "react-icons/cg";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  left: 0;
  top: -30px;
  cursor: pointer;
  font-weight: 550;
  color: #003889;
`;

const BackArrow = ({ handleReturn, title }) => {
  return (
    <Wrapper onClick={handleReturn}>
      <CgArrowLongLeft size={24} />
      {title}
    </Wrapper>
  );
};

export default BackArrow;