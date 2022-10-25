import React, { useEffect, useState } from "react";
import styled from "styled-components";


const Voice = (props) => {
  
  const [now, setNow] = useState("録音停止中")
  const [result, setResult] = useState(null)

  useEffect(() => {
    if(result !== null){
      props.setFun(result)
      
    }
    console.log(props.setFun)
  },[result])

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
    <SVoiceWrap>
      <SThread>
      <TNow>{now}</TNow>
      <TResult>{result}</TResult>
      </SThread>
      <SMikeWrap>
        <Mike onClick={recodingFun}>録音</Mike>
      </SMikeWrap>
    </SVoiceWrap>
  )
}


const SVoiceWrap = styled.div`
  text-align: center;
  margin: auto;
  font-size: large;


`;

const SThread = styled.div`
  text-align: center;
  

`
const TNow = styled.div`
  position: relative;
  width: 70%;
  border: solid 1px ;
  background-color: #ffbf8b;
  margin: auto;
  margin-top: 5%;
  margin-left: 10%;
  border-radius: 10px;
`

const TResult = styled.div`
position: absolute;
  width: 70%;
  height: 160px;
  border: solid 1px;
  background-color: #ffe9d8;
  margin:auto;
  margin-left: 4%;
  border-radius: 20px;
  padding: 15px;
  padding-top: 10px;
  letter-spacing: 0.01em;
  line-height: 1.3em;

`;

const SMikeWrap = styled.div`
  padding: 35%;
  height: 100px;
  width: 140px;

`;

const Mike = styled.button`
  position: absolute;
 
  height: 90px;
  width: 90px;
  margin: auto;
  top: 80%;
  left: 35%;
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

export default Voice;