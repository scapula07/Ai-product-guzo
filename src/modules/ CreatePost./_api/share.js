import { db,auth } from "../../Firebase";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,query,getDocs}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"


export const shareApi= {
    getAllEcosytems:async function () {
        const q = query(collection(db, "ecosystems"));
        const ecosystems = []
          try{
            const querySnapshot = await getDocs(q);
            querySnapshot.docs.map((doc) => {
                ecosystems.push({ name:doc.data()?.name, id: doc.id })
              
            })
           
            return ecosystems 

            }catch(e){
            console.log(e)
            throw new Error(e);
            }
    }
}