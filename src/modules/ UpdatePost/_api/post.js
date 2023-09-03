
import { db,auth } from "../../Firebase";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"


const uploadFile=async(file)=>{
    const storage = getStorage();
    const fileId=Math.random().toString(36).substring(2,8+2);
    const storageRef = ref(storage, `/${fileId}`);
    console.log(storageRef,"shote")
    const snapshot=await uploadBytes(storageRef, file)

    return `https://firebasestorage.googleapis.com/v0/b/${snapshot?.metadata?.bucket}/o/${snapshot?.metadata?.name}?alt=media`

}
export const postApi= {
    editPost:async function (group,payload,currentUser,collab) {
        console.log(payload,"ppp")
        
        try{    
            const postRef =doc(db,"posts",collab?.id)
            const docSnap = await getDoc(postRef);
            const result = await updateDoc(postRef,payload)
          
            return true
          }catch(e){
            console.log(e)
         }



     }

}