import { collection,  onSnapshot,
    doc, getDocs,
    query, orderBy, 
    limit,getDoc,setDoc ,
   updateDoc,addDoc } from 'firebase/firestore'
import { db } from '../../Firebase';


export const postApi = {

joinPost: async function (feed,request,index,group) {
   try{
    console.log(feed,request,index,"rrrrr")

    const postRef =doc(db,"posts",feed?.id)
    const docSnap = await getDoc(postRef);
    if(docSnap?.exists()){
        console.log(docSnap.data()?.requests[index],"snappp")
        const currentRequest=docSnap.data()?.requests[index]
        const requests=docSnap.data()?.requests
        let newArray = requests.slice(0,index).concat(requests.slice(index + 1));
      
   
  

        const pendingRequest =currentRequest?.pending ==undefined ? [] :currentRequest?.pending

        const pending=[...pendingRequest,request]
        currentRequest["pending"]=pending
        const newRequests=[...newArray,currentRequest]
        console.log(newRequests,"new")


        const contacts=docSnap.data()?.contacts?.length ===undefined? []:docSnap.data()?.contacts
        const contactIds=docSnap.data()?.contactIds?.length ===undefined? []:docSnap.data()?.contactIds

        const result = await updateDoc(postRef, {
           requests:newRequests,
           contacts:[
             ...contacts,
             request
           ],
           contactIds:[
            ...contactIds,
               group?.id

             ]
      
           })
            console.log(result,"ress")
          }


        return true

       
    }catch(e){
      console.log(e)
      throw new Error(e);
   }
   
  }


}