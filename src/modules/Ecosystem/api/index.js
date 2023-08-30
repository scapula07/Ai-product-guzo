import { doc,getDoc,setDoc , updateDoc,collection,addDoc,onSnapshot}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"
import { db } from "../../Firebase";


export const ecosystemApi= {
    getAllMembers:async function (id,currentUser) {

        const ecoRef =doc(db,"ecosystems",id)
        const docSnap = await getDoc(ecoRef);
        console.log(docSnap?.data())
        console.log(docSnap?.data().creator===currentUser?.id)
         if(docSnap?.data().creator===currentUser?.id){
           return docSnap?.data()
         }
        // const unsub = onSnapshot(doc(db,"ecosystems",id), (doc) => {
        //     console.log("Current data: ", doc.data()?.creator);
        //     if(doc?.data()?.creator !=currentUser?.id) return ;
        //     return doc?.data()
               
              
        // });
       
         
        
        

       },
       acceptMember:async function (id,member) {
        console.log(member,"mmm")
            try{
                    const ecoRef =doc(db,"ecosystems",id)
                    const docSnap = await getDoc(ecoRef);
                    console.log(docSnap?.data())
                    const pending = docSnap?.data()?.pending
                    const activeMembers = docSnap?.data()?.active

                    const newPending = pending?.filter(member=> member?.id !== member?.id);
                    console.log(newPending,"new")


                
                console.log(pending,"pending")
                  const result = await updateDoc(ecoRef, {
                    pending:[...newPending],
                    active:[
                        ...activeMembers,
                        member
                     ]
                   })
                    const userRef =doc(db,"users",member?.id)
                  
                    const result2 = await updateDoc(userRef, {
                        ecosystems:[
                            ...member?.ecosystems,
                            {
                                ...docSnap?.data()


                            }
                        ]
                        
                    })

                
                 console.log(result2,"result")
                const memberSnap = await getDoc(ecoRef);
                console.log(docSnap,"ecosystem")
                return docSnap?.data()
           
            }catch(e){
                console.log(e)
            }
           

        }
    

}