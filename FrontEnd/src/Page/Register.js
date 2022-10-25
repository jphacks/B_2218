import React, { useEffect, useState} from "react";
import { getAuth } from "firebase/auth";
import styled from "styled-components";
import {getApi} from "../Helpers/getApi"
import axios from "axios";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import yoteiOsiete from "../../assets/Voice/yoteiOsiete.wav"
import mouitido from "../../assets/Voice/mouitido.wav"
import tyotto from "../../assets/Voice/tyottoomati.wav"
import ikakaga from "../../assets/Voice/ikakaga.wav"
import dehakotirade from "../../assets/Voice/dehakotirade.wav"
import kadai from "../../assets/Voice/kadai.wav"
import ganbare from "../../assets/Voice/ganbare.wav"
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { scryRenderedDOMComponentsWithClass } from "react-dom/test-utils";


const baseURL = "http://localhost:8000/plans/";

const firebaseConfig = {
  apiKey: "AIzaSyASN8wpBuqCJHojcr096iY4Vc6xMmpXqxk",
  authDomain: "jphacks-aca6b.firebaseapp.com",
  projectId: "jphacks-aca6b",
  storageBucket: "jphacks-aca6b.appspot.com",
  messagingSenderId: "591589440467",
  appId: "1:591589440467:web:fbd5737f118e3e6d290d26"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const Register = (props) => {
  //音声ファイル読み込み
  const MyoteiOsiete = new Audio(yoteiOsiete);
  const Mmouitido = new Audio(mouitido);
  const Mtyotto = new Audio(tyotto);
  const Mikakag = new Audio(ikakaga);
  const Mdehakotirade = new Audio(dehakotirade);
  const Mkadai = new Audio(kadai);
  const Mganbare = new Audio(ganbare);
  
  const [result, setResult] = useState("")
  const [display, setDisplay] = useState(0)
  const {mike, setMike} = useState(true)
  //予定登録
  const [oneNum, setOneNum] = useState(0)
  const [planOne, setPlanOne] = useState(null)
  //課題登録
  const [taskNum, setTaskNum] = useState(0)
  const [task, setTask] = useState(null)

  useEffect(() => {

  },[])


  //最初のボタンで一つずつを選択
  const onOne = () => {
    setOneNum(1)
    MyoteiOsiete.play();
    setTimeout(setDisplay(1),3000)
  }

  useEffect(() => {
    (async() => {
    if(oneNum === 1 && taskNum === 0){
      Mtyotto.play()
      //setMike(false)
      let i = 0
      console.log(result)
      let answer = await axios.post(baseURL, {
        text: result
      })
      
     let data = answer.data
     console.log(data)
      
      setPlanOne({
        title:data[0],
        location:data[1],
        start:data[2][0],
        finish:data[2][1],
        range:data[2][2]
      })

    }
    if(oneNum === 0 && taskNum === 1){
      Mtyotto.play()
      let i = 0
      console.log(result)
      let answer = await axios.post(baseURL, {
        text: result
      })
      
     let data = answer.data
     console.log(data)
      
      setTask({
        title:data[0],
        limit:data[2][0],
        range:data[2][2]
      })

    }

  })()
  },[result])

  useEffect(() => {
    if(oneNum === 1 && taskNum === 0){
     setDisplay(2)
     Mikakag.play()
   }
  },[planOne])

  const onOK = async () => {
    Mdehakotirade.play()
    const db = firebase.firestore();
    let startT = new Date(planOne.start)
    let m = String(startT.getMonth())
    let a =  props.user.uid
    await addDoc(collection(db, a, m, "plans"), {

      title:planOne.title,
      start: startT,
      finish: new Date(planOne.finish)
    });

    setOneNum(0)
    setDisplay(0)
    setResult(null)
  }

  const onReturn = () => {
    Mmouitido.play()
    setDisplay(1)
  }

  //課題の登録
  const onTask = () => {
    Mkadai.play()
    setOneNum(1)
    setTimeout(setDisplay(1),3000)
  }

  useEffect(() => {
    if(oneNum === 0 && taskNum === 1){
     setDisplay(3)
     Mikakag.play()
   }
  },[task])

  const onTaskOK = async () => {
    Mdehakotirade.play()
    const db = firebase.firestore();

    let startT = new Date(planOne.start)
    let m = String(startT.getMonth())
    let a =  props.user.uid
    await addDoc(collection(db, a, m, "task"), {

      title:task.title,
      start: new Date(task.limit),
      finish: task.range
    });
    setTimeout(Mganbare.play(),5000)
    setTask(0)
    setDisplay(0)
    setResult(null)
  }





  /////////////////////////////////////////////////////
  ///////////録音処理//////////////////////////////////
  ////////////////////////////////////////////////////
  const [now, setNow] = useState("録音停止中")
  // webkitSpeechRecognitionの設定
  const rec = new webkitSpeechRecognition(); // eslint-disable-line
  rec.continuous = false;  // `true` にすると連続して音声認識するが、各種イベントが発火しなくなる
  rec.interimResults = false;  // `true` にすると認識途中の結果も返す
  rec.lang = 'ja-JP';  // 言語指定
  rec.maxAlternatives = 1;  // 結果候補の最大数 (デフォルト 1)

  const outputEvent = (eventName, statusText, event) => {
    console.log(`${eventName} (${statusText}): `, event);
  };

  // 音声認識開始処理 (既に `start()` している時に実行するとエラーになるのでその対策として)
  const startRec = () => {
    try {
      rec.start();
    }
    catch(error) {
      console.error('音声認識は既に開始されています', error);
    }
  };
  // デフォルトの End イベント
  const defaultOnEnd = event => {
    //startRec();  // continuous 相当の処理のため、録音を再開する
  };
  
  const recodingFun = () => {

    startRec()
    rec.onstart = event => { 
      setNow("しゃべってください")
      outputEvent('Start' , '開始・何か喋ってください', event)
    };
    rec.onaudiostart = event => {
      setNow('何か喋ってください');
      outputEvent('Audio Start', '録音開始・何か喋ってください', event)
    }
    rec.onsoundstart  = event => {
      setNow('何か喋ってください');
      outputEvent('Sound Start','音声検出開始・何か喋ってください', event);
    }
    rec.onspeechstart = event => {
      setNow(' … 聞き取っています');
      outputEvent('Speech Start', '音声認識開始 … 聞き取っています', event);
    }
    rec.onspeechend = event => {
      setNow('音声認識終了');
      outputEvent('Speech End', '音声認識終了', event);
    }
    rec.onsoundend = event => {
      setNow('音声検出終了');
      outputEvent('Sound End', '音声検出終了' , event);
    }
    rec.onaudioend  = event => {
      setNow('録音終了');
      outputEvent('Audio End', '録音終了', event);
    }
    rec.onresult = event => {
      outputEvent('Result', '音声認識完了', event);
      setNow('音声認識完了');
      rec.stop();  // continuous 相当の処理のため
      // 最後に認識した言葉を表示する
      const transcript = event.results[event.results.length - 1][0].transcript;
      setResult(transcript);
      setNow('音声認識完了!');
    };
    rec.onend = event => defaultOnEnd(event);
    rec.onerror = event => {
      outputEvent('Error', 'エラーが発生しました', event);
      setNow('エラーが発生しました');
      if(event.error === 'not-allowed') {
        setNow('マイクが許可されていません');
        // `onerror` 後に `onend` が発火するため `start()` で再開させないようにする
        return rec.onend = onEndEvent => setNow( 'マイクが許可されていません');
      }
      if(event.error === 'no-speech') {
        outputEvent('Error [not-allowed]', 'マイクが許可されていません', event);
        setNow('無音状態・音声が聞き取れません');
        rec.onend = onEndEvent => defaultOnEnd(onEndEvent);  // 念のためイベントを初期化する
        return rec.stop();
      };
      if(event.error === 'aborted') {
        outputEvent('Error [aborted]', '音声認識が中止されました・再開します…', event);
        setNow('音声認識が中止されました');
        rec.onend = onEndEvent => defaultOnEnd(onEndEvent);
        return rec.stop();
      }
      // その他のエラー :再開させないようにする https://wicg.github.io/speech-api/#speechreco-error
      rec.onend = onEndEvent => setNow(onEndEvent);
    };
    
    rec.onnomatch = event => {
      setNow('音声認識できませんでした');
      outputEvent('No Match', '音声認識できませんでした', event);
    }
  }


  return(
    <>
      {
        display === 0 &&(
          <div>


          
            <CheckBtn onClick={onOne}>予定登録</CheckBtn>
            
            <CheckBtnI onClick={onTask}>課題登録</CheckBtnI>

          </div>
        )
      }
      {display === 1 &&(
        <SVoiceWrap>
          <SThread>
          <TNow>{now}</TNow>
          <TResult>{result}</TResult>
          </SThread>
          <SMikeWrap>
            <Mike onClick={recodingFun}>録音</Mike>      
          </SMikeWrap>
        </SVoiceWrap>)
      }
      {
        display === 2 &&( 
          <SVoiceWrap>
            <SThread>
              { planOne ? (
              <>
             <TNow>確認</TNow>
             <TResult>
               <p>{planOne.title}</p>
               <p>{planOne.start}</p>
               <p>{planOne.finish}</p>
             </TResult>
              </>
              ) : <p>データがありません</p>

              }
            </SThread>
            <SMikeWrap>

              <SOk onClick={onOK}>OK</SOk>   
              <SOkk onClick={onReturn}>やりなおす</SOkk>   

            </SMikeWrap>
          </SVoiceWrap>
        )
      }
      {
        display === 3 &&( 
          <SVoiceWrap>
            <SThread>
              { task ? (
              <>
             <TNow>確認</TNow>
             <TResult>
               <p>{task.title}</p>
               <p>{task.limit}</p>
               <p>{task.range}</p>
             </TResult>
              </>
              ) : <p>データがありません</p>

              }
            </SThread>
            <SMikeWrap>
              <button onClick={onTaskOK}>OK</button>   
              <button onClick={onReturn}>やりなおす</button>   
            </SMikeWrap>
          </SVoiceWrap>
        )
      }
    </>

  )
}



const SOk = styled.button`
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

const SOkk = styled.button`
position: fixed;
 height: 32px;
  width: 140px;
  margin: 50% 1%;
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




const CheckBtn = styled.button`
position: fixed;
margin: 50%;

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

const CheckBtnI =styled.button`
position: fixed;
margin: 50% 10%;

 height: 32px;
  width: 140px;
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
  height: 10px;
  border: solid 1px;
  background-color: #ffe9d8;
  margin:auto;
  border-radius: 20px;
  padding: 15px;
`

const SMikeWrap = styled.div`
  padding: 35%;
  height: 100px;
  width: 140px;

`;


const Mike = styled.button`


  height: 90px;
  width: 90px;
  margin: auto;

  /* margin: 0px; */
  padding-top: 5px;
  font-family: "Volkhov";
  font-style: italic;
  font-weight: 700;
  font-size: 16px;
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

export default Register;