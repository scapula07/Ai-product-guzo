import { collection,  onSnapshot,
    doc, getDocs,
    query, orderBy, 
    limit,getDoc,setDoc ,
   updateDoc,addDoc ,deleteDoc } from 'firebase/firestore'
import { db } from '../../Firebase';


export const postApi = {
    deletePost: async function (collab) {
        try{
           await deleteDoc(doc(db, "posts", collab?.id));
           return true


         }catch(e){
           console.log(e)
           throw new Error(e);
         }
     }


}