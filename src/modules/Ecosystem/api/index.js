import { doc,getDoc,setDoc , updateDoc,collection,addDoc,onSnapshot}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"
import { db } from "../../Firebase";


export const ecosystemApi= {
    getAllMembers:async function (id,currentUser) {

        const ecoRef =doc(db,"ecosystems",id)
        const docSnap = await getDoc(ecoRef);
        // console.log(docSnap?.data())
        // console.log(docSnap?.data().creator===currentUser?.id)
         if(docSnap?.data()?.creator===currentUser?.id){
           return docSnap?.data()
         }
       
       },
       acceptMember:async function (id,member) {
        // console.log(member,"mmm")
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

                   console.log(result,"eco log")

                   if(member?.type?.length >0){
                        const collection=member?.type ==="eco"?"ecosystems" :"organizations"
                        console.log(collection,"ccccc")
                        const memberRef=doc(db,collection,member?.id)
                        const memberSnap = await getDoc(memberRef);
                        console.log(memberSnap?.data(),"members")
                        const members=memberSnap?.data()?.memberships.length ===0? []:memberSnap?.data()?.memberships
                          const result = await updateDoc(memberRef, {
                                memberships:[
                                    ...members,
                                    ...docSnap?.data()
                                  ]
                              })
                              console.log( result ,"member log")
                    

                   }else{
                       const memberRef =doc(db,"users",member?.id)
                         const memberSnap = await getDoc(memberRef);
                         console.log(memberSnap?.data(),"usersss")
                          const result2 = await updateDoc(memberRef, {
                                ecosystems:[
                                    ...member?.ecosystems,
                                    {
                                        ...docSnap?.data()


                                    }
                                ]
                                
                            })
                            console.log( result2 ,"user log")
                               

                    }
                   
                  
              

                
                
                    const memberSnap = await getDoc(ecoRef);
                    console.log(memberSnap,"ecosystem");
                    console.log({active:memberSnap?.data()?.active,pending:memberSnap?.data()?.pending },"new memeber")
                    return {active:memberSnap?.data()?.active,pending:memberSnap?.data()?.pending }

           
            }catch(e){
                console.log(e)
            }
           

        }
    

}