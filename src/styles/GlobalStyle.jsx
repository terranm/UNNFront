import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap");

html {
  font-size: 16px;
}
body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body,
th,
td,
input,
select,
textarea,
button {
  font-family: "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic",
    "맑은 고딕", "돋움", dotum, sans-serif;
  box-sizing: border-box;
  margin: 0;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

ul {
  list-style: none;
  padding-left: 0px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

ul.pagination li {
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 1px solid var(--cui-border-color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}

ul.pagination li:first-child {
  border-radius: 5px 0 0 5px;
}

ul.pagination li:last-child {
  border-radius: 0 5px 5px 0;
}

ul.pagination li a {
  text-decoration: none;
  color: #666666;
  font-size: 16px;
}

ul.pagination li.active a {
  color: #6c5ce7;
}

ul.pagination li a:hover,
ul.pagination li a.active {
  color: blue;
}

.page-selection {
  width: 48px;
  height: 30px;
  color: #321fdb;
}

a,
a:link,
a:visited {
  text-decoration: none;
}
a:active,
a:hover {
  text-decoration: none;
}

button {
  border: none;
  background: none;
}

#naverIdLogin > a {
  display: none;
}

#file,
#thumbfile,
#clfile,
#mainfile,
#subfile {
  display: none;
}

.active {
  font-weight: 700;
  font-size: 18px;
  color: #6c5ce7 !important;
}

textarea {
  resize: none;
}

.itemNull {
  margin-top: 100px;
  font-size: 18px;
  color: #666666;
  padding-bottom: 300px;
  text-align: center;
}

iframe {
  background: transparent;
}

.Contents {
  padding-top: 80px;
  transition: 0.5s;
}

/* 수직 스크롤바 숨기기 */
.infinite-scroll-component::-webkit-scrollbar {
  /* width: 0.5em; */
  width: 3px;
}

.infinite-scroll-component::-webkit-scrollbar-track {
  background-color: transparent; /* 스크롤바 트랙의 배경색을 투명으로 설정합니다. */
}

.infinite-scroll-component::-webkit-scrollbar-thumb {
  background-color: #d9d9d9; /* 스크롤바 썸의 배경색을 투명으로 설정합니다. */
  border-radius: 15px;
}

@media (max-width: 1200px) {
  .Contents {
    padding-top: 60px;
    transition: 0.5s;
  }
}

`;

export default GlobalStyle;
