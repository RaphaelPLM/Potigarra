import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  color: #fff;

  min-width: 90px;
  height: 36px;
  width: 130px;

  font-weight: 500;
  font-size: 14px;

  border-radius: 3px;
  border: 0;
  transition: box-shadow 0.2s;

  background-color: ${(props) => getHexCode(props.color)};
`;

function getHexCode(color)
{
  switch(color)
  {
    case "success":
      return "#27C485"
    case "error":
      return "#FF6161";
    default:
      return "#dddddd"
  }
}

function Button(props) {
  return <StyledButton color={props.color}>{props.title}</StyledButton>;
}

export default Button;
