import { doc,getDoc,setDoc , updateDoc,collection,addDoc}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"
import { db } from "../../Firebase";

export const connectApi= {
    getPending:async function (currentUser) {
        const pending=currentUser?.pending
        

      }

}