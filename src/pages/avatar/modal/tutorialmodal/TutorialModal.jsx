import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import XButton from "assets/images/x_button.png";
import Keyboard from "assets/images/keyboard.png";
import Mouse from "assets/images/mouse.png";

const TutorialModal = ({ open, close }) => {
  const outside = useRef();

  return (
    <>
      {/* <ModalOutSide
        open={open}
        ref={outside}
        onClick={(e) => {
          if (e.target == outside.current) {
            close();
          }
        }}
      > */}
      <Modal
        open={open}
        ref={outside}
        onClick={(e) => {
          if (e.target == outside.current) {
            close();
          }
        }}
      >
        <button className="close" onClick={close}>
          <img alt="btn" src={XButton}></img>
        </button>
        {/* <ModalHeader></ModalHeader> */}
        <ModalBody>
          <div>
            <p>캐릭터 움직이기</p>
            <img alt="btn" src={Keyboard}></img>
          </div>
          <div>
            <p>시점변경</p>
            <img alt="btn" src={Mouse}></img>
          </div>
        </ModalBody>
      </Modal>
      {/* </ModalOutSide> */}
    </>
  );
};

export default TutorialModal;

const modalBgShow = keyframes`
 from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalOutSide = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* z-index: 200; */
  animation: ${modalBgShow} 0.3s;
`;

const Modal = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  box-sizing: border-box;
  width: 80%;
  max-width: 656px;
  height: 324px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  padding: 50px;
  position: absolute;
  bottom: 12%;
  right: 2.6%;
  animation: ${modalBgShow} 0.3s;
  & > .close {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 30px;
    color: white;
    cursor: pointer;
  }
`;

const ModalBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  & p {
    color: white;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
  }
`;
