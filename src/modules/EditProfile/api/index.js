import { doc,getDoc,setDoc , updateDoc,collection,addDoc}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"
import { db } from "../../Firebase";

export const profileApi= {
    edit:async function (group) {
       try{

        }catch(e){
           console.log(e)
           throw new Error(e)
        }

     },
     fetchProfile:async function () {
        try{
           

        }catch(e){
          console.log(e)
          throw new Error(e)
        }
    }

}