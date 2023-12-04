import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "components/loading/Loading";
import XButton from "assets/images/x_button.png";
import AlertModal from "../alertmodal/AlertModal";

const BoardModal = ({ open, nickName, close }) => {
  const [boardList, setBoardList] = useState([]);
  const [more, setMore] = useState(true);
  const [answer, setAnswer] = useState("");
  const [lastId, setLastId] = useState("");
  const scrollRef = useRef();
  const outside = useRef();
  const [showAlert, setShowAlert] = useState(false);
  const toggleAlert = () => {
    setShowAlert((prev) => !prev);
  };

  useEffect(() => {
    getBoardList();
  }, []);

  const getBoardList = async (lastId) => {
    try {
      const res = await axios.post(`/v1/board/list`, {
        lastId: lastId,
        length: 10,
      });

      console.log(res);

      if (res.data.resultCode == "0000") {
        const boardArray = res.data.result.lists;

        if (boardArray.length > 0) {
          setBoardList((boardList) => boardList.concat(boardArray));
          setLastId(boardArray[boardArray.length - 1].id);
          if (boardArray[boardArray.length - 1].id == 1) {
            setMore(false);
          }
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      } else {
        alert(res.data.resultMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const writeBoard = async () => {
    try {
      const res = await axios.post(`/v1/board`, {
        nickname: nickName ? nickName : "용감한 파인애플",
        content: answer,
      });

      console.log(res);

      if (res.data.resultCode == "0000") {
        console.log(res);
        setLastId("");
        setBoardList([]);
        getBoardList("");
        setAnswer("");
        toggleAlert();
      } else {
        alert(res.data.resultMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleTextArea = (e) => {
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.substring(0, 200);
    }
    setAnswer(e.target.value);
  };

  function formatDate(inputDate) {
    // 입력된 문자열을 날짜 객체로 변환
    const date = new Date(inputDate);

    // 월, 일, 시간, 분 정보 추출
    const year = date.getFullYear() % 100; // 연도에서 끝 두 자리만 추출
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
    const day = date.getDate();
    const dayOfWeek = date.toLocaleDateString("ko-KR", { weekday: "short" });
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // 날짜와 시간을 원하는 형식으로 조합
    const formattedDate = `${year.toString().padStart(2, "0")}.${month
      .toString()
      .padStart(2, "0")}.${day
      .toString()
      .padStart(2, "0")} (${dayOfWeek}) ${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    return formattedDate;
  }

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
        {/* 닫기버튼 */}
        <button
          style={{ zIndex: "10" }}
          className="close"
          onClick={() => {
            close();
            console.log("닫기");
          }}
        >
          <img alt="btn" src={XButton}></img>
        </button>
        <ModalHeader>
          <h3>방명록</h3>
        </ModalHeader>
        <ModalBody>
          <BoardListBox style={scrollContainerStyle} ref={scrollRef}>
            <InfiniteScroll
              style={{ paddingRight: "10px" }}
              height={388}
              dataLength={boardList.length}
              next={() => getBoardList(lastId)}
              scrollableTarget="scrollableDiv"
              hasMore={more}
              loader={<Loading></Loading>}
              endMessage={
                <p style={{ textAlign: "center", color: "white" }}>
                  <b>마지막 페이지입니다</b>
                </p>
              }
            >
              {boardList &&
                boardList.map((item, i) => (
                  <BoardList key={i}>
                    <div className="title">
                      <h4>{item.nickname}</h4>
                      <p>{formatDate(item.created_time)}</p>
                    </div>
                    <div>{item.content}</div>
                  </BoardList>
                ))}
            </InfiniteScroll>
          </BoardListBox>
          <BoardWriteBox>
            <BoardWrite
              placeholder="방명록을 작성해 주세요."
              value={answer}
              maxlength="100"
              onChange={handleTextArea}
            ></BoardWrite>
            <button onClick={toggleAlert}>입력</button>
          </BoardWriteBox>
        </ModalBody>
      </Modal>
      {/* </ModalOutSide> */}
      <AlertModal open={showAlert} close={toggleAlert} func={writeBoard}>
        <p style={{ marginBottom: "5px" }}>방명록을 작성하시겠습니까?</p>
        <span style={{ color: "red" }}>
          *한번 작성한 방명록은<br></br> 수정이 불가합니다.
        </span>
      </AlertModal>
    </>
  );
};

export default BoardModal;

const scrollContainerStyle = {
  overflowY: "scroll", // 수직 스크롤바를 표시
  scrollbarWidth: "none", // Firefox 브라우저에서 스크롤바를 숨기는 속성
  msOverflowStyle: "none", // Internet Explorer에서 스크롤바를 숨기는 속성
};

const modalBgShow = keyframes`
 from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalOutSide = styled.div`
  display: ${(props) => (props.open ? "flex" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  animation: ${modalBgShow} 0.3s;
`;

const Modal = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  width: 80%;
  max-width: 480px;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  padding: 24px 12px;
  position: absolute;
  bottom: 12%;
  right: 2.6%;
  animation: ${modalBgShow} 0.3s;
  & > .close {
    position: absolute;
    top: 14px;
    right: 12px;
    font-size: 30px;
    color: white;
    cursor: pointer;
  }
`;

const ModalHeader = styled.div`
  width: 100%;
  color: white;
  position: relative;
  margin-bottom: 22px;
  & > h3 {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
  }
`;

const ModalBody = styled.div`
  width: 100%;
`;

const BoardListBox = styled.div`
  height: 388px;
  height: 20%;
  margin-right: -10px;
  overflow-y: scroll;
  margin-bottom: 20px;
  /* 수직 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    width: 0.5em;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;

const BoardList = styled.div`
  border-radius: 8px;
  background: rgba(27, 23, 18, 0.8);
  color: white;
  padding: 24px;
  margin-bottom: 12px;
  & > .title {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }
  & > .title > h4 {
    font-size: 16px;
    font-weight: 700;
  }
  & > .title > p {
    font-size: 16px;
    font-weight: 400;
  }
`;

const BoardWrite = styled.textarea`
  width: 100%;
  max-width: 325px;
  height: 68px;
  border-radius: 8px;
  background: white;
  color: black;
  font-size: 16px;
  font-weight: 500;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: rgba(102, 102, 102, 0.4);
  }
  border: none;
`;

const BoardWriteBox = styled.div`
  border-radius: 8px;
  background: white;
  color: black;
  padding: 12px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > button {
    width: 90px;
    height: 40px;
    line-height: 40px;
    border-radius: 8px;
    background: #1b1712;
    color: #fff;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
  }
`;
