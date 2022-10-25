import './App.css';
import styled from "styled-components";


import CommonBtn from './Presentational/Atoms/CommonBtn';
import MikeBtn from './Presentational/Atoms/MikeBtn';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Calendar from './Presentational/Atoms/Calendar';
import BackGround from './Presentational/Atoms/BackGround';
import Test from './test/Test';
import Voice from './Presentational/Container/Voice';
import Register from './Page/Register';
import bk from "../src/assets/images/bk.mp4";
//import ikakaga from "../../assets/Voice/ikakaga.wav"
import bkimg from "../src/assets/images/bkimg.png";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { eventTupleToStore } from '@fullcalendar/react';
import { useState } from 'react';
import { signupWithEmailAndPassword} from './firebase/auth';
import { signinWithEmailAndPassword,} from './firebase/authLogin';

import Listen from './Presentational/Container/Listen';



const firebaseConfig = {
  apiKey: "AIzaSyASN8wpBuqCJHojcr096iY4Vc6xMmpXqxk",
  authDomain: "jphacks-aca6b.firebaseapp.com",
  projectId: "jphacks-aca6b",
  storageBucket: "jphacks-aca6b.appspot.com",
  messagingSenderId: "591589440467",
  appId: "1:591589440467:web:fbd5737f118e3e6d290d26"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

function App() {

  const [display , setDisplay] = useState(0);
  const [user, setUser] = useState(0);



  const back =() => {
    setDisplay(0)
  }

  //main
  const start = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

   if (user) {
     setUser({
      email: user.email,
      uid: user.uid
     })

     setDisplay(3)
  } else {
     setDisplay(1)
  }
  
}
  const onToKAIIN = () =>{
    setDisplay(2)
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


  return (

    <SBase>
      <ReBtn onClick={back}>戻る</ReBtn>
      {
        display === 0 && (
      <SMain>
        <Title>お手軽AI秘書</Title>
        <STartBtn onClick={start}> はじめる</STartBtn>

      </SMain>

        )
      }
      
      {/* auth↓ */}


     {
      display === 1 && (
        <>
      <h1>ログイン</h1>
      <form onSubmit={signin}>
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          />

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          />
        <button type={'submit'}>送信</button>
      </form>

      <button onClick={onToKAIIN}>to会員登録</button>
      <button onClick={back}>戻る</button>
        </>
      )
     }
     {
      display === 2 && (
        <>
       <h1>会員登録</h1>
       <form onSubmit={signup}>
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)} 
        />

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type={'submit'}>送信</button>

        </form>
        </>
      )
     }
     {
      display === 3 && (
        <>
         <Home>
           <button onClick={() => setDisplay(4)}>予定の入力</button>
           <button onClick={() => setDisplay(5)}>予定を確認</button>
         </Home>
        </>
      )
     }
     {
      display === 4 &&
      <Register user={user}/>
     }
     {
      display === 5 &&
      <Listen user={user}/>
     }








    </SBase>
  );
}

const SBase = styled.div`

`;




const SMain = styled.div`
  
`;

const Title = styled.h1`
  text-align: center;
`;
///////////////////////////////////////////
///////////ホーム画面//////////////////////////
///////////////////////////////////////////
const Home = styled.div`
     
`;

const STartBtn =styled.button`

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

const ReBtn =styled.button`

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




export default App;
