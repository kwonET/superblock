import React from "react";
import { GlobalStyle } from "./style/globalStyle";
import GameFrame from "./components/GameFrame";
import styled from "styled-components";
const App = () => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <GameFrame />
      </Wrapper>
    </>
  );
};

export default App;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
