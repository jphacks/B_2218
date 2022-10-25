import React from "react";
import styled from "styled-components";


const MikeBtn = (props) => {
    return <SMikeBtn onClick={props.clickedFn}>{props.text}</SMikeBtn>;
  };
  
  const SMikeBtn = styled.button`
  height: 100px;
  width: 100px;
  /* margin: 0px; */
  padding-top: 5px;
  font-family: "Volkhov";
  font-style: italic;
  font-weight: 700;
  font-size: 15px;
  line-height: 23px;
  border-radius: 50%;
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
  transition: 0.2s;
   &:hover { 
    cursor: pointer;
   
  } 
  &:active {
    background-color: #DB8D00;
    box-shadow: none;
   
  }
`;
export default MikeBtn;