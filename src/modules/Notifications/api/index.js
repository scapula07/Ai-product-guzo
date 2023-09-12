import { collection,  onSnapshot,
    doc, getDocs,
    query, orderBy, 
    limit,getDoc,setDoc ,
   updateDoc,addDoc ,where} from 'firebase/firestore'
import { db } from '../../Firebase';


export const notificationApi = {
   getNotifications:async function (id) {
       try{
            const q = query(collection(db, "notifications"), where("to","==",id));
        
            const snapshot =await getDocs(q)
            const notifications= snapshot?.docs?.map((doc)=> ({...doc?.data(),id:doc?.id}) )

            return notifications
         
        }catch(e){
         console.log(e)
         throw new Error(e)
        }

   },

   acceptTeamInvite:async function (from,user) {
       try{  
              const collection =from?.type=="eco"?"ecosystems":"organizations"
              console.log(collection,"ccolll")
              const ref =doc(db,collection,from?.id)
              const docSnap = await getDoc(ref);
              console.log(docSnap?.data(),"ecossye")

              const teammates=docSnap?.data()?.teammates?.length ==undefined? []:docSnap?.data()?.teammates
              const active=docSnap?.data()?.teammates?.active ==undefined? []:docSnap?.data()?.active
              const invitees=docSnap?.data()?.invitees?.filter(invitee=> invitee?.email !== user?.email);

              console.log(docSnap?.data()?.invitees,invitees,"invitees")
               await updateDoc(ref, {
                teammates:[
                    ...teammates,
                    user
    
                ],
                active:[
                    ...active,
                    user
                 ],
                 invitees:[
                    ...invitees
                 ]
               })
               
                await updateDoc(doc(db,"users",user?.id), {
                ecosystems:[
                    ...user?.ecosystems,
                    {
                        ...docSnap?.data()


                    }
                  ]
                
               })

               const q = query(collection(db, "notifications"), where("to","==",user?.id));
        
               const snapshot =await getDocs(q)
               const notifications= snapshot?.docs?.map((doc)=> ({...doc?.data(),id:doc?.id}) )

               return {notifications: notifications,status:true}
              

          
       }catch(e){
        console.log(e)
        throw new Error(e)
       }
   }


}