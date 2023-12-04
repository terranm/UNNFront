import React from "react";
import styled from "styled-components";
import FirstLoadingVideo from "assets/videos/first_loading.mp4";
import ReactPlayer from "react-player";
import Loading from "components/loading/Loading";

// 유니티용 로딩모달

const LoadingModal = ({ open, close, percent, loadingMessage, step }) => {
  const divCount = percent * 10; // 원하는 div 갯수

  const renderDivs = () => {
    const divs = [];
    for (let i = 0; i < divCount; i++) {
      divs.push(<ChildComponent key={i} />);
    }
    return divs;
  };

  return (
    <ModalOutSide open={open}>
      <ModalBackground>
        {step === 1 && (
          <>
            <ReactPlayer
              width="100%"
              height="100vh"
              url={FirstLoadingVideo}
              muted={true}
              playing={true}
              loop={true}
            />
          </>
        )}
        {step === 2 && <div className="overlay"></div>}
      </ModalBackground>
      {step === 2 && (
        <Modal>
          <ModalTextBox>
            <Loading></Loading>
            <div style={{ height: "25px" }}></div>
            <div className="title">{loadingMessage}</div>
          </ModalTextBox>
        </Modal>
      )}
    </ModalOutSide>
  );
};

export default LoadingModal;

function ChildComponent() {
  return (
    <>
      <div className="battery"></div>
      <div className="battery"></div>
    </>
  );
}

const ModalOutSide = styled.div`
  display: ${(props) => (props.open ? "flex" : "none")};
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  right: 0;
  z-index: 200;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ModalBackground = styled.div`
  & > .overlay {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    background: rgba(0, 0, 0, 1);
    /* background: rgba(0, 0, 0, 0.5); */
    width: 100%;
    height: 100%;
  }
  & video {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Modal = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const ModalTextBox = styled.div`
  & > .title {
    width: 100%;
    color: #fff;
    text-align: center;
    font-size: 24px;
    font-weight: 400;
  }
  & > .batteryBox {
    margin: 34px 0;
    box-sizing: border-box;
    width: 525px;
    height: 52.569px;
    padding: 7.68px;
    border-radius: 2px;
    border: 2px solid #fff;
  }

  & > .batteryBox > div {
    display: flex;
    justify-content: space-between;
  }

  & > .batteryBox > div > .battery {
    width: 19.368px;
    height: 33.202px;
    border-radius: 2px;
    background: #fff;
  }
`;
