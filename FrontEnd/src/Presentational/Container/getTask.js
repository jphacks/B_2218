import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Thread from "../Atoms/Thread";
import Voice from "./Voice";
import firebase from 'firebase/compat/app';
import { collection, query, where, getDocs, orderBy, startAt, endAt } from "firebase/firestore";

import tyotto from "../../assets/Voice/tyottoomati.wav";
import gomesippai from "../../assets/Voice/gomen-sippai.wav";
import ganbare from "../../assets/Voice/ganbare.wav"


const baseURL = "https://pacific-earth-33925.herokuapp.com/date/";

const user = {uid:"test451046test", email:"test4510471@ganbare.co.nl"}

const GetTask = (props) => {
  const Mtyotto = new Audio(tyotto);
  const Mgomen = new Audio(gomesippai);
  const Mganbare = new Audio(ganbare);


  const [display, setDisplay] = useState(1)
  const [getDay, setGetDay] = useState(null)
  const [contents,setContents] = useState([])
  const [getFlag, setGetFlag] = useState(0)


  const setDay = (result) => {
    setGetDay(result)
  }

  useEffect(() => {
    (async() => {
      if(getDay != null){
        Mtyotto.play()
        console.log(getDay)
        let answer = await axios.post(baseURL, {
          text: getDay
        })
        console.log(answer)
        console.log(answer.data)

        try{
          let day = answer.data
          day = new Date(day)
          let start = new Date(day)    
          let stop = new Date(day)    
          console.log(day)//error検出

          let M = String(day.getMonth())
          console.log(M)//error検出


          start.setHours(0, 0, 0, 0)
          console.log(start)//error検出

          stop.setDate(stop.getDate() + 7)
          stop.setHours(0, 0, 0, 0)
          console.log(stop)//error検出

          start = firebase.firestore.Timestamp.fromDate(start)
          stop = firebase.firestore.Timestamp.fromDate(stop)
          console.log(start)//error検出
          console.log(stop)//error検出

          const db = firebase.firestore();
          const q = query(collection(db, props.user.uid ,M,"tasks"), 
            orderBy('limit'),
            startAt(start),
            endAt(stop)
          );

          const userSnapshot = await getDocs(q);
          userSnapshot.forEach(doc => {
            contents.push(doc.data())
          })

          setGetFlag(1) 
          setGetDay(null)


        }catch(e){
          console.log(e.message);
          console.log("諦めんな")
          Mgomen.play()
          setDisplay(0)
          setGetDay(null)
        }
      }else{
        console.log("こちら")
         setDisplay(0)
         setGetDay(null)
      }
      
       
    })()
  },[getDay])

  useEffect(() => {
    if(getFlag === 1){
      setDisplay(1)
      Mganbare.play()
    }

  },[getFlag])

  
  return(
    <>
    { // マイク
      display === 0 && 
        <Voice setFun={setDay}/>
    }
    {
      display === 1 && 
        <Thread data={contents} type="tsk"/>
    }

    </>
  )
}

export default GetTask;