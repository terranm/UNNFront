import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import { isMobile } from "react-device-detect";
//모달 컴포넌트 import
import BasicAlertModal from "pages/avatar/modal/basicalertmodal/BasicAlertModal";
import LoadingModal from "pages/avatar/modal/loadingmodal/LoadingModal";
import ActiveHelloBtn from "assets/images/active_hello_btn.png";
import MovingAlertModal from "pages/avatar/modal/movingalertmodal/MovingAlertModal";
import BoardModal from "pages/avatar/modal/boardmodal/BoardModal";
import TutorialModal from "pages/avatar/modal/tutorialmodal/TutorialModal";
// 아바타 데이터
import {
  HairList,
  FaceList,
  TopList,
  BottomList,
  ShoesList,
} from "constants/AvatarItem";
//이미지 import
import Lobby from "assets/images/lobby.png";
import ExitBtn from "assets/images/exit_btn.png";
import PastBtn from "assets/images/past_btn.png";
import FutureBtn from "assets/images/future_btn.png";
import LobbyBtn from "assets/images/lobby_btn.png";
import TutorialBtn from "assets/images/tutorial_btn.png";
import BoardBtn from "assets/images/board_btn.png";
import RunBtn from "assets/images/run_btn.png";
import HelloBtn from "assets/images/hello_btn.png";
import ActiveRunBtn from "assets/images/active_run_btn.png";
import LoadingBtn from "assets/images/loading.gif";

const category = [
  { categoryName: "헤어", categoryList: HairList },
  { categoryName: "꾸미기", categoryList: FaceList },
  { categoryName: "상의", categoryList: TopList },
  { categoryName: "하의", categoryList: BottomList },
  { categoryName: "신발", categoryList: ShoesList },
];

