import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { eventTupleToStore } from '@fullcalendar/react';
import { useState } from 'react';
import { signupWithEmailAndPassword } from './firebase/auth';
import { signinWithEmailAndPassword, } from './firebase/authLogin';

import styled from "styled-components";
import RegisterPlan from './Presentational/Container/RegisterPlan';

import Thread from './Presentational/Atoms/Thread';
import GetSchedule from './Presentational/Container/GetSchedule';

import LoginBox from './Presentational/Container/Auth';
import RegisterTask from './Presentational/Container/RegisterTask';
import GetTask from './Presentational/Container/getTask';
import CommonBtn from './Presentational/Atoms/CommonBtn';

import ituYotei from '../src/assets/Voice/ituno-yotei.wav'
import ituKadai from '../src/assets/Voice/ituno-kadai.wav'
import Kadai from '../src/assets/Voice/kadai.wav'





function App() {

  const MituYotei = new Audio(ituYotei);
  const MituKadai = new Audio(ituKadai);
  const MKadai = new Audio(Kadai);

  const [display, setDisplay] = useState(0);
  const [user, setUser] = useState(0);



  const back = () => {
    setDisplay(0)
  }

  // main

  const start = async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
      
      setUser({
        email: user.email,
        uid: user.uid
      })
  
      setDisplay(3)
      
    } else {
      setDisplay(1)
    }
  });
    
  }

  const onToKAIIN = () => {
    setDisplay(2)
  }

  const BBack = () => {
    setDisplay(1)
  }

  const Return = () => {
    setDisplay(0)
  }



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const signup = async (event) => {
    event.preventDefault();
    const user = await signupWithEmailAndPassword(email, password);
    console.log('登録User情報 : ', user);


  };
  const signin = async (event) => {
    event.preventDefault();
    const user = await signinWithEmailAndPassword(email, password);
    console.log('ログインUser情報 : ', user);


  };

  const toRP = () => {
    setDisplay(4)
  }
  const toRT = () => {
    MKadai.play()
    setDisplay(5)
  }
  const toGP = () => {
    MituYotei.play()
    setDisplay(6)
  }
  const toGT = () => {
    MituKadai.play()
    setDisplay(7)
  }

  return (
    <>

      {
        display === 0 && (
          <SMain>
            <Title>おてがるAI秘書</Title>
            <STartBtn onClick={start}> はじめる</STartBtn>

          </SMain>

        )
      }

      {
        display === 1 && (

          <>
            <SLoginBox>
              <SLogin>ログイン</SLogin>
              <OLl>
                <form onSubmit={signin}>
                  <SMail
                    type="text"
                    value={email}
                    placeholder="メールアドレス"
                    onChange={(event) => setEmail(event.target.value)}
                  />

                  <SPass
                    type="password"
                    value={password}
                    placeholder="パスワード"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <SLoginBoxNew type={'submit'}>送信</SLoginBoxNew>
                </form>
              </OLl>
              <SLoginBoxReg onClick={onToKAIIN}>アカウントを作成する</SLoginBoxReg>
              <SBackBtn onClick={back}>タイトルへ</SBackBtn>
            </SLoginBox>

          </>
        )
      }

      {
        display === 2 && (
          <>
            <SLoginBox>
              <SSndTitle>会員登録</SSndTitle>
              <OLll>
                <form onSubmit={signup}>
                  <SLogMail
                    type="text"
                    value={email}
                    placeholder="メールアドレス"
                    onChange={(event) => setEmail(event.target.value)}
                  />

                  <SLogPass
                    type="password"
                    value={password}
                    placeholder="パスワード"
                    onChange={(event) => setPassword(event.target.value)}
                  />

                  <SLoginBoxSend type={'submit'}>送信</SLoginBoxSend>

                </form>
              </OLll>
              <SLoginBoxBack onClick={BBack}>ログインはこちら</SLoginBoxBack>
              <SBackBtn onClick={back}>タイトルへ</SBackBtn>
            </SLoginBox>
          </>
        )
      }
      {
        display === 3 && (
          <>
            <SMain>
            <Title>おてがるAI秘書</Title>

            <CommonBtnFst>
            <CommonBtn text="予定の登録" clickedFun={toRP}/>
            </CommonBtnFst>
            <CommonBtnSnd>
            <CommonBtn text="課題の登録" clickedFun={toRT}/>
            </CommonBtnSnd>
            <CommonBtnTrd>
            <CommonBtn text="予定の確認" clickedFun={toGP}/>
            </CommonBtnTrd>
            <CommonBtnFth>
            <CommonBtn text="課題の確認" clickedFun={toGT}/>
            </CommonBtnFth>

          </SMain>
          </>
        )
      }
      {
        display === 4 && (
          <>

            


            <RegisterPlan user={user}/>

            <CommonBtnTItleSnd>
            <CommonBtn text="タイトルへ戻る" clickedFun={Return}/>
            </CommonBtnTItleSnd>

          </>
        )
      }
      {
        display === 5 && (
          <>


            <RegisterTask user={user}/>

            <CommonBtnTItleFst>
            <CommonBtn text="タイトルへ戻る" clickedFun={Return}/>
            </CommonBtnTItleFst>
          </>
        )
      }
      {
        display === 6 && (
          <>

            <GetSchedule user={user}/>
            <CommonBtnTItleFst>
            <CommonBtn text="タイトルへ戻る" clickedFun={Return}/>
            </CommonBtnTItleFst>

          </>
        )
      }
      {
        display === 7 && (
          <>

            <GetTask user={user}/>
            <CommonBtnTItleFst>
            <CommonBtn text="タイトルへ戻る" clickedFun={Return}/>
            </CommonBtnTItleFst>

          </>
        )
      }

    </>
  );
}




