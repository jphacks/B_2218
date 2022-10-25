import React from "react";
import styled from "styled-components";


const CommonBtn = (props) => {
    return <SCommonBtn onClick={props.clickedFun}>{props.text}</SCommonBtn>;
  };
  
  const SCommonBtn = styled.button`
  height: 32px;
  width: 140px;
  /* margin: 0px; */
  padding-top: 5px;
  font-family: "Volkhov";
  font-style: italic;
  font-weight: 700;
  font-size: 15px;
  line-height: 23px;
  border-radius: 15px;
  text-align: center;
  letter-spacing: 1.5px;
  font-feature-settings: "kern" off;
  color: #ffffff;
  border: none;
  outline: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
  display: inline-block;
  background-color: orange;
  text-align: center;
  box-shadow: 0px 2px 0px 0px #DB8D00;
  transition: 0.2s;
   &:hover { 
    cursor: pointer;
   
  } 
  &:active {
    /* margin-left: 4px; */
    margin-top: 2px;
    box-shadow: none;
   
  }
`;
export default CommonBtn;