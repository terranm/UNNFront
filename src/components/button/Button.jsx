import React, { useState } from "react";
import styled from "styled-components";

const Button = (props) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const { width, onClick, disabled } = props;
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        maxWidth: `${width}px`,
        width: "100%",
        height: "48px",
        // background: "#6C5CE7",
        borderRadius: "36px",
        fontSize: "16px",
        color: "#FFFFFF",
        fontWeight: "700",
        display: "block",
        opacity: isHover ? 0.9 : 1,
        transition: ".3s",
      }}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#d9d9d9" : "#6C5CE7")};
`;
