// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyChy78yS4XWv7tnK9McuJNc_6tzHeK_HGM",
//   authDomain: "debace-app.firebaseapp.com",
//   projectId: "debace-app",
//   storageBucket: "debace-app.appspot.com",
//   messagingSenderId: "581374008396",
//   appId: "1:581374008396:web:963b8d42ba66fd6c9fa8e9",
//   measurementId: "G-9LBWZ36F99"
// };

// firebase.initializeApp(firebaseConfig);

// export const signinWithEmailAndPassword = async (email, password) => {
//     try {
//         const user = await firebase
//         .auth()
//         .signInWithEmailAndPassword(email, password);

//         alert('ログイン成功しました。');

//         return user;
//     } catch (error) {
//         alert('ログイン失敗しました。');
//         console.log(error);
//     }
// };

// export const signout = async () => {
//     const user1 = await firebase.auth().currentUser;
//     console.log('サインアウト前 : ', user1);

//     await firebase.auth().signOut();
    
//     const user2 = await firebase.auth().currentUser;
//     console.log('サインアウト後 : ' , user2)
// };