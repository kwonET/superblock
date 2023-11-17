import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { frameSizeSelect } from "../atoms/selector";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();
  const [frameSize, setFrameSize] = useState(3);
  const setFrameSizeSelect = useSetRecoilState(frameSizeSelect);
  const handleOnChange = (e) => {
    setFrameSizeSelect(e.target.value);
  };
  const handleOnClick = () => {
    // setFrameSizeSelect(frameSize);
    navigate(`/game`);
    window.location.reload();
  };
  return (
    <Wrapper>
      <Title>격자 크기를 입력하세요</Title>
      <Input onChange={(e) => handleOnChange(e)} type="number"></Input>
      <Button onClick={handleOnClick}>게임 시작</Button>
    </Wrapper>
  );
};

export default Start;
const Wrapper = styled.div``;
const Input = styled.input``;
const Title = styled.h1``;
const Button = styled.button``;
