import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword ,signOut} from "firebase/auth";
import { getMessaging , getToken,onMessage } from "firebase/messaging";


var currentURL = window.location.href;
var url = new URL(currentURL);
var domainName = url.hostname;



let firebaseConfig ={
  apiKey: "AIzaSyBCCrk78nJ-ipfhxDlodPoUlSgJSUP_jTo",
  authDomain: "guzo-v2.firebaseapp.com",
  projectId: "guzo-v2",
  storageBucket: "guzo-v2.appspot.com",
  messagingSenderId: "573309380008",
  appId: "1:573309380008:web:0ed1de3acffe7775ae299d",
  measurementId: "G-9TFLFQMJCH"
};


if(domainName==="community.guzo.io"){
   firebaseConfig = {
    apiKey: "AIzaSyBCCrk78nJ-ipfhxDlodPoUlSgJSUP_jTo",
    authDomain: "guzo-v2.firebaseapp.com",
    projectId: "guzo-v2",
    storageBucket: "guzo-v2.appspot.com",
    messagingSenderId: "573309380008",
    appId: "1:573309380008:web:0ed1de3acffe7775ae299d",
    measurementId: "G-9TFLFQMJCH"
  };

}else{
   firebaseConfig = {
      apiKey: "AIzaSyCoMTJsWVIdi5TsqXwDI620Y6Y89a-Hg4M",
      authDomain: "guzo-sandbox.firebaseapp.com",
      projectId: "guzo-sandbox",
      storageBucket: "guzo-sandbox.appspot.com",
      messagingSenderId: "1025453001887",
      appId: "1:1025453001887:web:0a5096f66c6022221566aa",
      measurementId: "G-5HZG9YS53K"
  };

}


console.log(currentURL,url,domainName,firebaseConfig?.projectId,"addressss")






  

  const app = initializeApp(firebaseConfig);
  export const auth =getAuth(app)
  export const db=getFirestore()
  export const messaging = getMessaging(app);
 console.log("runin")
//  messaging.onMessage((p]ayload) => {
//   console.log('Message received. ', payload);
//   // ...
// });
  

