import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getNowDate, getNowTime } from "../../Helpers/dateOperation";

const Cell = (props) => {
  const [contents, setContens] = useState({});
    
  useEffect(()=>{
    let day = props.contents.start
    let stTime = props.contents.start
    let fnTime = props.contents.finish
    if(day === null){
      let now = new Date()
      day = getNowDate(now,"md")
    }else{
      day = day.toDate()
      day = getNowDate(day,'md')
    }
    if(stTime === null){
      stTime = "開始時間登録無し"
    }else{
      stTime = stTime.toDate()
      console.log(stTime)
      stTime = getNowTime(stTime,'')
      console.log(stTime)
    }
    if(fnTime === null){
      fnTime = "終了時間登録無し"
    }else{
      fnTime = fnTime.toDate()
      console.log(fnTime)
      fnTime = getNowTime(fnTime,'')
      console.log(fnTime)
    }
    if(stTime === "noDate"){
      stTime = "開始時間登録無し"
    }
    if(fnTime === 'noDate'){
      fnTime = "終了時間登録無し"
    }
    setContens({
      title:props.contents.title,
      date: day,
      start: stTime,
      finish: fnTime,
      location:props.contents.location,
    })
  },[])
  return(

        <tr>
          <STh>{contents.title}</STh>
          <STdF>{contents.date}</STdF>
          <STd>{contents.start}</STd>
          <STd>{contents.finish}</STd>
          <STd>{contents.location}</STd>
          <SId>{props.id}</SId>
        </tr>
    
  )
}

const STh = styled.th`
  vertical-align: middle;
  height: 10px;
  width: 50px; 
  border-right: solid 1px #666;
  margin: 0;
  text-align: center;
  color: #333;
  font-size: 14px;
  font-weight: bold;
`
const STdF = styled.td`
  padding: 0 0 0 10px;
  margin: 0;
  height: 10px;
  width: 30px;
  border: none;
  color: #666;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;

`

const STd = styled.td`
  padding:  0px 3px;
  margin: 0;
  height: 53px;
  width: 30px;
  border: none;
  color: #666;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
`;

const Btd = styled.td`
  height: 1px;
  width: 100%;
  border-top: solid 1px #34495e;
`;

const SId = styled.td`
  padding:0;
  margin: 0;
  height: 53px;
  width: 30px;
  border: none;
  color: red;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
`



export default Cell;