import { collection, onSnapshot, doc, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../../../Firebase'

export const userApi = {
  
    getUserOrg: async function (orgs) {
         try{

         }catch(e){
            console.log(e)
         }
        const q = query(collection(db, "houses"));
        const orgs = []
          try{
            const querySnapshot = await getDocs(q);
            querySnapshot.docs.map((doc) => {
                houses.push({ ...doc.data(), id: doc.id })
              
            })
            return houses

            }catch(e){
            console.log(e)
            }
    
         },

     
  }