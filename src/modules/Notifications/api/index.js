import { collection,  onSnapshot,
    doc, getDocs,
    query, orderBy, 
    limit,getDoc,setDoc ,
   updateDoc,addDoc ,deleteDoc, where} from 'firebase/firestore'
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

   acceptTeamInvite:async function (id,from,user,name,img) {
       try{  
              const collectionName =from?.type=="eco"?"ecosystems":"organizations"
            //   console.log(collection,"ccolll")
              const ref =doc(db,collectionName,from?.id)
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
               const snap = await getDoc(ref);
               if(from?.type=="eco"){
                  await updateDoc(doc(db,"users",user?.id), {
                    ecosystems:[
                      ...user?.ecosystems,
                        {
                            id:snap.id,
                          ...snap?.data()
  
  
                        }
                    ]
                  
                  })
                 }else{
                  await updateDoc(doc(db,"users",user?.id), {
                    organizations:[
                      ...user?.organizations,
                        {
                            id:snap.id,
                          ...snap?.data()


                        }
                    ]
                  
                  })

               }

               const userSnap = await getDoc(doc(db,"users",user?.id));
               const userData=userSnap?.data()
               userSnap?.id?.length &&localStorage.clear();
               userSnap?.id.length >0&&localStorage.setItem('user',JSON.stringify(userData));
               await deleteDoc(doc(db, "notifications", id));

               const notificationSnap = await addDoc(collection(db, "notifications"),{
                name:name,
                img:img,
                message:`You have accepted ${name} invitation`,
                type:"action",
                to:user?.id
    
              })


              //  const q = query(collection(db, "notifications"), where("to","==",user?.id));
        
              //  const snapshot =await getDocs(q)
              //  const notifications= snapshot?.docs?.map((doc)=> ({...doc?.data(),id:doc?.id}) )

              //  return {notifications: notifications,status:true}
              

            return true
       }catch(e){
        console.log(e)
        throw new Error(e)
       }
   },

   declineTeamInvite:async function (id,from,user,name,img) {
       try{
                const collectionName =from?.type=="eco"?"ecosystems":"organizations"
                //   console.log(collection,"ccolll")
                  const ref =doc(db,collectionName,from?.id)
                  const docSnap = await getDoc(ref);
                  console.log(docSnap?.data(),"ecossye")

                
                  const invitees=docSnap?.data()?.invitees?.filter(invitee=> invitee?.email !== user?.email);

                  console.log(docSnap?.data()?.invitees,invitees,"invitees")
                  await updateDoc(ref, {
                    invitees:[
                        ...invitees
                      ]
                    })
                    await deleteDoc(doc(db, "notifications", id));
                    const notificationSnap = await addDoc(collection(db, "notifications"),{
                      user:user?.firstName?.length !=undefined ?user?.firstName + " " +user?.lastName : user?.display ,
                      img:user?.img,
                      message:`Has declined invitation to ${name}`,
                      type:"action",
                      to:from?.id
          
                    })
                     await addDoc(collection(db, "notifications"),{
                      name:name,
                      img:img,
                      message:`You have declined ${name} invitation`,
                      type:"action",
                      to:user?.id
          
                    })

                    return true
      

       }catch(e){
        console.log(e)
        throw new Error(e)
       }
   }


    }