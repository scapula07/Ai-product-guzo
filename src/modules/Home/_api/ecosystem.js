import { collection, onSnapshot, doc, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../../Firebase';


export const ecosystemApi = {
  
    getAllEcosystems: async function () {

        const q = query(collection(db, "ecosystems"));
        const ecosystems = []
          try{
            const querySnapshot = await getDocs(q);
            querySnapshot.docs.map((doc) => {
                ecosystems.push({ ...doc.data(), id: doc.id })
              
            })
            return ecosystems 

            }catch(e){
            console.log(e)
            }
      }
}