import styled from "styled-components";

export const BaseButton = styled.button`
  min-width: 50px;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "44px"};
  color: #fff;
  background-color: ${({ bgcolor }) => bgcolor || "#003889"};
  border: 1px solid #fff;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${({ padding }) => padding || "6px 24px"};
  gap: 16px;

  &:hover {
    border: none;
  }
`;

export const CurvedButton = styled(BaseButton)`
  border-radius: 8px;
`;
