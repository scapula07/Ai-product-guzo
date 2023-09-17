
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
    },
    getAllMembers:async function (id) {
         try{
          const ecoRef =doc(db,"ecosystems",id)
          const docSnap = await getDoc(ecoRef);
 
          return docSnap?.data()?.active
 
         }catch(e){
          throw new Error(e)

         }
      //  if(docSnap?.data()?.creator===currentUser?.id){
      //    return docSnap?.data()
      //  }
     
     },

     fetchProfile:async function (group) {
      try{
       let collectionName="users"
       if(group?.type?.length >0){
         collectionName= group?.type=="eco"?"ecosystems":"organizations"

       }
     
       const profileRef =doc(db,collectionName,group?.id)
       const docSnap = await getDoc(profileRef);

       return docSnap.data()




       }catch(e){
         console.log(e)
         throw new Error(e)
      }
  }

    

}
