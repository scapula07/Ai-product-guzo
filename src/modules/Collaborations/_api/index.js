import { collection,  onSnapshot,
    doc, getDocs,
    query, orderBy, 
    limit,getDoc,setDoc ,
   updateDoc,addDoc ,where} from 'firebase/firestore'
import { db } from '../../Firebase';


export const collaborationApi = {
    getAllCollaborations: async function (id) {  //change to firebase query
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
      },
      getJoinedCollaborations: async function (group) {
         try{
          const collabs= []


          const q = query(collection(db, "posts"), where("contactIds", "array-contains", group?.id));
          const querySnapshot = await getDocs(q);
            querySnapshot.docs.map((doc) => {
               collabs.push({ ...doc.data(), id: doc.id })
            
          })

           console.log(collabs,"collabs")
           const activePosts=[]
           const pendingPosts=[]
            collabs?.forEach((collab)=>{
              const active =collab?.contacts?.some(contact=>contact?.active ===true)
        

              if(active){
                activePosts.push(collab)
               }else{
                pendingPosts.push(collab)
              }
              
               
              
              

            })
            console.log(activePosts,"activeee")
            console.log(pendingPosts,"pending")
           return {active:activePosts,pending:pendingPosts};

          console.log(collabs,"joined collabs")
          }catch(e){
              console.log(e)
          }

      }


}