const CommonBtnTItleFst =styled.div`
position: fixed;
 margin-top: 42%;
 margin-left: 50%;
 top: 65%; 
`;

const CommonBtnTItleSnd = styled.div`
position: fixed;
 margin-top: 40%;
 margin-left: 50%;
 top: 65%;
`;



const SMain = styled.div`
  position: relative;
`;

const Title = styled.h1`
position: fixed;
margin: 8% 15%;
width: 250px;
color: orange; 
  text-align: center;
  -webkit-text-stroke: 0.4px #FFF;
`;

const CommonBtnFst = styled.button`
position: fixed;
  height: 32px;
  width: 140px;
  margin: 27% 5%;
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

const CommonBtnSnd = styled.button`
position: fixed;
  height: 32px;
  width: 140px;
  margin: 27% 55%;
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

const CommonBtnTrd = styled.button`
position: fixed;
  height: 32px;
  width: 140px;
  margin: 130% 5%;
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

const CommonBtnFth = styled.button`
position: fixed;
  height: 32px;
  width: 140px;
  margin: 130% 55%;
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




const STartBtn = styled.button`
position: absolute;
  height: 32px;
  width: 140px;
  margin: 140% 32%;
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
  `;

const SBackBtn = styled.p`
position: absolute;
  width: 148px;
  height: 24px;
  left: 160px;
  top: 190px;
  font-family: "Volkhov";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.02em;
  text-decoration-line: underline;
  color: #44bcff;
  &:hover {
    cursor: pointer;
  }
`;






const SLoginBox = styled.div`
  box-sizing: border-box;
  position: relative;
  margin: auto;
  margin-top: 48%;
  width: 300px;
  height: 300px;
  text-align: center;
  background: whitesmoke;
  border-radius: 5px;
`;

const SLogin = styled.h1`
position: absolute;
text-align: center;
top: 5px;
left: 25px;
width: 251px;
height: 37px;
font-family: "Volkhov";
font-style: normal;
font-weight: bold;
  font-size: 32px;
  line-height: 41px;
  letter-spacing: -0.02em;
  color: #000000;

`;

const SLoginBoxNew = styled.button`
  
  position: absolute;
  top: 150px;
  height: 32px;
  width: 140px;
  padding-top: 5px;
  left: -30px;
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
  box-shadow: 0px 2px 0px 0px #DB8D00;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
  }
`;


const SLoginBoxReg = styled.p`
position: absolute;
  width: 148px;
  height: 24px;
  left: 140px;
  top: 165px;
  font-family: "Volkhov";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.02em;
  text-decoration-line: underline;
  color: #44bcff;
  &:hover {
    cursor: pointer;
  }

  
`;



const OLl = styled.div`

position: absolute;
width: 50px;
top: 100px;
left: 110px;
`;
const SMail = styled.input`
 position: absolute;
border: none;
  outline: none;
  text-align: center;
  width: 250px;
  height: 25px;
  left: -85px;
  top: -15px;
  background: #ececec;
  box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.11);
  border-radius: 10px;
  text-size-adjust: none;
  &:hover {
    cursor: pointer;
  }
 `;

const SPass = styled.input`
position: absolute;
border: none;
  outline: none;
  text-align: center;
  width: 250px;
  height: 25px;
  left: -85px;
  top: 35px;
  background: #ececec;
  box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.11);
  border-radius: 10px;
  text-size-adjust: none;
  &:hover {
    cursor: pointer;
  }
 `;






const SSndTitle = styled.h1`
position: absolute;
text-align: center;
top: 5px;
left: 26px;
width: 251px;
height: 37px;
font-family: "Volkhov";
font-style: normal;
font-weight: bold;
  font-size: 32px;
  line-height: 41px;
  letter-spacing: -0.02em;
  color: #000000;

`;

const OLll = styled.div`

position: absolute;
width: 50px;
top: 100px;
left: 110px;
`;

const SLogMail = styled.input`
 position: absolute;
border: none;
  outline: none;
  text-align: center;
  width: 250px;
  height: 25px;
  left: -85px;
  top: -15px;
  background: #ececec;
  box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.11);
  border-radius: 10px;
  text-size-adjust: none;
  &:hover {
    cursor: pointer;
  }
 `;

const SLogPass = styled.input`
position: absolute;
border: none;
  outline: none;
  text-align: center;
  width: 250px;
  height: 25px;
  left: -85px;
  top: 35px;
  background: #ececec;
  box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.11);
  border-radius: 10px;
  text-size-adjust: none;
  &:hover {
    cursor: pointer;
  }
 `;

const SLoginBoxSend = styled.button`
  
  position: absolute;
  top: 150px;
  height: 32px;
  width: 140px;
  left: -30px;
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
  box-shadow: 0px 2px 0px 0px #DB8D00;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
  }
`;
const SLoginBoxBack = styled.p`
position: absolute;
  width: 148px;
  height: 24px;
  left: 140px;
  top: 165px;
  font-family: "Volkhov";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.02em;
  text-decoration-line: underline;
  color: #44bcff;
  &:hover {
    cursor: pointer;
  }
`;


export default App;
