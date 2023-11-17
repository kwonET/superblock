import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BalloonImage } from "../assets";
import { randomBalloonList, runDFS, findDFS } from "../utils";
import { useRecoilValue } from "recoil";
import { frameSizeSelect } from "../atoms/selector";

const GameFrame = () => {
  // const getframeSizeSelect = useRecoilValue(frameSizeSelect);
  // const [frameSize, setFrameSize] = useState(getframeSizeSelect);
  const [frameSize, setFrameSize] = useState(5);
  const [balloonList, setBalloonList] = useState([]); //랜덤으로 배치된 풍선의 위치 리스트

  runDFS(frameSize, randomBalloonList(frameSize));
  const popBalloons = (index) => {
    const linkedElement = findDFS(
      Math.floor(index / frameSize),
      index % frameSize
    );
    const newArray = [...balloonList];
    for (let i = 0; i < linkedElement.length; i++) {
      newArray[linkedElement[i][0] * frameSize + linkedElement[i][1]] = 0;
    }
    setBalloonList(newArray);
  };
  useEffect(() => {
    const add2d = [...randomBalloonList(frameSize)];
    let arr = [];
    for (let i = 0; i < frameSize; i++) {
      for (let j = 0; j < frameSize; j++) {
        arr.push(add2d[i][j]);
      }
    }
    setBalloonList(arr);
  }, []);
  return (
    <FrameSection style={{ gridTemplateColumns: `repeat(${frameSize}, 1fr)` }}>
      {balloonList.map((balloon, index) => (
        <Frame
          style={{
            width: `${70 / frameSize}rem`,
            height: `${70 / frameSize}rem`,
          }}
        >
          {balloon ? (
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
