import { doc,getDoc,setDoc , updateDoc,collection,addDoc,getDocs}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"
import { db } from "../../Firebase"

export const connectApi= {
     getConnections:async function (group) {
         try{

            if(group?.type?.length >0){
               const collection=group?.type ==="eco"?"ecosystems" :"organizations"
               const docRef = doc(db,collection, group?.id);
               const docSnap = await getDoc(docRef);
               console.log(docSnap.data(),"snap")

               return {pending:docSnap.data()?.pendingMemberships,active:docSnap.data()?.active}
            }else{
                const docRef = doc(db,"users", group?.id);
                const docSnap = await getDoc(docRef);
                console.log(docSnap.data(),"snap conne")
                return {pending:docSnap.data()?.pending,active:docSnap.data()?.ecosystems}

            }


          }catch(e){
            console.log(e)
         }
         
       
        

      },
      removeActiveConnections:async function (group,connect) {
           try{
            let collectionName ="ecosystems"
            
            if(connect?.type?.length >0){
               collectionName =connect?.type=="eco"?"ecosystems":"organizations"
            }
        
            const ref =doc(db,collectionName,connect?.id)
            const docSnap = await getDoc(ref);
            console.log(docSnap?.data(),"ecossye")

            const activeConnections=docSnap?.data()?.active?.length ==undefined? []:docSnap?.data()?.active
            const newActive= activeConnections?.filter((active)=>active?.id !=group?.id )

            // const teammates=docSnap?.data()?.teammates?.length ==undefined? []:docSnap?.data()?.teammates
            // const newTeammates= teammates?.filter((teammate)=>teammate?.id !=member?.id )
      
               await updateDoc(ref, {
                  active:[
                     ...newActive,
                    ]         
               })
               console.log("Done 1")
                 const snap = await getDoc(ref);

          
                  if(group?.type?.length >0){
                     const collectionTag =group?.type=="eco"?"ecosystems":"organizations"
                      const connectSnap = await getDoc(doc(db,collectionTag,group?.id));

                      const newActive=connectSnap?.data()?.connections?.filter((eco)=>eco?.id != connect?.id)
                      console.log(connectSnap?.data()?.connections,"old connections")
                      console.log(newActive,"new connections")

                     
                      
                      await updateDoc(doc(db,collectionTag,group?.id), {
                        connections:[
                          ...newActive,
                          
                         ]
                      
                       })
                       console.log("done 2")
   

                   }else{
                        const connectSnap = await getDoc(doc(db,"individuals",group?.id));
                        const newEcosystems=connectSnap?.data()?.connections?.filter((eco)=>eco?.id != connect?.id)
                        await updateDoc(doc(db,"individuals",group?.id), {
                         connections:[
                          ...newEcosystems
                         ]
              
                       })

                 }
             
                return true

            }catch(e){
               console.log(e)
               throw new Error(e)
            }

      },
      removePendingConnections:async function (group,connect) {

         try{
           
            
         
            const collectionName =connect?.type=="eco"?"ecosystems":"organizations"
            
        
            const ref =doc(db,collectionName,connect?.id)
            const docSnap = await getDoc(ref);
            console.log(docSnap?.data(),"ecossye")

            const pendingConnections=docSnap?.data()?.pending?.length ==undefined? []:docSnap?.data()?.pending
            const newPending=pendingConnections?.filter((pending)=>pending?.id !=group?.id )

            const teammates=docSnap?.data()?.teammates?.length ==undefined? []:docSnap?.data()?.teammates
            const newTeammates= teammates?.filter((teammate)=>teammate?.id !=group?.id )
      
               await updateDoc(ref, {
                  pending:[
                     ...newPending,
                   ]         
                })
              

          
                  if(group?.type ==="eco"){
                      const collectionTag =group?.type=="eco"?"ecosystems":"organizations"
                      const connectSnap = await getDoc(doc(db,collectionTag,group?.id));
                      const newPendingMemberships=connectSnap?.data()?.pending?.filter((eco)=>eco?.id != connect?.id)
                      

                      console.log(newPendingMemberships,"pending mem 1")
                 
                      
                      await updateDoc(doc(db,collectionTag,group?.id), {
                        pendingMemberships:[
                          ...newPendingMemberships,
                          
                         ]
                      
                    })
   

                   }else if(group?.type ==="org"){
                     const collectionTag =group?.type=="eco"?"ecosystems":"organizations"
                     const connectSnap = await getDoc(doc(db,collectionTag,group?.id));
                     const newPendingMemberships=connectSnap?.data()?.pendingMemberships?.filter((eco)=>eco?.id != connect?.id)
         
                     console.log(newPendingMemberships,"pending mem 2")
                
                     
                     await updateDoc(doc(db,collectionTag,group?.id), {
                       pendingMemberships:[
                         ...newPendingMemberships,
                         
                        ]
                     
                   })

                     }else{
                         const connectSnap = await getDoc(doc(db,"individuals",group?.id));
                         const newConnects=connectSnap?.data()?.pending?.filter((eco)=>eco?.id !=connect?.id)
                       await updateDoc(doc(db,"individuals",group?.id), {
                        pending:[
                          ...newConnects
                        ]
              
                         })
                    

                   }
              
                return true

            }catch(e){
               console.log(e)
               throw new Error(e)
            }


      }

}