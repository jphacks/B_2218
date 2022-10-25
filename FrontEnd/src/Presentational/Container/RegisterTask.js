import React, { useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { addDoc, collection, doc} from "firebase/firestore";
import Voice from "../Container/Voice";
import tyotto from "../../assets/Voice/tyottoomati.wav";
import ikakaga from "../../assets/Voice/ikakaga.wav";
import dehakotirade from "../../assets/Voice/dehakotirade.wav";
import mouitido from "../../assets/Voice/mouitido.wav";
import kadai from "../../assets/Voice/kadai.wav"
import ganbare from "../../assets/Voice/ganbare.wav"
import { getNowDate,getNowTime,msecToTime,normalizYear } from "../../Helpers/dateOperation";
import CommonBtn from "../Atoms/CommonBtn";

const baseURL = "https://pacific-earth-33925.herokuapp.com/plans/";

const db = firebase.firestore();
const RegisterTask = (props) => {
  const Mtyotto = new Audio(tyotto);
  const Mikakag = new Audio(ikakaga);
  const Mdehakotirade = new Audio(dehakotirade);
  const Mmouitido = new Audio(mouitido);
  const Mkadai = new Audio(kadai);
  const Mganbare = new Audio(ganbare);

  //state管理
  const [display, setDisplay] = useState(0)
  const [tText, setTtext] = useState(null)
  const [task, setTask] = useState(null)
  const [showTask, setShowTask] = useState(null)

  const setText = (result) => {
    setTtext(result)
  }

  useEffect(() => {
    (async() => {
  
    if(tText !== null){
      Mtyotto.play()
      let answer = await axios.post(baseURL, {
        text: tText
      })

     // try{
        let data = answer.data
        let limitTime = data[2][0]
        console.log(data[2][0])

        if(limitTime === null){
          throw new Error('limitTimeNone');
          
        }else{
          limitTime = new Date(data[2][0])
          limitTime = normalizYear(limitTime)
        }

        setTask({
          title: data[0],
          limit: limitTime,
          range: data[2][2]
        })

    // }catch{

    //   console.log(answer)
    //   console.error();
    //   Mgomesippai.play()
    //   setTimeout(Mmouitido.play,3000)
    //   setDisplay(1)
    //   setOneNum(0)
    //   setVText0(null)
      
    // }
      
    }

  })()
  },[tText])

  useEffect(() => {
    if(task !== null){
      let preLimit = task.limit;
      console.log(preLimit)
      let Lday = getNowDate(preLimit,'md')
      let Ltime = getNowTime(preLimit,'')
      console.log(task.range)
      let limit = Lday + '/' +Ltime

      let range = msecToTime(task.range)

      setShowTask(
        {
          title: task.title,
          limit: limit
        }
      )
      setDisplay(2)
      Mikakag.play()
    }
  },[task])

  const onOK = async () => {
    Mdehakotirade.play()
    let limitT = task.limit
    let m = String(limitT.getMonth())

    let a =  props.user.uid //仮

    await addDoc(collection(db, a, m, "tasks"), {

      title:task.title,
      limit: task.limit,
      range: task.range

    });
    setTimeout(setDisplay,3000,1) 
    setTtext(null)
    setTimeout(Mganbare.play,3000)
  }

  const onReturn = () => {
    Mmouitido.play()
    setDisplay(0)
  }

  

  return(
    <>
    {
      // マイク
      display === 0 && 
        <Voice setFun={setText}/>
    }
    {
      display === 2 && 
        <SVoiceWrap>
        <SThread>
          { showTask ? (
          <>
        <TNow>確認</TNow>
        <TResult>
          <p>{showTask.title}</p>
          <p>{showTask.limit}</p>
          <p>{showTask.range}</p>
        </TResult>
          </>
          ) : <p>データがありません</p>

          }
        </SThread>
        <SBtnsWrap>
        <CommonBtn text="OK" clickedFun={onOK}/>
        <CommonBtn text="やりなおす" clickedFun={onReturn}/>
        </SBtnsWrap>   
      </SVoiceWrap>
    }
    </>
  )
}


const SBtnsWrap = styled.div`
  display: flex;
  column-gap: 30px;
`;


const SVoiceWrap = styled.div`
  text-align: center;
  margin: auto;
  font-size: large;


`;

const SThread = styled.div`
  text-align: center;
  

`
const TNow = styled.div`

  width: 70%;
  border: solid 1px ;
  background-color: #ffbf8b;
  margin: auto;
  border-radius: 5px;
`

const TResult = styled.div`
  width: 70%;
  height: 150px;
  border: solid 1px;
  background-color: #ffe9d8;
  margin:auto;
  border-radius: 20px;
  padding: 15px;
`

export default RegisterTask;