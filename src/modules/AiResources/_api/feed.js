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
        
            // const filterFeeds= feeds.filter(feed => feed?.creator_id===id);
           return feeds
        

        }catch(e){
            console.log(e)
            throw new Error(e);
        }

    },


    makeComments: async function (payload,feed) {
      try{
        const postRef =doc(db,"posts",feed?.id)
        const docSnap = await getDoc(postRef);

        console.log(docSnap,"snappp")


        if(docSnap?.exists()){
          const post=docSnap?.data()
          const comments=post?.comments ==undefined ? [] :post?.comments

          const result = await updateDoc(postRef, {
            comments:[
              ...comments,
              payload
             ]
       
            })
            console.log(result,"result")
            return true
       
         }
      }catch(e){
        console.log(e)
        throw new Error(e);
      }
      

    //   const pendingRequest =currentRequest?.pending ==undefined ? [] :currentRequest?.pending

    //  const pending=[...pendingRequest,request]

     }

}