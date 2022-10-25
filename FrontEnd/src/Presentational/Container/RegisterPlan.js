import React, { useEffect, useState} from "react";
import styled from "styled-components";
import Voice from "../Container/Voice";
import axios from "axios";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { addDoc, collection, doc} from "firebase/firestore";


//音声ファイル
import yoteiOsiete from "../../assets/Voice/yoteiOsiete.wav";
import mouitido from "../../assets/Voice/mouitido.wav";
import tyotto from "../../assets/Voice/tyottoomati.wav";
import ikakaga from "../../assets/Voice/ikakaga.wav";
import dehakotirade from "../../assets/Voice/dehakotirade.wav";
import mousukosi from "../../assets/Voice/gome-mou-matte.wav";
import atomou from "../../assets/Voice/gome-ato-matte.wav";
import gomesippai from "../../assets/Voice/gomen-sippai.wav";
import hitotume from "../../assets/Voice/soredeha-hitotume.wav";
import next from "../../assets/Voice/next.wav";

//styleのインポート
import CommonBtn from "../Atoms/CommonBtn";
import { waitAsync } from "../../Helpers/waitAsync";
import Thread from "../Atoms/Thread";
import { getNowDate,getNowTime,normalizYear } from "../../Helpers/dateOperation";

const baseURL = "https://pacific-earth-33925.herokuapp.com/plans/";
//仮置き



