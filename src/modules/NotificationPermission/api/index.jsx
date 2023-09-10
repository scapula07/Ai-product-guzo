import { collection,  onSnapshot,
    doc, getDocs,
    query, orderBy, 
    limit,getDoc,setDoc ,
   updateDoc,addDoc ,deleteDoc } from 'firebase/firestore'
import { db } from '../../Firebase';


export const notificationApi = {
     updateNotificationToken:async(currentUser,currentToken)=>{
        try{
            const userRef =doc(db,"users",currentUser?.id)
              const result = await updateDoc(userRef, {
                notificationToken:currentToken
              })

              const docSnap = await getDoc(userRef);
              console.log(docSnap,"ecosystem")
 
              return {id:docSnap?.id,...docSnap?.data()}
              
          }catch(e){
            console.log(e)
         }
      }

}