const Avatar = () => {
  const navigate = useNavigate();
  const history = createBrowserHistory();

  // useState 초깃값 설정
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] =
    useState("전시관으로 이동 중입니다.");
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [alertMessage, setAlertMessage] =
    useState("35주년관으로 이동하시겠습니까?");
  const [layoutType, setLayoutType] = useState("NONE");
  const [sceneType, setSceneType] = useState("");
  const [enter, setEnter] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(true);
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [running, setRunning] = useState(false);
  const [itemList, setItemList] = useState(HairList);
  const [hairItem, setHairItem] = useState("HAIR_AD_001");
  const [faceItem, setFaceItem] = useState("FACE_AA_001");
  const [topItem, setTopItem] = useState("TOP_AG_002");
  const [bottomItem, setBottomItem] = useState("BOTTOM_AE_002");
  const [shoesItem, setShoesItem] = useState("SHOES_AD_002");
  const [showAlert, setShowAlert] = useState(false);
  const [basicAlertMessage, setBasicAlertMessage] = useState("");
  const [basicAlertType, setBasicAlertType] = useState("nickName");
  const [loadingStep, setLoadingStep] = useState(1);

  // 모달 토글
  const [showBoardModal, setShowBoardModal] = useState(false);
  const toggleAlert = () => {
    setShowAlert((prev) => !prev);
  };
  const [showBasicAlert, setShowBasicAlert] = useState(false);
  const toggleBasicAlert = () => {
    setShowBasicAlert((prev) => !prev);
  };

  // 유니티 연결
  const { unityProvider, addEventListener, sendMessage } = useUnityContext({
    loaderUrl: "Build/build.loader.js",
    dataUrl: "Build/build.data",
    frameworkUrl: "Build/build.framework.js",
    codeUrl: "Build/build.wasm",
    streamingAssetsUrl: "StreamingAssets",
  });

  useEffect(() => {
    history.listen((location) => {
      //브라우저 뒤로가기 클릭시
      if (history.action === "POP") {
        sendMessage("ReactCommunicator", "exitGallery");
        window.location.reload();
      }
    });
  }, [history]);

  // 유니티 수신
  useEffect(() => {
    //나가기 누를때
    addEventListener("okayToLeave", goHome);
    //로딩화면 띄울 때
    addEventListener("openLoadingModal", handleLoadingModal);
    //로딩화면 닫을 때
    addEventListener("closeLoadingModal", handleLoadingModal);
    //씬 로딩 퍼센테이지 전송
    addEventListener("loadScene", (percent) => {
      console.log("percent from 유니티 :", percent);
      setLoadingPercentage(JSON.parse(percent).percent);
    });
    //서버 연결이 끊긴 경우
    addEventListener("onDisconnectServer", () => {
      setBasicAlertType("diconnectedServer");
      setBasicAlertMessage(
        `서버와의 연결이 끊겼습니다.\n [확인]을 누르시면 아바타 선택 화면으로 이동됩니다.`
      );
      toggleBasicAlert();
    });
    //ping ack
    try {
      addEventListener("pingAck", () => console.log("핑 수신"));
    } catch (error) {
      alert("서버와 연결이 끊어졌습니다!");
    }
    addEventListener("setHeaderLayout", (type) => {
      // 모든 모달 끄고
      setShowBoardModal(false);
      setShowTutorialModal(false);
      // 이동
      console.log("layout_type from 유니티 :", type);
      setLayoutType(JSON.parse(type).type);
      if (JSON.parse(type).type == "FUTURE") {
        console.log("미래관 이동중");
        setLoadingMessage("35주년관으로 이동 중입니다.");
      }
      if (JSON.parse(type).type == "LOBBY") {
        console.log("로비 이동중");
        setLoadingMessage("로비로 이동 중입니다.");
      }
      if (JSON.parse(type).type == "PAST") {
        console.log("과거관 이동중");
        setLoadingMessage("35주년의 발자취관으로 이동 중입니다.");
      }
    });
  }, [addEventListener]);

  const goHome = () => {
    console.log("나가기!");
    navigate("/");
    window.location.reload();
  };

  const handleHello = () => {
    console.log("sendMessage : ", "ReactCommunicator", "sendHello");
    sendMessage("ReactCommunicator", "sendHello");
    setGreeting(true);
    setTimeout(() => {
      setGreeting(false);
    }, 3000);
  };

  const handleBoardModal = () => {
    //튜토리얼 모달끄고
    setShowTutorialModal(false);
    //오픈
    setShowBoardModal((prev) => !prev);
    if (showBoardModal === false) {
      console.log("sendMessage : ", "ReactCommunicator", "offKeyFocus");
      sendMessage("ReactCommunicator", "offKeyFocus");
    }
    if (showBoardModal === true) {
      console.log("sendMessage : ", "ReactCommunicator", "onKeyFocus");
      sendMessage("ReactCommunicator", "onKeyFocus");
    }
    console.log("showBoardModal :", showBoardModal);
  };

  const handleTutorialModal = () => {
    //방명록 모달끄고
    setShowBoardModal(false);
    //오픈
    setShowTutorialModal((prev) => !prev);
    console.log("showTutorialModal :", showTutorialModal);
  };

  const handleRun = () => {
    setRunning((prev) => !prev);
    if (running === true) {
      console.log("sendMessage : ", "ReactCommunicator", "sendRunOff");
      sendMessage("ReactCommunicator", "sendRunOff");
    }
    if (running === false) {
      console.log("sendMessage : ", "ReactCommunicator", "sendRunOn");
      sendMessage("ReactCommunicator", "sendRunOn");
    }
  };

  const goAnotherScene = (type) => {
    // 모든 모달 끄고
    setShowBoardModal(false);
    setShowTutorialModal(false);
    // 이동
    switch (type) {
      case "LOBBY":
        console.log("sendMessage : ", "ReactCommunicator", "goLobby");
        sendMessage("ReactCommunicator", "goLobby");
        break;
      case "FUTURE":
        console.log("sendMessage : ", "ReactCommunicator", "goFuture");
        sendMessage("ReactCommunicator", "goFuture");
        break;
      case "PAST":
        console.log("sendMessage : ", "ReactCommunicator", "goPast");
        sendMessage("ReactCommunicator", "goPast");
        break;
      case "EXIT":
        console.log("sendMessage : ", "ReactCommunicator", "exitGallery");
        sendMessage("ReactCommunicator", "exitGallery");
        break;
      default:
        console.log("sendMessage : ", "ReactCommunicator", "goLobby");
        sendMessage("ReactCommunicator", "goLobby");
        break;
    }
  };

  const handleInput = (e) => {
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.substring(0, 200);
    }
    setName(e.target.value);
  };

  const sendName = () => {
    if (name.length > 0) {
      setButtonLoading(true);
      console.log(
        "sendMessage",
        "sendProfile",
        JSON.stringify({
          nickName: name,
        })
      );
      sendMessage(
        "ReactCommunicator",
        "sendProfile",
        JSON.stringify({
          nickName: name,
        })
      );
      setEnter(true);
      setLoadingStep(2);
    } else {
      setBasicAlertType("nickName");
      setBasicAlertMessage("닉네임을 입력해 주세요.");
      toggleBasicAlert();
    }
  };
  const handleLoadingModal = () => {
    setShowLoadingModal((prev) => !prev);
    console.log("showLoadingModal :", showLoadingModal);
  };

  const selectItem = (item) => {
    switch (itemList) {
      case HairList:
        setHairItem(
          item,
          sendMessage(
            "ReactCommunicator",
            "SetAvatar",
            JSON.stringify({
              hair: item,
              face: faceItem,
              top: topItem,
              bottom: bottomItem,
              shoes: shoesItem,
            })
          )
        );
        break;
      case FaceList:
        setFaceItem(
          item,
          sendMessage(
            "ReactCommunicator",
            "SetAvatar",
            JSON.stringify({
              hair: hairItem,
              face: item,
              top: topItem,
              bottom: bottomItem,
              shoes: shoesItem,
            })
          )
        );
        break;
      case TopList:
        setTopItem(
          item,
          sendMessage(
            "ReactCommunicator",
            "SetAvatar",
            JSON.stringify({
              hair: hairItem,
              face: faceItem,
              top: item,
              bottom: bottomItem,
              shoes: shoesItem,
            })
          )
        );
        break;
      case BottomList:
        setBottomItem(
          item,
          sendMessage(
            "ReactCommunicator",
            "SetAvatar",
            JSON.stringify({
              hair: hairItem,
              face: faceItem,
              top: topItem,
              bottom: item,
              shoes: shoesItem,
            })
          )
        );
        break;
      case ShoesList:
        setShoesItem(
          item,
          sendMessage(
            "ReactCommunicator",
            "SetAvatar",
            JSON.stringify({
              hair: hairItem,
              face: faceItem,
              top: topItem,
              bottom: bottomItem,
              shoes: item,
            })
          )
        );
        break;
    }
  };

  return (
    <>
      <LoadingModal open={showLoadingModal} percent={100}></LoadingModal>

      <AvatarWrapper style={{ display: !showLoadingModal ? "flex" : "none" }}>
        <div>
          <img src={Lobby}></img>
        </div>
        <div className="overlay"></div>
        <AvatarFlexModal>
          <SelectModal>
            <h3>전시 관람을 위한 캐릭터를 선택해 주세요.</h3>
            <div className="modalBox">
              <div
                className="modalInBox"
                style={{ backgroundColor: "#d9d9d9" }}
              >
                <Unity
                  unityProvider={unityProvider}
                  style={enter ? fixed : responsive}
                />
              </div>
              <div className="modalInBox itemBox">
                <AvatarCategory>
                  {category.map((item, index) => {
                    if (itemList == item.categoryList) {
                      return (
                        <div
                          key={index}
                          className="categoryActive"
                          onClick={() => {
                            setItemList(item.categoryList);
                          }}
                        >
                          {item.categoryName}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={index}
                          className="category"
                          onClick={() => {
                            setItemList(item.categoryList);
                          }}
                        >
                          {item.categoryName}
                        </div>
                      );
                    }
                  })}
                </AvatarCategory>
                <AvatarItemList>
                  {itemList.map((item, index) => {
                    if (
                      (itemList == HairList && hairItem == item.itemName) ||
                      (itemList == FaceList && faceItem == item.itemName) ||
                      (itemList == TopList && topItem == item.itemName) ||
                      (itemList == BottomList && bottomItem == item.itemName) ||
                      (itemList == ShoesList && shoesItem == item.itemName)
                    ) {
                      return (
                        <SelectedAvatarItem
                          key={index}
                          onClick={() => {
                            selectItem(item.itemName);
                          }}
                        >
                          <img width="100%" src={item.itemUrl}></img>
                        </SelectedAvatarItem>
                      );
                    } else {
                      return (
                        <AvatarItem
                          key={index}
                          onClick={() => {
                            selectItem(item.itemName);
                          }}
                        >
                          <img width="100%" src={item.itemUrl}></img>
                        </AvatarItem>
                      );
                    }
                  })}
                </AvatarItemList>
              </div>
            </div>
          </SelectModal>
          {!enter && (
            <NickNameModal>
              <input
                placeholder="닉네임을 입력해 주세요."
                value={name}
                onChange={handleInput}
              ></input>
              {!buttonLoading ? (
                <button onClick={sendName}>입력</button>
              ) : (
                <button style={{ background: "rgba(255,255,255,0.9)" }}>
                  <img
                    style={{ width: "60px" }}
                    src={LoadingBtn}
                    alt="loading"
                  ></img>
                </button>
              )}
            </NickNameModal>
          )}
        </AvatarFlexModal>
        <BasicAlertModal open={showBasicAlert} close={toggleBasicAlert}>
          <p>닉네임을 입력해 주세요.</p>
        </BasicAlertModal>
      </AvatarWrapper>
      <HeaderLayOut>
        {layoutType === "LOBBY" && (
          <CircleBtn
            onClick={() => {
              goAnotherScene("EXIT");
            }}
          >
            <img src={ExitBtn} alt="btn"></img>
            <span>나가기</span>
          </CircleBtn>
        )}
        {layoutType === "FUTURE" && (
          <>
            <CircleBtn
              onClick={() => {
                setLoadingMessage("35주년의 발자취관으로 이동 중입니다.");
                setAlertMessage("35주년의 발자취관으로 이동하시겠습니까?");
                toggleAlert();
                setSceneType("PAST");
              }}
            >
              <img src={PastBtn} alt="btn"></img>
              <span>
                35주년<br></br>발자취
              </span>
            </CircleBtn>
            <CircleBtn
              onClick={() => {
                setLoadingMessage("로비로 이동 중입니다.");
                setAlertMessage("로비로 이동하시겠습니까?");
                toggleAlert();
                setSceneType("LOBBY");
              }}
            >
              <img src={LobbyBtn} alt="btn"></img>
              <p>로비</p>
            </CircleBtn>
          </>
        )}
        {layoutType === "PAST" && (
          <>
            <CircleBtn
              onClick={() => {
                setLoadingMessage("35주년관으로 이동 중입니다.");
                setAlertMessage("35주년관으로 이동하시겠습니까?");
                toggleAlert();
                setSceneType("FUTURE");
              }}
            >
              <img src={FutureBtn} alt="btn"></img>
              <span>35주년관</span>
            </CircleBtn>
            <CircleBtn
              onClick={() => {
                setLoadingMessage("로비로 이동 중입니다.");
                setAlertMessage("로비로 이동하시겠습니까?");
                toggleAlert();
                setSceneType("LOBBY");
              }}
            >
              <img src={LobbyBtn} alt="btn"></img>
              <p>로비</p>
            </CircleBtn>
          </>
        )}
      </HeaderLayOut>
      {layoutType !== "NONE" && (
        <FooterLayOut>
          <FooterCenter>
            <ActionBtnBox>
              <ActionBtn onClick={handleHello}>
                {!greeting ? (
                  <>
                    <img src={HelloBtn} alt="btn"></img>
                    <p>안녕</p>
                  </>
                ) : (
                  <>
                    <img src={ActiveHelloBtn} alt="btn"></img>
                    <p style={{ color: "#F6A901" }}>안녕</p>
                  </>
                )}
              </ActionBtn>
              <ActionBtn onClick={handleRun}>
                {!running ? (
                  <>
                    <img src={RunBtn} alt="btn"></img>
                    <p>달리기</p>
                  </>
                ) : (
                  <>
                    <img src={ActiveRunBtn} alt="btn"></img>
                    <p style={{ color: "#F6A901" }}>달리기</p>
                  </>
                )}
              </ActionBtn>
            </ActionBtnBox>
          </FooterCenter>
          <FooterRight>
            <CircleBtn onClick={handleBoardModal}>
              <img src={BoardBtn} alt="btn" style={{ marginLeft: "8px" }}></img>
              <span>방명록</span>
            </CircleBtn>
            <CircleBtn onClick={handleTutorialModal}>
              <img src={TutorialBtn} alt="btn"></img>
              <span>관람방법</span>
            </CircleBtn>
          </FooterRight>
        </FooterLayOut>
      )}
      <LoadingModal
        open={showLoadingModal}
        percent={loadingPercentage}
        loadingMessage={loadingMessage}
        step={loadingStep}
      ></LoadingModal>
      <BoardModal
        open={showBoardModal}
        nickName={name}
        close={handleBoardModal}
        func={() => window.location.reload()}
      ></BoardModal>
      <TutorialModal
        open={showTutorialModal}
        close={handleTutorialModal}
      ></TutorialModal>
      <MovingAlertModal
        open={showAlert}
        close={toggleAlert}
        func={() => {
          goAnotherScene(sceneType);
          toggleAlert();
        }}
      >
        <p>{alertMessage}</p>
      </MovingAlertModal>
      <BasicAlertModal
        open={showBasicAlert}
        close={toggleBasicAlert}
        type={basicAlertType}
      >
        <p style={{ whiteSpace: "pre-wrap" }}>{basicAlertMessage}</p>
      </BasicAlertModal>
    </>
  );
};

