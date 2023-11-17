import React from "react";
import GameFrame from "../components/GameFrame";
import Header from "../components/Header";
import styled from "styled-components";
const Game = () => {
  return (
    <Wrapper>
      <Header />
      <GameFrame />
    </Wrapper>
  );
};

export default Game;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
