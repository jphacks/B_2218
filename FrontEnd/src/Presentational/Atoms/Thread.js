import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Cell from "./Cell";
import CellConfirm from "./CellConfirm";
import CellTask from "./CellTask";


const Thread = (props) => {
  

  // const data = [
  //   {title:'学校',
  //    location:'',
  //    start: new Date("2022/10/23 6:00"),
  //    finish: new Date("2022/10/23 12:00"),
  //    range: ''
  //   },
  //   {title:'ファミマでバイト',
  //    location:'',
  //    start: new Date("2022/10/23 6:00"),
  //    finish: new Date("2022/10/23 12:00"),
  //    range: ''
  //   },
  //   {title:'友達と飲み会',
  //    location:'',
  //    start: new Date("2022/10/23 6:00"),
  //    finish: new Date("2022/10/23 12:00"),
  //    range: ''
  //   },
  //   {title:'満塁ホームラン',
  //    location:'',
  //    start: new Date("2022/10/23 6:00"),
  //    finish: new Date("2022/10/23 12:00"),
  //    range: ''
  //   },
  //   {title:'学校',
  //    location:'',
  //    start: new Date("2022/10/23 6:00"),
  //    finish: new Date("2022/10/23 12:00"),
  //    range: ''
  //   },
  //   {title:'ファミマでバイト',
  //    location:'',
  //    start: new Date("2022/10/23 6:00"),
  //    finish: new Date("2022/10/23 12:00"),
  //    range: ''
  //   },
  //   {title:'友達と飲み会',
  //    location:'',
  //    start: new Date("2022/10/23 6:00"),
  //    finish: new Date("2022/10/23 12:00"),
  //    range: ''
  //   },
  //   {title:'満塁ホームラン',
  //    location:'',
  //    start: new Date("2022/10/23 6:00"),
  //    finish: new Date("2022/10/23 12:00"),
  //    range: ''
  //   }
  // ]

  const items = [];
  if(props.type === "sc"){
    for(let i = 0; i < props.data.length; i++){
      items.push(<Cell key={i} id={i} contents={props.data[i]}/>)
    }

  }
  if(props.type === "tsk"){
    for(let i = 0; i < props.data.length; i++){
      items.push(<CellTask key={i} id={i} contents={props.data[i]}/>)
    }
  }
  if(props.type === "con"){
    for(let i = 0; i < props.data.length; i++){
      items.push(<CellConfirm key={i} id={i} contents={props.data[i]}/>)
    }
  }
  


  return(
    <STable>
      <tbody>
        {items}     
      </tbody>
    </STable>
  )
}

const STable = styled.table`
  margin: 0 auto;
  width: 290px;
  border: none;
  border-top: solid 1px #666;
  border-bottom: solid 1px #666;
  border-collapse: separate;
  border-spacing: 0 10px;
  background: #f5f5f5;
`



export default Thread;