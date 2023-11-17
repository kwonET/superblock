import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BalloonImage } from "../assets";
import { randomBalloonList, findDfs } from "../utils";
import { useRecoilValue } from "recoil";
import { frameSizeSelect } from "../atoms/selector";

const GameFrame = () => {
  // const getframeSizeSelect = useRecoilValue(frameSizeSelect);
  // const [frameSize, setFrameSize] = useState(getframeSizeSelect);
  const [frameSize, setFrameSize] = useState(5);
  const [balloonList, setBalloonList] = useState([]); //랜덤으로 배치된 풍선의 위치 리스트
  console.log(randomBalloonList(frameSize));
  console.log("dfs", findDfs(frameSize, randomBalloonList(frameSize)));

  let frames = Array(frameSize * frameSize).fill(1);
  return (
    <FrameSection style={{ gridTemplateColumns: `repeat(${frameSize}, 1fr)` }}>
      {frames.map((frame, index) => (
        <Frame
          style={{
            width: `${70 / frameSize}rem`,
            height: `${70 / frameSize}rem`,
          }}
        >
          {/* {frame ? (
            <Balloon src={BalloonImage} onClick={() => popBalloons(index)} />
          ) : (
            <></>
          )} */}
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
