import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { BalloonImage } from "../assets";
import { randomBalloonList } from "../utils";
const GameFrame = () => {
  const [frameSize, setFrameSize] = useState(5);
  const [balloonList, setBalloonList] = useState([]);
  useEffect(() => {
    setBalloonList(randomBalloonList(frameSize));
  }, [frameSize]);

  const popBalloons = (index) => {};

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
              <Balloon src={BalloonImage} onClick={() => popBalloons(index)} />
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
