import { doc,getDoc,setDoc , updateDoc,collection,addDoc,onSnapshot}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"
import { db } from "../../Firebase";


export const ecosystemApi= {
    getAllMembers:async function (id,currentUser) {

        const ecoRef =doc(db,"ecosystems",id)
        const docSnap = await getDoc(ecoRef);
        return docSnap?.data()
        //  if(docSnap?.data()?.creator===currentUser?.id){
        
        //  }
       
       },
       acceptMember:async function (id,member) {
  
            try{
                const ecoRef =doc(db,"ecosystems",id)
                const docSnap = await getDoc(ecoRef);
                const pending = docSnap?.data()?.pending
                const activeMembers = docSnap?.data()?.active

                const newPending = pending?.filter(pendingmember=> pendingmember?.id !== member?.id);

                  const result = await updateDoc(ecoRef, {
                    pending:[...newPending],
                    active:[
                        ...activeMembers,
                        member
                     ]
                   })


                   if(member?.type?.length >0){
                        const collection=member?.type ==="eco"?"ecosystems" :"organizations"
                        const memberRef=doc(db,collection,member?.id)
                        const memberSnap = await getDoc(memberRef);
                        console.log(memberSnap?.data(),"members")
                        const active=memberSnap?.data()?.active.length ===undefined? []:memberSnap?.data()?.active
                        const newNetworkPending = memberSnap?.data()?.pendingMemberships?.filter(eco=>eco?.id !== docSnap?.id);
                          const result = await updateDoc(memberRef, {
                                active:[
                                    ...active,
                                    {
                                      id:docSnap.id,
                                    ...docSnap?.data()
                                    }
                                  ],
                                pendingMemberships:[
                                    ...newNetworkPending
                                  ]
                               })
                    

                      }else{
                          const memberRef =doc(db,"users",member?.id)
                          const memberSnap = await getDoc(memberRef);
                           console.log(memberSnap?.data()?.pending) 
                           const newUserPending = memberSnap?.data()?.pending?.filter(eco=>eco?.id !== docSnap?.id);
                           const result2 = await updateDoc(memberRef, {
                                ecosystems:[
                                    ...member?.ecosystems,
                                    {
                                        id:docSnap.id,
                                        ...docSnap?.data()


                                    }
                                 ],
                                 pending:[
                                  ...newUserPending
                                 ]
                                
                              })
                            
                               

                        }
                   
                  
              

                
                
                    const memberSnap = await getDoc(ecoRef);
                    console.log(memberSnap,"ecosystem");
                    console.log({active:memberSnap?.data()?.active,pending:memberSnap?.data()?.pending },"new memeber")
                    return {active:memberSnap?.data()?.active,pending:memberSnap?.data()?.pending,status:true }

           
            }catch(e){
                console.log(e)
                throw new Error(e);
            }
           

        },
       ignore:async function (id,member) {
          try{
            const ecoRef =doc(db,"ecosystems",id)
            const docSnap = await getDoc(ecoRef);
            const pending = docSnap?.data()?.pending

            const newPending = pending?.filter(pendingmember=> pendingmember?.id !== member?.id);

            const result = await updateDoc(ecoRef, {
                pending:[...newPending]
               })

               if(member?.type?.length >0){
                const collection=member?.type ==="eco"?"ecosystems" :"organizations"
                const memberRef=doc(db,collection,member?.id)
                const memberSnap = await getDoc(memberRef);
                console.log(memberSnap?.data(),"members")
                const pending=memberSnap?.data()?.pendingMemberships?.length ===undefined? []:memberSnap?.data()?.pendingMemberships
                const newPendingRequest= pending?.filter(request=> request?.id !== docSnap?.id);
                  const result = await updateDoc(memberRef, {
                    pendingMemberships:[
                            ...newPendingRequest,
                          ]
                      })
            

              }else{
                  const memberRef =doc(db,"users",member?.id)
                  const memberSnap = await getDoc(memberRef);
                  const pending=memberSnap?.data()?.pending?.length ===undefined? []:memberSnap?.data()?.pending
                  const newPendingRequest= pending?.filter(request=> request?.id !== docSnap?.id);
                  const result2 = await updateDoc(memberRef, {
                        pending:[
                            ...newPendingRequest
                         ]
                        
                      })
                    
                       

                }

                const memberSnap = await getDoc(ecoRef);
                console.log(memberSnap,"ecosystem");
                console.log({active:memberSnap?.data()?.active,pending:memberSnap?.data()?.pending },"new memeber")
                return {active:memberSnap?.data()?.active,pending:memberSnap?.data()?.pending,status:true }


           }catch(e){
             console.log(e)
             throw new Error(e);
           }

        }
    

}