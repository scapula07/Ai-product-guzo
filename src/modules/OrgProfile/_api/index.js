
import { db,auth } from "../../Firebase";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,getDocs,query}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"

export const feedApi= {
    getProfileFeeds: async function (id) {
        const q = query(collection(db, "posts"));
        const feeds= []
          try{
            const querySnapshot = await getDocs(q);
            querySnapshot.docs.map((doc) => {
              feeds.push({ ...doc.data(), id: doc.id })
              
            })
        
            const filter= feeds.filter(feed => feed?.creator_id===id);
            return filter
        
  
        }catch(e){
            console.log(e)
        }
    }

}
