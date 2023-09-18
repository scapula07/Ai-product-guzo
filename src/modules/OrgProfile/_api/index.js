
import { db,auth } from "../../Firebase";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,getDocs,query,where}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"

export const feedApi= {
    getProfileFeeds: async function (id) {
      console.log(id,"iddddd")
        // const q = query(collection(db, "posts"));
        const feeds= []
          try{
            const q = query(collection(db, "posts"), where("creator_id", "==",id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              feeds.push({ ...doc.data(), id: doc.id })
            });


            console.log(feeds,"feddddds")


            // const querySnapshot = await getDocs(q);
            // querySnapshot.docs.map((doc) => {
            //  
              
            // })
        
            // const filter= feeds.filter(feed => feed?.creator_id===id);
             return feeds
        
  
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
