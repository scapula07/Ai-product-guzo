import { auth ,db} from "../../Firebase";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"



export const createProfile= {
    createUserProfile:async function (uid,displayName,file) {
        console.log(displayName,"name")
        try{
            console.log(uid,"uid")
            const storage = getStorage();
            const fileId=Math.random().toString(36).substring(2,8+2);
            const storageRef = ref(storage, `/${fileId}`);
            const userRef =doc(db,"users",uid)
            const snapshot=await uploadBytes(storageRef, file)
             console.log(snapshot,"shote")
           
              const result = await updateDoc(userRef, {
                username:"john",
                img: `https://firebasestorage.googleapis.com/v0/b/${snapshot?.metadata?.bucket}/o/${snapshot?.metadata?.name}?alt=media`,
                display:displayName
             })
    
             console.log(result,"result")

            }catch(e){
                console.log(e)
            }




      },
    createOrgProfile:async function (payload,file,currentUser) {
        try{
                console.log("result")
                const storage = getStorage();
                const fileId=Math.random().toString(36).substring(2,8+2);
                const storageRef = ref(storage, `/${fileId}`);
                console.log(storageRef,"shote")
                const userRef =doc(db,"users",payload?.creator)
                const snapshot=await uploadBytes(storageRef, file)
                console.log(snapshot,"shote")
            
                const orgSnap = await addDoc(collection(db, "organizations"),{
                    ...payload,
                    img:`https://firebasestorage.googleapis.com/v0/b/${snapshot?.metadata?.bucket}/o/${snapshot?.metadata?.name}?alt=media`,
                    pending:[],
                    active:[],
                    type:"org"
                })
         
              console.log(orgSnap,"")
              const result = await updateDoc(userRef, {
                organizations:[
                    ...currentUser?.organizations,
                    {
                        id:orgSnap?.id,
                        name:payload?.org_name,
                        type:"org",
                        img:`https://firebasestorage.googleapis.com/v0/b/${snapshot?.metadata?.bucket}/o/${snapshot?.metadata?.name}?alt=media`
                    }
                    ]
            
                })
        
        
                console.log(result,"result")

                }catch(e){
                    console.log(e)
                }

        
    },
     createEcoProfile:async function (payload,file,currentUser) {
        try{
            console.log("result")
            const storage = getStorage();
            const fileId=Math.random().toString(36).substring(2,8+2);
            const storageRef = ref(storage, `/${fileId}`);
            console.log(storageRef,"shote")
            const userRef =doc(db,"users",payload?.creator)
            const snapshot=await uploadBytes(storageRef, file)
            console.log(snapshot,"shote")
        
            const ecoSnap = await addDoc(collection(db, "ecosystems"),{
                ...payload,
                img:`https://firebasestorage.googleapis.com/v0/b/${snapshot?.metadata?.bucket}/o/${snapshot?.metadata?.name}?alt=media`,
                pending:[],
                active:[],
                type:"eco",
            })
     
            console.log(ecoSnap,"ecosnap")
    
          const result = await updateDoc(userRef, {
            ecosystems:[
                ...currentUser?.ecosystems,
                {
                 id:ecoSnap?.id,
                 name:payload?.name,
                 type:"eco",
                 img:`https://firebasestorage.googleapis.com/v0/b/${snapshot?.metadata?.bucket}/o/${snapshot?.metadata?.name}?alt=media`
                }
                ]
        
             })
    
    
            console.log(result,"result")

            }catch(e){
                console.log(e)
            }
        
    }

}