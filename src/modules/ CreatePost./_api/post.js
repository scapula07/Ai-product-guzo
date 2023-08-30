
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
    makePost:async function (group,payload,currentUser) {
        console.log(payload,"ppp")
        
        try{
            const postImg =await uploadFile(payload?.post?.img)
            console.log(postImg)
    
            delete payload?.post?.img;
      
      
            const  postSnap = await addDoc(collection(db, "posts"),{
                ...payload,
                img_post:postImg ,
                creator_id:group?.id,
                shared_by:group
            })
    
             
           const postRef=doc(db,"posts",postSnap?.id)
           const docSnap = await getDoc(postRef);
           return docSnap.exists()
            

          }catch(e){
            console.log(e)
         }



     }

}