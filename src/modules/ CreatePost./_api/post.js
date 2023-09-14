
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


const createGroupChat=async(id,data,group)=>{
    try{
        const ref=doc(db,"group",id)
        const payload={
            name:data?.post?.title,
            img:data?.img_post,
            members:[group?.id]
        }
        await setDoc(ref,payload)

        const docSnap = await getDoc(ref);
        return docSnap.exists()

     }catch(e){
        console.log(e)
        throw new Error(e);
     }
     
 }





export const postApi= {
    makePost:async function (group,payload,currentUser) {
        console.log(payload,"ppp")
        
        try{
            const postImg =await uploadFile(payload?.post?.img)
            console.log(postImg)
    
            delete payload?.post?.img;
            let file=""
            if(payload?.file?.name?.length>0){
                file =await uploadFile(payload?.post?.file)
                delete payload?.post?.file;

            }
      
      
            const  postSnap = await addDoc(collection(db, "posts"),{
                ...payload,
                img_post:postImg ,
                creator_id:group?.id,
                shared_by:group,
                file:file,
                createdAt:new Date()
            })
    
             
           const postRef=doc(db,"posts",postSnap?.id)
           const docSnap = await getDoc(postRef);
           if(docSnap.exists()){
             const response=await createGroupChat(docSnap?.id,docSnap?.data(),group)

             return response

           }
            

          }catch(e){
            console.log(e)
            throw new Error(e);
         }



     }

}