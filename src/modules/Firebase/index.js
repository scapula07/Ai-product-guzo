import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword ,signOut} from "firebase/auth";
import { getMessaging , getToken,onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBCCrk78nJ-ipfhxDlodPoUlSgJSUP_jTo",
    authDomain: "guzo-v2.firebaseapp.com",
    projectId: "guzo-v2",
    storageBucket: "guzo-v2.appspot.com",
    messagingSenderId: "573309380008",
    appId: "1:573309380008:web:0ed1de3acffe7775ae299d",
    measurementId: "G-9TFLFQMJCH"
};
  

  const app = initializeApp(firebaseConfig);
  export const auth =getAuth(app)
  export const db=getFirestore()
  export const messaging = getMessaging(app);
 console.log("runin")
//  messaging.onMessage((payload) => {
//   console.log('Message received. ', payload);
//   // ...
// });
  

