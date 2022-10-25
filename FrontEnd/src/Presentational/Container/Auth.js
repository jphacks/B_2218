import React from "react";
import styled from "styled-components";


const LoginBox = (props) => {
  return (
    <SLoginBox>
      <SLoginBoxEmail></SLoginBoxEmail>
      <SLoginBoxEmailIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          fill="currentColor"
          class="bi bi-person"
          viewBox="0 0 16 16"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
        </svg>
      </SLoginBoxEmailIcon>
      <SLoginBoxPass></SLoginBoxPass>
      <SLoginBoxPassIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-key"
          viewBox="0 0 16 16"
        >
          <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
          <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
      </SLoginBoxPassIcon>
      <SLoginBoxTitle>{"ログイン　Login"}</SLoginBoxTitle>
      <SLoginBoxNew>{"アカウントを作成する"}</SLoginBoxNew>
      <SLoginBoxReset>{"パスワードを忘れた場合"}</SLoginBoxReset>
      <SLoginBoxBtn onClick={props.clickedFn}>{props.texta}</SLoginBoxBtn>
    </SLoginBox>
  );
};

const SLoginBox = styled.div`
  box-sizing: border-box;
  position: fixed;
  margin: 50%;
  width: 400px;
  height: 400px;
  left: 481px;
  top: 108px;
  text-align: center;
  background: whitesmoke;
  border-radius: 40px;
`;

const SLoginBoxEmail = styled.input.attrs({
  type: "email",
  placeholder: "メールアドレス",
})`
  border: none;
  outline: none;
  text-align: center;
  width: 318px;
  height: 43px;
  left: 523px;
  top: 211px;
  background: #ececec;
  box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.11);
  border-radius: 10px;
  position: fixed;
`;

const SLoginBoxEmailIcon = styled.svg`
  position: fixed;
  margin: auto;
  left: 535px;
  top: 221px;
  width: 25px;
  height: 28px;
  object-fit: contain;
`;

const SLoginBoxPass = styled.input.attrs({
  type: "password",
  placeholder: "パスワード",
})`
  border: none;
  outline: none;
  text-align: center;
  position: fixed;
  width: 318px;
  height: 43px;
  left: 523px;
  top: 278px;
  background: #ececec;
  box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.11);
  border-radius: 10px;
`;

const SLoginBoxPassIcon = styled.svg`
  position: fixed;
  margin: auto;
  left: 535px;
  top: 288px;
  /* transform: rotate(135deg); */
  width: 30px;
  height: 23px;
  object-fit: cover;
  /* background: gray; */
`;

const SLoginBoxTitle = styled.p`
  position: fixed;
  width: 251px;
  height: 37px;
  left: 560px;
  top: 138px;
  font-family: "Volkhov";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 41px;
  letter-spacing: -0.02em;
  color: #000000;
`;

const SLoginBoxNew = styled.p`
  position: fixed;
  width: 148px;
  height: 24px;
  left: 698px;
  top: 339px;
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

const SLoginBoxReset = styled.p`
  position: fixed;
  width: 162px;
  height: 24px;
  left: 684px;
  top: 369px;
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

const SLoginBoxBtn = styled.button`
  position: fixed;
  width: 197px;
  height: 43px;
  left: 582px;
  top: 416px;
  border: none;
  outline: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
  box-shadow: 0px 4px 0px 0px #db8d00;
  transition: 0.2s;
  background: #3a3a3a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  font-family: "Volkhov";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 31px;
  letter-spacing: -0.02em;
  color: #ffffff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover {
    cursor: pointer;
  }
  &:active {
    margin-top: 4px;
    box-shadow: none;
  }
`;

export default LoginBox;