const firebaseConfig = {
  apiKey: "AIzaSyASN8wpBuqCJHojcr096iY4Vc6xMmpXqxk",
  authDomain: "jphacks-aca6b.firebaseapp.com",
  projectId: "jphacks-aca6b",
  storageBucket: "jphacks-aca6b.appspot.com",
  messagingSenderId: "591589440467",
  appId: "1:591589440467:web:fbd5737f118e3e6d290d26"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
////////////////////////////////////////
//ここからREACT////////////////////////
//////////////////////////////////////
const RegisterPlan = (props) => {

  //音声ファイル読み込み
  const MyoteiOsiete = new Audio(yoteiOsiete);
  const Mmouitido = new Audio(mouitido);
  const Mtyotto = new Audio(tyotto);
  const Mikakag = new Audio(ikakaga);
  const Mdehakotirade = new Audio(dehakotirade);
  const Mmousukosi = new Audio(mousukosi);
  const Matomou = new Audio(atomou);
  const Mgomesippai = new Audio(gomesippai);
  const Mhitotume = new Audio(hitotume);
  const Mnext = new Audio(next);


  //state管理
  const [display, setDisplay] = useState(1)
  const [error, setError] = useState(0)
  const [errorText, setErrorText] = useState(0)
  //vText
  const [vText0, setVText0] = useState(null)
  const [vText1, setVText1] = useState(null)
  const [vText2, setVText2] = useState(null)
  const [vText3, setVText3] = useState(null)

  const setVtext = (result) => {
    if(oneNum === 1 && matomeNum === 0){
      setVText0(result)
    }
    if(oneNum === 0 && matomeNum === 1){
      setVText1(result)
    }
    if(oneNum === 0 && matomeNum === 2){
      setVText2(result)
    }
    if(oneNum === 0 && matomeNum === 3){
      setVText3(result)
    }
    if(oneNum === 0 && matomeNum > 3 && matomeNum % 3 === 1){
      setVText1(result)
    }
    if(oneNum === 0 && matomeNum > 3 &&  matomeNum % 3 === 2){
      setVText2(result)
    }
    if(oneNum === 0 && matomeNum > 3 &&  matomeNum % 3 === 0){
      setVText3(result)
    }
    
  }

  useEffect(() => {
    if(error === 1){
      setErrorText("予定の開始時間は必須です")
      setDisplay(9)
    }
  }, [error])
  
  /////////////////////////////////////////////////////////////
  //一つずつ予定登録////////////////////////////////////////
  ///////////////////////////////////////////////////////
  const [oneNum, setOneNum] = useState(0)
  const [onlyOnePlan, setOnlyOnePlan] = useState(null)
  const [showPlan,setShowPlan] = useState({})

  const oneOnlyStart = () => {
    setOneNum(1)
    MyoteiOsiete.play();
    setTimeout(setDisplay,500,0)
  }

  useEffect(() => {
    (async() => {
      if(oneNum === 1){
        
        Mtyotto.play()
        console.log(vText0)
        let answer = await axios.post(baseURL, {
          text: vText0
        })
             
        try{
            let data = answer.data
            let startTime = data[2][0]
            let finishTime = data[2][1]

            if(startTime === null){
              throw new Error('StartTimeNone');
              
            }else{
              startTime = new Date(data[2][0])
              startTime = normalizYear(startTime)
            }
            if(finishTime != null){
              finishTime = new Date(data[2][1])
              finishTime = normalizYear(finishTime)
            }

            setOnlyOnePlan({
              title:data[0],
              location:data[1],
              start: startTime,
              finish:finishTime,
              range:data[2][2]
            })
        }catch{

          console.log(answer)
          console.error();
          Mgomesippai.play()
          setTimeout(Mmouitido.play,3000)
          setDisplay(1)
          setOneNum(0)
          setVText0(null)
          
        }
      //brock終了
      }
    })()
  },[vText0])

  useEffect(() => {
    if(oneNum === 1 && matomeNum === 0){
      let day = onlyOnePlan.start;
      let stTime = onlyOnePlan.start;
      let fnTime = onlyOnePlan.finish;
      if(day == null){
        let now = new Date()
        day = getNowDate(now,"md")
      }else{
        day = getNowDate(day,'md')
      }
      if(stTime == null){
        stTime = "開始時間登録無し"
      }else{
        stTime = getNowTime(stTime,'')
      }
      if(fnTime == null){
        fnTime = "終了時間登録無し"
      }else{
        fnTime = getNowTime(fnTime,'')
      }
      setShowPlan(
        {
          title: onlyOnePlan.title,
          location: onlyOnePlan.location,
          day: day,
          start: stTime,
          finish: fnTime
        }
      )
      setDisplay(2)
      Mikakag.play()
    }
  },[onlyOnePlan])

  const onOK = async () => {
    Mdehakotirade.play()
    let startT = onlyOnePlan.start
    let m = String(startT.getMonth())

    let a =  props.user.uid //仮

    await addDoc(collection(db, a, m, "plans"), {

      title:onlyOnePlan.title,
      location:onlyOnePlan.location,
      start: startT,
      finish: onlyOnePlan.finish

    });

    setOneNum(0)
    setTimeout(setDisplay,3000,1) 
    setVText0(null)
  }

  const onReturn = () => {
    Mmouitido.play()
    setDisplay(0)
  }
  ////////////////////////////////////////////
  //一つずつ登録//////////////////////////////
  //////////////////////////////////////////////

  /////////////////////////////////////////////////
  //まとめて予定を登録/////////////////////////////////
  //////////////////////////////////////////////
  const [matomeNum, setMatomeNum] = useState(0)
  const [matomePlans,setMatomePlans] = useState([])
  const [plansCount,setPlansCount] = useState(0)
  const [answerSt, setAnswerSt] = useState(200)

  const onMatome = () => {

    setMatomeNum(1)
    Mhitotume.play()
    setTimeout(setDisplay,500,3)

  }

  useEffect(() => {
    if(oneNum === 0 && matomeNum === 1 && plansCount === 1){
      setMatomeNum(2)
      Mnext.play()
    }
    if(oneNum === 0 && matomeNum === 2 && plansCount === 2){
      setMatomeNum(3)
      Mnext.play()
    }
    if(oneNum === 0 && matomeNum === 3 && plansCount === 3){
      setMatomeNum(4)
      Mnext.play()
    }
    if(oneNum === 0 && matomeNum > 4 && plansCount > 3){
      setMatomeNum(matomeNum + 1)
      Mnext.play()
    }

  },[plansCount])

  useEffect(() => {
    (async() => {
      if(matomeNum === 1 && vText1 !== null){

        console.log(vText1)
        setPlansCount(1)
        let answer = await axios.post(baseURL, {
          text: vText1
        })
        console.log(answer)
        setAnswerSt(answer.status)
        
        try{
          let data = answer.data
          let startTime = data[2][0]
          let finishTime = data[2][1]

          if(startTime === null){
            throw new Error('StartTimeNone');
            
          }else{
            startTime = new Date(data[2][0])
            startTime = normalizYear(startTime)
          }
          if(finishTime != null){
            finishTime = new Date(data[2][1])
            finishTime = normalizYear(finishTime)
          }
            
            let dataObj = {
              title:data[0],
              location:data[1],
              start: startTime,
              finish:finishTime,
              range:data[2][2]
            }
            matomePlans.push(dataObj)
            dataObj = {}
        }catch{
          Mgomesippai.play()
          setTimeout(Mmouitido.play,3000)
          setDisplay(1)
          setMatomeNum(0)
          setVText1(null)
        }finally{
          setVText1(null)
        }

      //brock終了
      }else if(matomeNum % 3 === 1 && vText1 !== null){

        console.log(vText1)
        setPlansCount(plansCount + 1)
        let answer = await axios.post(baseURL, {
          text: vText1
        })
        console.log(answer)
        setAnswerSt(answer.status)
        
        try{
          let data = answer.data
          let startTime = data[2][0]
          let finishTime = data[2][1]

          if(startTime === null){
            throw new Error('StartTimeNone');
            
          }else{
            startTime = new Date(data[2][0])
            startTime = normalizYear(startTime)
          }
          if(finishTime != null){
            finishTime = new Date(data[2][1])
            finishTime = normalizYear(finishTime)
          }
            
            let dataObj = {
              title:data[0],
              location:data[1],
              start: startTime,
              finish:finishTime,
              range:data[2][2]
            }
            matomePlans.push(dataObj)
            dataObj = {}

          }catch{
            setTimeout(Mmouitido.play,3000)
            setDisplay(1)
            setMatomeNum(0)
            setVText1(null)
          }finally{
            setVText1(null)
          } 

      //brock終了
      }
    })()
  },[vText1])
  


  useEffect(() => {
    (async() => {
      if(matomeNum === 2 && vText2 !== null){
        
        console.log(vText2)
        setPlansCount(plansCount + 1)
        let answer = await axios.post(baseURL, {
          text: vText2
        })
      
        console.log(answer)
        setAnswerSt(answer.status)
        
        try{
            let data = answer.data
            let startTime = data[2][0]
            let finishTime = data[2][1]

            if(startTime === null){
              throw new Error('StartTimeNone');
              
            }else{
              startTime = new Date(data[2][0])
              startTime = normalizYear(startTime)
            }
            if(finishTime != null){
              finishTime = new Date(data[2][1])
              finishTime = normalizYear(finishTime)
            }
              
              let dataObj = {
                title:data[0],
                location:data[1],
                start: startTime,
                finish:finishTime,
                range:data[2][2]
              }
              matomePlans.push(dataObj)
              dataObj = {}
          }catch{
            Mgomesippai.play()
            setTimeout(Mmouitido.play,3000)
            setDisplay(1)
            setMatomeNum(0)
          }finally{
            setVText2(null)
          }

      }else if(matomeNum % 3 === 2 && vText2 !== null){
        
        console.log(vText2)
        setPlansCount(2)
        let answer = await axios.post(baseURL, {
          text: vText2
        })
      
        console.log(answer)
        setAnswerSt(answer.status)
        
        try{
            let data = answer.data
            let startTime = data[2][0]
            let finishTime = data[2][1]

            if(startTime === null){
              throw new Error('StartTimeNone');
              
            }else{
              startTime = new Date(data[2][0])
              startTime = normalizYear(startTime)
            }
            if(finishTime != null){
              finishTime = new Date(data[2][1])
              finishTime = normalizYear(finishTime)
            }
              
              let dataObj = {
                title:data[0],
                location:data[1],
                start: startTime,
                finish:finishTime,
                range:data[2][2]
              }
              matomePlans.push(dataObj)
              dataObj = {}
          }catch{
            Mgomesippai.play()
            setTimeout(Mmouitido.play,3000)
            setDisplay(1)
            setMatomeNum(0)
          }finally{
            setVText2(null)
          }

      }

    })()
  },[vText2])

  useEffect(() => {
    (async() => {
      if(matomeNum === 3 && vText3 !== null){

        console.log(vText2)
        setPlansCount(3)
        let answer = await axios.post(baseURL, {
          text: vText3
        })
      
        console.log(answer)
        setAnswerSt(answer.status)
        
        try{
            let data = answer.data
            let startTime = data[2][0]
            let finishTime = data[2][1]

            if(startTime === null){
              throw new Error('StartTimeNone');
              
            }else{
              startTime = new Date(data[2][0])
              startTime = normalizYear(startTime)
            }
            if(finishTime != null){
              finishTime = new Date(data[2][1])
              finishTime = normalizYear(finishTime)
            }
              
              let dataObj = {
                title:data[0],
                location:data[1],
                start: startTime,
                finish:finishTime,
                range:data[2][2]
              }
              matomePlans.push(dataObj)
              dataObj = {}
          }catch{
            Mgomesippai.play()
            setTimeout(Mmouitido.play,3000)
            setDisplay(1)
            setMatomeNum(0)
          }finally{
            setVText3(null)
          }

      }else if(matomeNum % 3 === 0 && vText3 !== null){

        console.log(vText2)
        setPlansCount(plansCount + 1)
        let answer = await axios.post(baseURL, {
          text: vText3
        })
      
        console.log(answer)
        setAnswerSt(answer.status)
        
        try{
            let data = answer.data
            let startTime = data[2][0]
            let finishTime = data[2][1]

            if(startTime === null){
              throw new Error('StartTimeNone');
              
            }else{
              startTime = new Date(data[2][0])
              startTime = normalizYear(startTime)
            }
            if(finishTime != null){
              finishTime = new Date(data[2][1])
              finishTime = normalizYear(finishTime)
            }
              
              let dataObj = {
                title:data[0],
                location:data[1],
                start: startTime,
                finish:finishTime,
                range:data[2][2]
              }
              matomePlans.push(dataObj)
              dataObj = {}

          }catch{
            Mgomesippai.play()
            setTimeout(Mmouitido.play,3000)
            setDisplay(1)
            setMatomeNum(0)
          }finally{
            setVText3(null)
          }
        
      }
    })()
  },[vText3])

  
  const onEnd = () => {
    Mtyotto.play()
    setTimeout(
      () => {
        setDisplay(4)
      }, 10000
    )
    setTimeout(
      Mikakag.play,
      2000
    )
  }

  const onOKM = async () => {
    Mdehakotirade.play()
    let startT = matomePlans[0].start
    let m = String(startT.getMonth())

    let a =  props.user.uid //仮

    for await (let e of matomePlans){
      
      addDoc(collection(db, a, m, "plans"), {
  
        title:e.title,
        location:e.location,
        start: e.start,
        finish: e.finish
  
      });
    }



    setOneNum(0)
    setTimeout(setDisplay,3000,1) 
    setVText0(null)
  }






  return (
    <>
    {
      // マイク
      display === 0 && 
        <Voice setFun={setVtext}/>
    }
    {
      //home画面
      display === 1 &&
      <SFirstWrap>
       <SBtnsWrap>
        <CommonBtnSth>
         <CommonBtn text="1つずつ登録" clickedFun={oneOnlyStart}/>
        </CommonBtnSth>
         <CommonBtnFifth>          
         <CommonBtn text="まとめて登録" clickedFun={onMatome}/>
         </CommonBtnFifth>
       </SBtnsWrap>   
      </SFirstWrap>
    }
    {
      display === 2 && ( 
        <SVoiceWrap>
          <SThread>
            { onlyOnePlan ? (
            <>
           <TNow>確認</TNow>
           <TResult>
             <p>{showPlan.title}</p>
             <p>{showPlan.location}</p>
             <p>{showPlan.day}</p>
             <p>{showPlan.start}</p>
             <p>{showPlan.finish}</p>
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
      )
       
    }
    {
      display === 3 &&
        <SMatomeVoice>
          <Voice setFun={setVtext}/>
          <CommonBtnFin>
          <CommonBtn text="終了する" clickedFun={onEnd}/>
          </CommonBtnFin>
        </SMatomeVoice>
    }
    {
      display === 4 &&(
        <>
          <Thread data={matomePlans} type="con"/>
          <SBtnsWrap>
          <CommonBtnOK>
          <CommonBtn text="OK" clickedFun={onOKM}/>
          </CommonBtnOK>
          <CommonBtnRedo>
          <CommonBtn text="やりなおし" clickedFun={onReturn}/>
          </CommonBtnRedo>
          </SBtnsWrap> 
        </>
      )
    }

    {
      display === 9 &&
        <TResult>{errorText}</TResult>
      
    }
    </>
  )
}

////////////////////////////////////////
//ここからSTYLE////////////////////////
//////////////////////////////////////


const CommonBtnRedo = styled.div`
position: fixed;
  height: 32px;
  width: 140px;
  margin: 95% 50%;
  padding: 0px;
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
  

`;

const CommonBtnOK = styled.div`
position: fixed;
  height: 32px;
  width: 140px;
  margin: 95% 8%;
  padding: 0px;
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
`;

const CommonBtnFin = styled.div`

position: fixed;
  height: 32px;
  width: 140px;
  margin: 130% 50%;
  padding: 0px;
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
  
`;

const SFirstWrap = styled.div`

`

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

const SMatomeVoice = styled.div`

`;

const CommonBtnFifth = styled.button`

position: fixed;
  height: 32px;
  width: 140px;
  margin: 130% 50%;
  padding: 0;
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
  `;
const CommonBtnSth = styled.button`

position: fixed;
  height: 32px;
  width: 140px;
  margin: 130% 10%;
  padding: 0;
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
  `;
  

export default RegisterPlan;