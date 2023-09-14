import { collection,  onSnapshot,
    doc, getDocs,
    query, orderBy, 
    limit,getDoc,setDoc ,
   updateDoc,addDoc ,deleteDoc ,where} from 'firebase/firestore'
import { db } from '../../Firebase';


export const collaborationApi = {

    acceptRequest: async function (request,group,index,collab) {
         try{
            const postRef =doc(db,"posts",collab?.id)
            const docSnap = await getDoc(postRef);
            if(docSnap?.exists()){
               
                const currentRequest=docSnap.data()?.requests[index]
             
                const pending= currentRequest?.pending
                const newPending = pending?.filter(pendingmember=> pendingmember?.id !== request?.id);
         
                const partners =currentRequest?.partners?.length ==undefined? []: currentRequest?.partners
                currentRequest["pending"]=newPending
                currentRequest["partners"]=[...partners,request]
                const requests=docSnap.data()?.requests
                requests[index]=currentRequest
                 
                const contacts=docSnap.data()?.contacts?.length ===undefined? []:docSnap.data()?.contacts
                const contact=contacts?.find((contact)=>contact?.email==request?.email)
                const indexContact=contacts?.findIndex((contact)=>contact?.email==request?.email)

                contact["active"]=true
           

                contacts[indexContact]=contact
            
        

                 await updateDoc(postRef, {
                    requests:requests,
                    contacts:[
                        ...contacts,
                    
                    ]
                    })
           
               
                    const postSnap = await getDoc(postRef);
                    const groupRef=doc(db,"group",postSnap?.id)
                    const postChat = await getDoc(groupRef);
                    const members =postChat?.data()?.members?.length==undefined?[]:postChat?.data()?.members
                    await updateDoc(groupRef, {
                      members:[
                         ...members,
                         request?.id

                         
                       ],
                     
                      })

            
                    return {reqs:postSnap?.data()?.requests,status:true }

            
                  

               
              }
           }catch(e){
            console.log(e)
            throw new Error(e);
          }
       },
    ignoreRequest: async function (request,group,index,collab) {
         try{
          const postRef =doc(db,"posts",collab?.id)
          const docSnap = await getDoc(postRef);
          if(docSnap?.exists()){
             
              const currentRequest=docSnap.data()?.requests[index]
           
              const pending= currentRequest?.pending
              const newPending = pending?.filter(pendingmember=> pendingmember?.id !== request?.id);
              currentRequest["pending"]=newPending
              const requests=docSnap.data()?.requests
               requests[index]=currentRequest
               await updateDoc(postRef, {
                requests:requests
                })
       
           
                const postSnap = await getDoc(postRef);
        
              return {reqs:postSnap?.data()?.requests,status:true }
          } 

         }catch(e){
            console.log(e)
            throw new Error(e)
         }
    },
    deletePost: async function (collab) {
         try{
            await deleteDoc(doc(db, "posts", collab?.id));
            return true


          }catch(e){
            console.log(e)
            throw new Error(e);
          }
      }



}