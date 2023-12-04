import React from "react";
import { useNavigate } from "react-router-dom";
import HankukLogo from "assets/images/hankuk_logo.png";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Nav>
      <img onClick={() => navigate("/")} src={HankukLogo} alt="logo"></img>
    </Nav>
  );
};

export default Header;

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  height: 68px;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #000;
`;
