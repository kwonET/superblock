import React from "react";
import { GlobalStyle } from "./style/globalStyle";
import GameFrame from "./components/GameFrame";
import Header from "./components/Header";
import styled from "styled-components";
const App = () => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header />
        <GameFrame />
      </Wrapper>
    </>
  );
};

export default App;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
