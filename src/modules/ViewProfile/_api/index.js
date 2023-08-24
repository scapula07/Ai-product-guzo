import { collection,  onSnapshot,
    doc, getDocs,
    query, orderBy, 
    limit,getDoc,setDoc ,
   updateDoc,addDoc } from 'firebase/firestore'
import { db } from '../../Firebase';


export const ecosystemApi = {

   getEcosystem: async function (id) {
   
       const ecoRef =doc(db,"ecosystems",id)
   
      try{
         const docSnap = await getDoc(ecoRef);
         const ecosystem =docSnap?.data()

         return ecosystem

        }catch(e){
        console.log(e)
        }
     }
}