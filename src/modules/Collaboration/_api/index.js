import { collection,  onSnapshot,
    doc, getDocs,
    query, orderBy, 
    limit,getDoc,setDoc ,
   updateDoc,addDoc } from 'firebase/firestore'
import { db } from '../../Firebase';


export const collaborationApi = {

    acceptRequest: async function (request,group,index,collab) {
         try{
            const postRef =doc(db,"posts",collab?.id)
            const docSnap = await getDoc(postRef);
            if(docSnap?.exists()){
                console.log(docSnap.data()?.requests[index],"snappp")
                const currentRequest=docSnap.data()?.requests[index]
                console.log(currentRequest,"request")
                const pending= currentRequest?.pending
                const newPending = pending?.filter(pendingmember=> pendingmember?.id !== request?.id);
                console.log(newPending,"new")
               
                console.log(currentRequest,"request 2")
                const partners =currentRequest?.partners?.length ==undefined? []: currentRequest?.partners
                currentRequest["pending"]=newPending
                currentRequest["partners"]=[...partners,request]
                const requests=docSnap.data()?.requests
                requests[index]=currentRequest
                 
                const result = await updateDoc(postRef, {
                   requests:requests
                   })
                console.log(result,"result")
                const contacts=docSnap.data()?.contacts?.length ===undefined? []:docSnap.data()?.contacts

                const result1= await updateDoc(postRef, {
                    contacts:[
                        ...contacts,
                        request
                    ]
                    })
           

               return true
                  

               
            }
          }catch(e){
            console.log(e)
         }
    }


}