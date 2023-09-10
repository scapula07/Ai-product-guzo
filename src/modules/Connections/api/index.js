import { doc,getDoc,setDoc , updateDoc,collection,addDoc,getDocs}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"
import { db } from "../../Firebase";

export const connectApi= {
     getConnections:async function (group) {
         try{

            if(group?.type?.length >0){
               const collection=group?.type ==="eco"?"ecosystems" :"organizations"
               const docRef = doc(db,collection, group?.id);
               const docSnap = await getDoc(docRef);
               console.log(docSnap.data(),"snap")

               return {pending:docSnap.data()?.pendingMemberships,active:docSnap.data()?.active}
            }else{
                const docRef = doc(db,"users", group?.id);
                const docSnap = await getDoc(docRef);
                console.log(docSnap.data(),"snap conne")
                return {pending:docSnap.data()?.pending,active:docSnap.data()?.ecosystems}

            }


          }catch(e){
            console.log(e)
         }
         
       
        

      }

}