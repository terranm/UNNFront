import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import footerLogo from "assets/images/footer_logo.png";
import internetNewsGroup from "assets/images/internet_news_group.png";
import IKUC from "assets/images/ikuc.png";
import Summit from "assets/images/summit.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 839px)" });

  const unnUrl = "https://news.unn.net/com";

  const footerMenu = [
    { id: 1, name: "매체소개", url: `${unnUrl}/com-10.html` },
    { id: 2, name: "윤리강령", url: `${unnUrl}/ethics.html` },
    { id: 3, name: "광고센터", url: `${unnUrl}/com-6-1.html` },
    { id: 4, name: "기사제보", url: `${unnUrl}/jb.html` },
    { id: 5, name: "불편신고", url: `${unnUrl}/bp.html` },
    { id: 6, name: "제휴안내", url: `${unnUrl}/jh.html` },
    { id: 7, name: "이용약관", url: `${unnUrl}/service.html` },
    {
      id: 8,
      name: "개인정보처리방침",
      url: `${unnUrl}/privacy.html`,
    },
    {
      id: 9,
      name: "청소년보호정책",
      url: `${unnUrl}/youthpolicy.html`,
    },
    {
      id: 10,
      name: "저작권보호정책",
      url: `${unnUrl}/copyright.html`,
    },
    {
      id: 11,
      name: "이메일무단수집거부",
      url: `${unnUrl}/emailno.html`,
    },
  ];

  return (
    <FooterWrapper>
      <FooterMenuBar>
        <ul>
          {footerMenu.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                window.open(item.url, "_blank");
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </FooterMenuBar>

      <FooterContent>
        <div className="logoBox">
          <img alt="logo" src={footerLogo}></img>
        </div>
        <div className="pBox">
          <p>
            등록번호 : (주간)서울 다 - 05879 (1988-08-31)｜회장 :
            이인원｜대표이사·발행인 : 홍준｜편집인 : 최용섭｜청소년보호책임자 :
            최용섭
          </p>
          <p>
            대표전화 : 02)2223-5030｜편집국 : 02)2223-5030｜구독문의 :
            02)2223-5050
          </p>
          <p>
            대학광고 : 02)2223-5050｜기업·광고 : 02)2223-5042｜Fax :
            02)2223-5004
          </p>
          <p>
            주소 : 서울특별시 금천구 디지털로 9길 47 한신 IT타워 2차 14층
            (가산동) ㈜한국대학신문
          </p>
          <p>
            Copyright © 1999-2011 ㈜한국대학신문. All rights reserved. mail to
            news@unn.net 02)2223-5004
          </p>
          <div className="familysite">
            Family sites:
            <NavLink
              onClick={() => {
                window.open("http://presidentsummit.org", "_blank");
              }}
            >
              <img alt="unc summit" src={Summit}></img>
            </NavLink>
            <NavLink
              onClick={() => {
                window.open("http://ikuc.org/index.jsp", "_blank");
              }}
            >
              <img alt="ikuc" src={IKUC}></img>
            </NavLink>
          </div>
        </div>
        <div className="internetNewsGroupBox">
          <img alt="logo" src={internetNewsGroup}></img>
        </div>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.div`
  width: 100%;
  background: #f8f8f8;
`;

const FooterMenuBar = styled.li`
  background: #1f2d3b;
  display: flex;
  justify-content: center;
  padding: 17px 0;
  & > ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    max-width: 1000px;
  }
  & > ul > li {
    color: #fff;
    font-size: 13px;
    cursor: pointer;
  }
  & > ul > li:hover {
    text-decoration: underline;
  }
`;

const FooterContent = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 35px 0;
  margin: auto;
  display: flex;
  justify-content: space-between;
  & > .logoBox {
    display: flex;
    align-items: center;
  }
  & > .pBox {
    color: #010101;
    font-weight: 300;
    font-size: 13px;
    letter-spacing: -0.06em;
    line-height: 1.8em;
  }
  & > .pBox > .familysite {
    display: flex;
    align-items: center;
  }
  & > .pBox > .familysite > a {
    margin-left: 5px;
    cursor: pointer;
  }
  & > .internetNewsGroupBox {
    display: flex;
    align-items: end;
  }
`;
