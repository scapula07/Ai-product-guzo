import { collection,  onSnapshot,
    doc, getDocs,
    query, orderBy, 
    limit,getDoc,setDoc ,
   updateDoc,addDoc } from 'firebase/firestore'
import { db } from '../../Firebase';


export const feedApi = {
    getEcosystemFeeds: async function (id) {
       
        const q = query(collection(db, "posts"));
        const feeds= []
          try{
            const querySnapshot = await getDocs(q);
            querySnapshot.docs.map((doc) => {
              feeds.push({ ...doc.data(), id: doc.id })
              
            })
        
            const filterFeeds= feeds.filter(feed => feed?.creator_id===id);
           return filterFeeds
        

        }catch(e){
            console.log(e)
        }

    }

}