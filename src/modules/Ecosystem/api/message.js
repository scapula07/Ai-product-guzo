import { collection,  onSnapshot,
    doc, getDocs,
    query, orderBy, 
    limit,getDoc,setDoc ,
   updateDoc,addDoc } from 'firebase/firestore'
import { db } from '../../Firebase';




export const messageApi = {
    startConversation: async function (member,currentUser) {
        console.log(member,"api")
        console.log(currentUser,"user")
        try{
            const payload={
                members:[
                    currentUser?.id,
                    member?.id
                   ],
                info:[
                    currentUser,
                    member
                ]
              }
              try{
                const docRef = await addDoc(collection(db, "conversations"),payload);
                console.log(docRef)
                const docSnap = await getDoc(docRef);
                console.log(docSnap.data(),doc.id,"third")

                return docSnap.exists()
              
             
             }catch (err) {
             console.log(err)
            }
        }catch(e){
            console.log(e)
        }

    }

}