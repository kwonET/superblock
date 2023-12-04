import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BalloonImage } from "../assets";

const GameFrame = ({ frameSize }) => {
  const [balloonList, setBalloonList] = useState([]); //랜덤으로 배치된 풍선의 위치 리스트
  const [flatBalloonList, setFlatBalloonList] = useState([]);
  const [dfsVisitedArray, setDfsVisitedArray] = useState([]); //방문한 위치를 저장 (x, y)
  const [isDfsVisited, setIsDfsVisited] = useState([]); //각 위치에서 dfs를 돌때마다 저장하는 방문된 위치 리스트
  const [dfsVisitedArraybyPos, setDfsVisitedArraybyPos] = useState({}); // key : 풍선 위치 | value: 풍선에서 상하좌우로 움직여 도달할 수 있는 풍선 칸 위치
  const [priorityArraybyPos, setPriorityArraybyPos] = useState({}); //// key : 풍선 위치 | value : 풍선의 우선순위

  /**
   * 랜덤하게 풍선을 배치하는 부분
   */
  // rand : min ~ max 사이의 랜덤 값 반환
  const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  // randomBalloonList : 랜덤한 풍선 개수에 따라 풍선을 랜덤하게 배치
  const randomBalloonList = (frameSize) => {
    let totalBalloons = Math.floor((frameSize * frameSize) / 2); // 8x8이면, 64/2개의 풍선을 가진다고 가정
    let arr = Array.from(Array(frameSize), () => new Array(frameSize).fill(0));
    let i, j;
    let total = 0;
    while (total < totalBalloons) {
      i = rand(0, frameSize - 1);
      j = rand(0, frameSize - 1);
      if (arr[i][j] == 0) {
        arr[i][j] = 1;
        total++;
      }
    }
    return arr;
  };
  useEffect(() => {
    setBalloonList(randomBalloonList(frameSize));
    runDFS();
  }, [frameSize]);

  useEffect(() => {
    console.log(balloonList);
    setFlatBalloonList([
      balloonList.map((list) =>
        list.map((ele) => {
          ele;
        })
      ),
    ]);
  }, [balloonList]);

  /**
   * DFS 로 순회하는 부분
   */
  //방향 벡터, 상 하 좌 우
  const dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const dfs = (x, y) => {
    isDfsVisited[x][y] = 1;
    setDfsVisitedArray([...dfsVisitedArray, [x, y]]); // dfsarr.push([x, y]);
    for (let i = 0; i < 4; i++) {
      const nx = x + dir[i][0];
      const ny = y + dir[i][1];

      if (nx < 0 || nx >= frameSize || ny < 0 || ny >= frameSize) continue;
      // 방문하지 않은 칸이면서, 풍선이 있는 칸이면 방문
      if (!isDfsVisited[nx][ny] && balloonList[nx][ny] === 1) {
        dfs(nx, ny);
      }
    }
  };

  const visited = Array.from(Array(frameSize), () => Array(frameSize).fill(0));
  // runDFS 함수 :
  // 매개변수 (frameSize : 격자 크기, balloonList : 격자 크기만큼의 배열, 풍선 있는 곳은 1)
  const runDFS = () => {
    setIsDfsVisited(visited);
    for (let i = 0; i < frameSize; i++) {
      for (let j = 0; j < frameSize; j++) {
        if (balloonList[i][j] === 1) {
          setIsDfsVisited(visited);
          setDfsVisitedArray([]); // 전에 방문했던 위치 저장 정보는 초기화
          dfs(i, j);
          setDfsVisitedArraybyPos((current) => {
            let newObject = { ...current };
            newObject[(i, j)] = dfsVisitedArray;
            return newObject;
          });
          // prioritydfs[[i, j]] = dfsarr.length;
        }
      }
    }
    console.log("totaldfs : ", dfsVisitedArraybyPos);
    // prioritydfs = transformAndSort(prioritydfs);
  };

  /**
   * popBalloons : 풍선을 클릭하면 실행되는 함수, balloonList를 dfs에 기반하여 업데이트한다.
   */
  // const popBalloons = (index) => {
  //   const linkedElement = findDFS(
  //     Math.floor(index / frameSize),
  //     index % frameSize
  //   ); // 연결되어 터지게 되는 풍선 리스트 (2d 형태)
  //   const newArray = [...balloonList];
  //   for (let i = 0; i < linkedElement.length; i++) {
  //     newArray[linkedElement[i][0] * frameSize + linkedElement[i][1]] = 0;
  //   }
  //   setBalloonList(newArray);

  //   if (
  //     priority == getPriority(Math.floor(index / frameSize), index % frameSize)
  //   ) {
  //     const linkedElement = findDFS(
  //       Math.floor(index / frameSize),
  //       index % frameSize
  //     ); // 연결되어 터지게 되는 풍선 리스트 (2d 형태)
  //     const newArray = [...balloonList];
  //     for (let i = 0; i < linkedElement.length; i++) {
  //       newArray[linkedElement[i][0] * frameSize + linkedElement[i][1]] = 0;
  //     }
  //     setBalloonList(newArray);
  //     setPriority(priority + 1);
  //   } else {
  //     alert("패배!");
  //   }
  // };

  return (
    <FrameSection style={{ gridTemplateColumns: `repeat(${frameSize}, 1fr)` }}>
      {flatBalloonList?.map((balloon, index) => (
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
