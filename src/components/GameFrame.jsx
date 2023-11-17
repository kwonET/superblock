import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { BalloonImage } from "../assets";
import { randomBalloonList } from "../utils";
const GameFrame = () => {
  const [frameSize, setFrameSize] = useState(9);
  const [balloonList, setBalloonList] = useState(randomBalloonList(frameSize)); //랜덤으로 배치된 풍선의 위치 리스트
  const [popList, setPopList] = useState([]);

  useEffect(() => {
    // setBalloonList(randomBalloonList(frameSize));
    console.log(balloonList);
  }, [frameSize]);

  const popBalloons = (index) => {
    setPopList([
      index - 1,
      index,
      index + 1,
      index - 1 - frameSize,
      index - frameSize,
      index + 1 - frameSize,
      index - 1 + frameSize,
      index + frameSize,
      index + 1 + frameSize,
    ]);
  };

  useEffect(() => {
    console.log("pop", popList);
    popList.forEach((pop) => {
      if (balloonList.includes(pop)) {
        setBalloonList(balloonList.splice(pop, 1));
      }
    });
  }, [popList]);

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
