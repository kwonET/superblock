import React from "react";
import styled from "styled-components";
const frameSize = 3;
const GameFrame = () => {
  return (
    <FrameSection style={{ gridTemplateColumns: `repeat(${frameSize}, 1fr)` }}>
      {Array(frameSize * frameSize).fill(
        <Frame
          style={{
            width: `${90 / frameSize}rem`,
            height: `${90 / frameSize}rem`,
          }}
        />
      )}
    </FrameSection>
  );
};

export default GameFrame;

const FrameSection = styled.div`
  width: 90rem;
  height: 90rem;
  display: grid;
`;
const Frame = styled.div`
  /* width: 30rem;
  height: 30rem; */
  border: 0.1rem solid;
`;
