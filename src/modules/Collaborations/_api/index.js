import { collection,  onSnapshot,
    doc, getDocs,
    query, orderBy, 
    limit,getDoc,setDoc ,
   updateDoc,addDoc } from 'firebase/firestore'
import { db } from '../../Firebase';


export const collaborationApi = {
    getAllCollaborations: async function (id) {
        const q = query(collection(db, "posts"));
        const collabs= []
          try{
            const querySnapshot = await getDocs(q);
            querySnapshot.docs.map((doc) => {
              collabs.push({ ...doc.data(), id: doc.id })
              
            })
        
            const filter= collabs.filter(feed => feed?.creator_id===id);
           return filter
        

        }catch(e){
            console.log(e)
        }
    }
}