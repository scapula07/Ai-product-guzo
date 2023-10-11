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
                        const connections=memberSnap?.data()?.connections.length ===undefined? []:memberSnap?.data()?.connections
                        const newNetworkPending = memberSnap?.data()?.pendingMemberships?.filter(eco=>eco?.id !== docSnap?.id);
                          const result = await updateDoc(memberRef, {
                                connections:[
                                    ...connections,
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
                           const memberRef =doc(db,"individuals",member?.id)
                           const memberSnap = await getDoc(memberRef);
                           console.log(memberSnap?.data()?.pending) 
                           const newUserPending = memberSnap?.data()?.pending?.filter(eco=>eco?.id !== docSnap?.id);
                           const connections = memberSnap?.data()?.connections?.length ===undefined? []:memberSnap?.data()?.connections
                           const result2 = await updateDoc(memberRef, {
                                connections:[
                                    ...connections,
                                    {
                                        // id:docSnap.id,
                                        // ...docSnap?.data()
                                        id:docSnap?.id,
                                        name:docSnap?.data()?.name,
                                        teammates:docSnap?.data()?.teammates,
                                        img:docSnap?.data()?.img,
                                        type:docSnap?.data()?.type
        


                                    }
                                 ],
                              //    ecosystems:[
                              //     ...member?.ecosystems,
                              //     {
                              //         id:docSnap.id,
                              //         ...docSnap?.data()


                              //     }
                              //  ],
                                 pending:[
                                  ...newUserPending
                                 ]
                                
                              })
                            
                               

                        }
                   
                  
              

                
                
                    // const memberSnap = await getDoc(ecoRef);
                    // console.log(memberSnap,"ecosystem");
                    // console.log({active:memberSnap?.data()?.active,pending:memberSnap?.data()?.pending },"new memeber")
                    // return {active:memberSnap?.data()?.active,pending:memberSnap?.data()?.pending,status:true }

                     return true
           
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
                  const memberRef =doc(db,"individuals",member?.id)
                  const memberSnap = await getDoc(memberRef);
                  const pending=memberSnap?.data()?.pending?.length ===undefined? []:memberSnap?.data()?.pending
                  const newPendingRequest= pending?.filter(request=> request?.id !== docSnap?.id);
                  const result2 = await updateDoc(memberRef, {
                      pending:[
                          ...newPendingRequest
                        ]
                        
                      })
                    
                       

                }

                // const memberSnap = await getDoc(ecoRef);
                // console.log(memberSnap,"ecosystem");
                // console.log({active:memberSnap?.data()?.active,pending:memberSnap?.data()?.pending },"new memeber")
                // return {active:memberSnap?.data()?.active,pending:memberSnap?.data()?.pending,status:true }
                  return true


           }catch(e){
             console.log(e)
             throw new Error(e);
           }

        },
        removeMember:async function (group,member) {
             try{

              const collectionName =member?.type=="eco"?"ecosystems":"organizations"
              const ref =doc(db,"ecosystems",group?.id)
              const docSnap = await getDoc(ref);
              console.log(docSnap?.data(),"ecossye")

              const activeMembers=docSnap?.data()?.active?.length ==undefined? []:docSnap?.data()?.active
              const newActive= activeMembers?.filter((active)=>active?.id !=member?.id )

              const teammates=docSnap?.data()?.teammates?.length ==undefined? []:docSnap?.data()?.teammates
              const newTeammates= teammates?.filter((teammate)=>teammate?.id !=member?.id )
        
               await updateDoc(ref, {
                 active:[
                    ...newActive,
                  ],
                  teammates:[
                    ...newTeammates,
                  ]             
               })
               const snap = await getDoc(ref);

            
                   if(member?.type?.length >0){
                        const memberSnap = await getDoc(doc(db,collectionName,member?.id));
                        const newActive=memberSnap?.data()?.connections?.filter((eco)=>eco?.id != group?.id)
                        
                        await updateDoc(doc(db,collectionName,member?.id), {
                          connections:[
                            ...newActive,
                            
                           ]
                        
                      })
     

                     }else{
                          const memberSnap = await getDoc(doc(db,"individuals",member?.id));
                          const newEcosystems=memberSnap?.data()?.connections?.filter((eco)=>eco?.id != group?.id)
                          console.log(memberSnap?.data()?.connections,"old")
                          console.log(newEcosystems,"new")
                        
                          await updateDoc(doc(db,"individuals",member?.id), {
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
        }
    

}