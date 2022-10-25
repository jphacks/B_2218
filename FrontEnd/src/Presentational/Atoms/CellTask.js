import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getNowDate, getNowTime } from "../../Helpers/dateOperation";

const Cell = (props) => {
  const [contents, setContens] = useState({});
    
  useEffect(()=>{
    let day = props.contents.limit
    let time = props.contents.limit

    day = day.toDate()
    day = getNowDate(day,'md')
  
   
    time = time.toDate()
    console.log(time)
    time = getNowTime(time,'')
    console.log(time)

    const limit = day + "/" + time

    setContens({
      title:props.contents.title,
      limit:limit
    })
  },[])
  return(

        <tr>
          <STh>{contents.title}</STh>
          <STd>{contents.limit}</STd>
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
  width: 60px;
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