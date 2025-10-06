import React from "react";
import styled from "styled-components";
import { pxToRem } from "../../../../utils/helpers/px-to-rem/pxToRem";
import PropTypes from "prop-types";

const TextStyling = styled.p`
  font-size: ${({ size }) => size && pxToRem(size)};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => color};
`;

const Text = ({ text, children, ...props }) => {
  return <TextStyling {...props}>{text || children} </TextStyling>;
};

export const Span = ({ text, children, ...props }) => {
  return React.createElement(
    TextStyling,
    { ...props, as: "span" },
    text || children
  );
};

export const Heading = ({ level, text, children, ...props }) => {
  return React.createElement(
    TextStyling,
    { ...props, as: `h${level || 1}` },
    text || children
  );
};

Text.propTypes = {};

Heading.propTypes = {
  level: PropTypes.number,
};

Span.propTypes = {};

Text.Heading = Heading;
Text.Span = Span;

export default Text;
