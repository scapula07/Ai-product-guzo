import { collection,  onSnapshot,
    doc, getDocs,
    query, orderBy, 
    limit,getDoc,setDoc ,
   updateDoc,addDoc ,deleteDoc } from 'firebase/firestore'
import { db } from '../../Firebase';


export const deleteProfile = {
    deleteAccount: async function (group) {
        let collectionName="users"
        if(group?.type?.length >0){
              collectionName= group?.type=="eco"?"ecosystems":"organizations"
  
         }
        try{
           await deleteDoc(doc(db,collectionName,group?.id));
           return true


         }catch(e){
           console.log(e)
           throw new Error(e);
         }
     }


}