import React from "react";
import { GlobalStyle } from "./style/globalStyle";
import { RecoilRoot } from "recoil";

import Router from "./Router";
const App = () => {
  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <Router />
      </RecoilRoot>
    </>
  );
};

export default App;
