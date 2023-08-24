import { collection, onSnapshot, doc, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db,auth } from '../Firebase';
import { signOut} from 'firebase/auth';

export const userApi = {
  
    getUserOrg: async function () {
         try{

         }catch(e){
            console.log(e)
         }
        const q = query(collection(db, "houses"));
        const orgs = []
          try{
            const querySnapshot = await getDocs(q);
            querySnapshot.docs.map((doc) => {
                orgs.push({ ...doc.data(), id: doc.id })
              
            })
            return orgs 

            }catch(e){
            console.log(e)
            }
    
         },
         logout: async function () {
            try{
                const response=await signOut(auth)
                console.log(response,"logout")
                return response
            }catch(e){
                console.log(e)
            }
          

         }
         

     
  }