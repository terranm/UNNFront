import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import Avatar from "pages/avatar/Avatar";
import Page404 from "pages/page404/Page404";
import GlobalStyle from "styles/GlobalStyle";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/exhibition" element={<Avatar />}></Route>
        <Route path="/*" element={<Page404></Page404>} />
      </Routes>
    </>
  );
};

export default App;
