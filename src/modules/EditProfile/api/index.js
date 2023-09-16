import { doc,getDoc,setDoc , updateDoc,collection,addDoc}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"
import { db } from "../../Firebase";

export const profileApi= {
   editProfile:async function (group,payload,currentUser,collab) {
      console.log(payload,"ppp")
      let collectionName="users"
      if(group?.type?.length >0){
        collectionName= group?.type=="eco"?"ecosystems":"organizations"

      }
      try{    
          const postRef =doc(db,"posts",collab?.id)
          const docSnap = await getDoc(postRef);
          const result = await updateDoc(postRef,payload)
        
          return true
        }catch(e){
          console.log(e)
       }



   },
     fetchProfile:async function (group) {
        try{
         let collectionName="users"
         if(group?.type?.length >0){
           collectionName= group?.type=="eco"?"ecosystems":"organizations"

         }
       
         const profileRef =doc(db,collectionName,group?.id)
         const docSnap = await getDoc(profileRef);

         return docSnap.data()




         }catch(e){
           console.log(e)
           throw new Error(e)
        }
    }

}