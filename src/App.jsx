import React from "react";
import styled from "styled-components";
const frameSize = 5;
const App = () => {
  return (
    <Wrapper>
      <FrameSection>{Array(frameSize).fill(<Frame />)}</FrameSection>
    </Wrapper>
  );
};

export default App;
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;
const FrameSection = styled.div`
  width: 80%;
  height: 80%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;
const Frame = styled.div`
  border: 0.1rem solid;
`;
