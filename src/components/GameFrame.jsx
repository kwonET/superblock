import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { BalloonImage } from "../assets";
import { randomBalloonList } from "../utils";
const frameSize = 3;

const GameFrame = () => {
  const balloonList = randomBalloonList(frameSize);

  return (
    <FrameSection style={{ gridTemplateColumns: `repeat(${frameSize}, 1fr)` }}>
      {Array(frameSize * frameSize)
        .fill(null)
        .map((_, index) => (
          <Frame
            style={{
              width: `${70 / frameSize}rem`,
              height: `${70 / frameSize}rem`,
            }}
          >
            {balloonList.includes(index) ? (
              <Balloon src={BalloonImage} />
            ) : (
              <></>
            )}
          </Frame>
        ))}
    </FrameSection>
  );
};

export default GameFrame;

const FrameSection = styled.div`
  width: 70rem;
  height: 70rem;
  display: grid;

  border: 0.05rem solid;
`;
const Frame = styled.div`
  /* width: 30rem;
  height: 30rem; */
  border: 0.05rem solid;
`;
const Balloon = styled.img`
  width: 100%;
  height: 100%;
`;