export default Avatar;

const responsive = { width: "100%", height: "100%" };
const fixed = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100vh",
};

const AvatarWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  top: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  align-content: center;
  overflow: hidden;
  & > .overlay {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
  }
  & > div > img {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AvatarFlexModal = styled.div`
  display: flex;
  width: 980px;
  min-height: 700px;
  max-height: 760px;
  height: 80%;
  /* align-items: ; */
  flex-wrap: wrap;
`;

const SelectModal = styled.div`
  /* width: 980px; */
  width: 100%;
  height: 613px;
  border-radius: 18px;
  background: #fff;
  z-index: 20;
  padding: 0 30px;
  & > h3 {
    color: #000;
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    padding: 25px 0 15px 0;
  }
  & > .modalBox {
    display: flex;
    justify-content: space-between;
  }
  & > .modalBox > .modalInBox {
    width: 450px;
    height: 500px;
    border-radius: 8px;
    border: 1px solid #d9d9d9;
    overflow: hidden;
  }
  & > .modalBox > .itemBox {
    padding: 28px 0;
  }
`;

const NickNameModal = styled.div`
  width: 100%;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  & > input {
    width: 500px;
    height: 60px;
    border-radius: 8px;
    border: 1px solid rgba(102, 102, 102, 0.8);
    background: #fff;
    color: #000;
    font-size: 20px;
    font-weight: 500;
    padding: 15px 30px;
    margin-right: 18px;
  }
  & > input:focus {
    outline: 2px solid #231916;
  }
  & > button {
    width: 140px;
    height: 60px;
    border-radius: 30px;
    background: #231916;
    color: #fff;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    line-height: 22px;
    cursor: pointer;
  }
`;

const AvatarCategory = styled.div`
  display: flex;
  justify-content: space-between;
  & > div {
    width: 98px;
    text-align: center;
    padding-bottom: 9px;
    cursor: pointer;
  }
  & > .category {
    color: #9e9e9e;
    border-bottom: 1px solid #e6e6e6;
  }
  & > .categoryActive {
    color: #f6a901;
    font-weight: 700;
    border-bottom: 2px solid #f6a901;
  }
`;

const AvatarItemList = styled.div`
  padding: 30px;
  height: 448px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0px, 1fr));
  align-content: flex-start;
  gap: 22px;
  overflow-y: scroll;
  /* 수직 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    width: 11px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d9d9d9; /* 스크롤바 썸의 배경색을 투명으로 설정합니다. */
    border-radius: 10px;
    background-clip: padding-box;
    border: 4px solid transparent;
  }
`;
const SelectedAvatarItem = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  border: 2px solid #f6a901;
  cursor: pointer;
`;
const AvatarItem = styled.div`
  border: 2px solid #fff;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  cursor: pointer;
`;

const HeaderLayOut = styled.div`
  position: fixed;
  top: 2.6%;
  right: 2.6%;
  display: flex;
`;

const FooterLayOut = styled.div``;
const FooterCenter = styled.div`
  position: fixed;
  bottom: 2.6%;
  left: 50%;
  transform: translateX(-50%);
`;

const FooterRight = styled.div`
  position: fixed;
  bottom: 2.6%;
  right: 2.6%;
  display: flex;
`;

const ActionBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 232px;
  height: 80px;
  /* border: 1px solid #362f2f; */
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 13px;
  padding: 10px 0;
`;

const ActionBtn = styled.div`
  width: 50%;
  color: #413434;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:first-child {
    border-right: 1px solid rgba(0, 0, 0, 0.5);
  }
`;

const CircleBtn = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  width: 80px;
  height: 80px;
  color: #362f2f;
  /* border: 1px solid #362f2f; */
  border-radius: 50%;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 1.875rem;
  cursor: pointer;
  transition: 0.3s;
  z-index: 300;
  & > img {
    display: inline;
  }
  & > span {
    text-align: center;
    line-height: 16px;
  }
  & > p {
    display: block;
    text-align: center;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;
