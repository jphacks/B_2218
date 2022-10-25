import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyASN8wpBuqCJHojcr096iY4Vc6xMmpXqxk",
    authDomain: "jphacks-aca6b.firebaseapp.com",
    projectId: "jphacks-aca6b",
    storageBucket: "jphacks-aca6b.appspot.com",
    messagingSenderId: "591589440467",
    appId: "1:591589440467:web:fbd5737f118e3e6d290d26"
};

firebase.initializeApp(firebaseConfig);

export const signinWithEmailAndPassword = async (email, password) => {
    try {
        const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);


        alert('ログイン成功しました。');

        return user;
    } catch (error) {
        alert('ログイン失敗しました。');
        console.log(error);
    }
};