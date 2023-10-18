import { collection,  onSnapshot,
    doc, getDocs,
    query, orderBy, 
    limit,getDoc,setDoc ,
   updateDoc,addDoc ,deleteDoc ,where,or} from 'firebase/firestore'
import { db } from '../../Firebase';


export const postApi = {
    deletePost: async function (collab,group) {
        try{
           await deleteDoc(doc(db, "posts", collab?.id));

           const q = query(
              collection(db, 'posts'),
              or(where('creator_id', '==', group?.id),
                where('access', 'array-contains', group?.id)
              ),orderBy('createdAt', 'desc')
             );
        
           const snapshot =await getDocs(q)
           const data= snapshot?.docs?.map((doc)=> ({...doc?.data(),id:doc?.id}) )
           return {post: data,status:true}

           


         }catch(e){
           console.log(e)
           throw new Error(e);
         }
     }


}