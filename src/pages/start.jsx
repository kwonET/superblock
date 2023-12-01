import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import GameFrame from "../components/GameFrame";
import Header from "../components/Header";

const Start = () => {
  const [initFrameSize, setinitFrameSize] = useState(3);
  const [isStart, setIsStart] = useState(false);
  // const [frameSize, setFrameSizeSelect] = useRecoilState(frameSizeSelect);
  const handleOnChange = (e) => {
    const fs = e.target.value;
    setinitFrameSize(Number(fs));
  };
  const handleOnClick = () => {
    setIsStart(true);
  };
  // useEffect(() => {
  //   console.log(initFrameSize);
  // }, [initFrameSize]);
  return (
    <Wrapper>
      <Header />
      {isStart ? (
        <GameFrame frameSize={initFrameSize} />
      ) : (
        <Section>
          <Title>격자 크기를 입력하세요</Title>
          <Input onChange={(e) => handleOnChange(e)} type="number"></Input>
          <Button onClick={handleOnClick}>게임 시작</Button>
        </Section>
      )}
    </Wrapper>
  );
};

export default Start;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Section = styled.div``;
const Input = styled.input``;
const Title = styled.h1``;
const Button = styled.button``;
