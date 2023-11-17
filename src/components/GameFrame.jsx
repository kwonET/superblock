import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BalloonImage } from "../assets";
import { randomBalloonList, runDFS, findDFS, getPriority } from "../utils";
import { useRecoilValue } from "recoil";
import { frameSizeSelect } from "../atoms/selector";

const GameFrame = () => {
  // const getframeSizeSelect = useRecoilValue(frameSizeSelect);
  // const [frameSize, setFrameSize] = useState(getframeSizeSelect);
  const [frameSize, setFrameSize] = useState(5);
  const [balloonList, setBalloonList] = useState([]); //랜덤으로 배치된 풍선의 위치 리스트
  const [priority, setPriority] = useState(1);
  runDFS(frameSize, randomBalloonList(frameSize));

  /**
   * popBalloons : 풍선을 클릭하면 실행되는 함수, balloonList를 dfs에 기반하여 업데이트한다.
   */
  const popBalloons = (index) => {
    if (
      priority == getPriority(Math.floor(index / frameSize), index % frameSize)
    ) {
      const linkedElement = findDFS(
        Math.floor(index / frameSize),
        index % frameSize
      ); // 연결되어 터지게 되는 풍선 리스트 (2d 형태)
      const newArray = [...balloonList];
      for (let i = 0; i < linkedElement.length; i++) {
        newArray[linkedElement[i][0] * frameSize + linkedElement[i][1]] = 0;
      }
      setBalloonList(newArray);
      setPriority(priority + 1);
    } else {
      alert("게임 실패!");
    }
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
