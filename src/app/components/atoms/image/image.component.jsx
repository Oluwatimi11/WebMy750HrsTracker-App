import React from "react";
import styled from "styled-components";

const ImageStyling = styled.img`
  width: ${({ width }) => width || "500px"};
  height: ${({ height }) => height || "500px"};
  border-radius: ${({ rad }) => rad || "0rem"};
`;

/**
 *
 * @param {*} props
 * @returns
 */
const Image = (props) => {
  const { className, url, altName } = props;
  return <ImageStyling className={className} src={url} alt={altName} />;
};

export default Image;
