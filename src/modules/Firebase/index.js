import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword ,signOut} from "firebase/auth";


// const firebaseConfig = {
//     apiKey: "AIzaSyBCCrk78nJ-ipfhxDlodPoUlSgJSUP_jTo",
//     authDomain: "guzo-v2.firebaseapp.com",
//     projectId: "guzo-v2",
//     storageBucket: "guzo-v2.appspot.com",
//     messagingSenderId: "573309380008",
//     appId: "1:573309380008:web:0ed1de3acffe7775ae299d",
//     measurementId: "G-9TFLFQMJCH"
//   };
  
const firebaseConfig = {
    apiKey: "AIzaSyDmzcJzoD9vgZMrqI1Ih957gHJg6AZiPKk",
    authDomain: "homeaid-dd63c.firebaseapp.com",
    projectId: "homeaid-dd63c",
    storageBucket: "homeaid-dd63c.appspot.com",
    messagingSenderId: "962028442523",
    appId: "1:962028442523:web:6d6bf6a9f3987294f2873e",
    measurementId: "G-LHDBMPP5J9"
  };

  const app = initializeApp(firebaseConfig);
  export const auth =getAuth(app)
  export const db=getFirestore()



