import React, { useState, useEffect } from "react";
import MainVideo from "assets/videos/UNN_past.mp4";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import HankukEmblem from "assets/images/hankuk_emblem.png";

const Main = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header></Header>
      <MainBannerBox>
        <ReactPlayer
          width="100%"
          height="100%"
          url={MainVideo}
          muted={true}
          playing={true}
          loop={true}
        />
        <MainBannerInBox>
          <div className="emblem">
            <img alt="emblem" src={HankukEmblem}></img>
          </div>
          <button onClick={() => navigate("/exhibition")}>입장</button>
        </MainBannerInBox>
      </MainBannerBox>
      <Footer></Footer>
    </>
  );
};

export default Main;

const MainBannerBox = styled.div`
  width: 100%;
  position: relative;
  padding-top: 68px;
  margin-bottom: -5px;
`;

const MainBannerInBox = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  & > .emblem {
    width: 100%;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
  }

  & > button {
    width: 280px;
    height: 60px;
    border-radius: 30px;
    background: #1f2d3b;
    /* background: linear-gradient(180deg, #f6ab00 0%, #eb6101 100%); */
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    margin: auto;
    cursor: pointer;
  }
`;
