import { auth ,db} from "../../Firebase";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"



export const createProfile= {
    createUserProfile:async function (uid,displayName,file) {
        console.log(displayName,"name")
        try{
            // console.log(uid,"uid")
            // const storage = getStorage();
            // const fileId=Math.random().toString(36).substring(2,8+2);
            // const storageRef = ref(storage, `/${fileId}`);
            // const userRef =doc(db,"users",uid)
            // const snapshot=await uploadBytes(storageRef, file)
            //  console.log(snapshot,"shote")
           
            //   const result = await updateDoc(userRef, {
            //     username:"john",
            //     img: `https://firebasestorage.googleapis.com/v0/b/${snapshot?.metadata?.bucket}/o/${snapshot?.metadata?.name}?alt=media`,
            //     display:displayName
            //   })
    
            //  console.log(result,"result")
            //  const docSnap = await getDoc(userRef);
            //  console.log(docSnap,"ecosystem")

            //  return {id:docSnap?.id,...docSnap?.data()}

                    const storage = getStorage();
                    const fileId=Math.random().toString(36).substring(2,8+2);
                    const storageRef = ref(storage, `/${fileId}`);
                    const userRef =doc(db,"users",uid)

                     const docSnap = await getDoc(userRef);
                     const snapshot=await uploadBytes(storageRef, file)
                     console.log(snapshot,"shote")

                    const individualSnap = await addDoc(collection(db, "individuals"),{
                        username:"john",
                        img: `https://firebasestorage.googleapis.com/v0/b/${snapshot?.metadata?.bucket}/o/${snapshot?.metadata?.name}?alt=media`,
                        display:displayName,
                        connections:[],
                        pending:[]
                    })

                    const individualRef=doc(db,"individuals",individualSnap?.id)
                    const docIndividualSnap = await getDoc(individualRef);
                    const docIndividual=docIndividualSnap?.data()

            

                    if(docIndividualSnap.exists()) {
                            const result = await updateDoc(userRef, {
                                individual:{
                                    id:docIndividualSnap?.id,
                                    ...docIndividual
                                }
                            
                            })
                      }
                    
            
                    
                    const docIndiv = await getDoc(userRef);
                    console.log(docSnap,"ecosystem")

                    return {id:docIndiv?.id,...docIndiv?.data()}

            }catch(e){
                console.log(e)
                throw new Error(e);
            }




      },
    createOrgProfile:async function (payload,file,currentUser) {
        try{
                console.log("result")
                const storage = getStorage();
                const fileId=Math.random().toString(36).substring(2,8+2);
                const storageRef = ref(storage, `/${fileId}`);
                console.log(storageRef,"shote")
                const userRef =doc(db,"users",payload?.creator)
                const snapshot=await uploadBytes(storageRef, file)
                console.log(snapshot,"shote")
            
                const orgSnap = await addDoc(collection(db, "organizations"),{
                    ...payload,
                    img:`https://firebasestorage.googleapis.com/v0/b/${snapshot?.metadata?.bucket}/o/${snapshot?.metadata?.name}?alt=media`,
                    pending:[],
                    active:[],
                    teammates:[
                        {
                            id:currentUser?.id,
                            img:currentUser?.img?.length != undefined ?currentUser?.img :"",
                            firstName:currentUser?.firstName?.length != undefined? currentUser?.firstName :"",
                            lastName:currentUser?.lastName?.length != undefined? currentUser?.lastName :"",
                            display:currentUser?.display?.length != undefined? currentUser?.display :"",
                            email:currentUser?.email,
    
                        }

                      ],
                    type:"org"
                })
               
               await setDoc(doc(db, "unseen",orgSnap?.id), {
                    messagaes:false,
                    connections:false
                  });


               const orgRef=doc(db,"organizations",orgSnap?.id)
               const docSnap = await getDoc(orgRef);
               const docOrg=docSnap.data()
         
               if (docSnap.exists()) {
              
                    const result = await updateDoc(userRef, {
                            organizations:[
                                ...currentUser?.organizations,
                                {
                                    id:orgSnap?.id,
                                    name:payload?.name,
                                    type:"org",
                                    creator:docOrg?.creator,
                                    img:`https://firebasestorage.googleapis.com/v0/b/${snapshot?.metadata?.bucket}/o/${snapshot?.metadata?.name}?alt=media`,
                                    teammates:[
                                       ...docOrg?.teammates
                                     ]
                                 }
                                ]
                        
                            })
                    
                    
                            console.log(result,"result")
                        const docSnap = await getDoc(userRef);
                        console.log(docSnap,"ecosystem")

                        if(docSnap?.data()?.ecosystems?.length >0){
                    
                            console.log(docSnap.data()?.ecosystems,"new connections")
                            await Promise.all(docSnap.data()?.ecosystems?.map(async(eco,index)=>{
                                    const refEco =doc(db,"ecosystems",eco?.id)
                                    const docEco = await getDoc(refEco);
        
                                    console.log(docEco?.exists(),index,"Exixt")
                                    console.log(index,"index")
                                    if(docEco?.exists()==false){
                                    console.log( docSnap.data()?.connections,"new ecooss")
                                    const newEco=  docSnap.data()?.ecosystems?.filter((ecosystem)=>ecosystem?.id !=eco?.id)
                                    const newConnections= docSnap.data()?.connections?.length ===undefined ?[]:docSnap.data()?.connections?.filter((ecosystem)=>ecosystem?.id !=eco?.id)
                                    const newActiveMembers= docSnap.data()?.active?.length ===undefined ?[]:  docSnap.data()?.active?.filter((member)=>member?.id !=eco?.id)


                                    console.log(newConnections,"new connections")
                                    console.log(newActiveMembers,"new Active")

                                    const result = await updateDoc(userRef, {
                                          ecosystems:[...newEco],
                                          connections:[...newConnections],
                                          active:[...newActiveMembers]
                                          })


                                    
                                   }
                            
                                    
                                })
                              )
                                }

        
                                if(docSnap?.data()?.organizations?.length >0){
                        
                                
                                    await Promise.all(docSnap?.data()?.organizations?.map(async(org)=>{
                                        const refOrg =doc(db,"organizations",org?.id)
                                        const docOrg = await getDoc(refOrg);
                                        if(docOrg?.exists()==false){
                                            console.log( docSnap.data()?.organizations,"new ecooss")
                                            const newOrg=  docSnap.data()?.organizations?.filter((organization)=>organization?.id !=org?.id)
                                            const newConnections=  docSnap.data()?.connections?.filter((ecosystem)=>ecosystem?.id !=org?.id)
                                            const newActiveMembers=  docSnap.data()?.active?.filter((member)=>member?.id !=org?.id)
        
                                            console.log(newOrg,"new ecooss")
        
                                            const result = await updateDoc(userRef, {
                                                organizations:[...newOrg],
                                                connections:[...newConnections],
                                                active:[...newActiveMembers]
                                                  })
                                          }
                                        }))
                                 }

                                console.log(docSnap?.data()?.individual?.id >0,"lengthhhhh")
                                 if(docSnap?.data()?.individual?.id >0){
                
                                     console.log("heer>>>>>>>>>>>>>>>>.")
                                    await new Promise(async(resolve,reject)=>{
                                        const refIndiv =doc(db,"indivdiuals",docSnap?.data()?.individual?.id)
                                        const docIndividual = await getDoc(refIndiv);

                                        console.log(docIndividual?.exists(),"exitss")
                                         if(docIndividual?.exists()==false){
                                              const { individual, ...rest } = docSnap?.data()
                                               await updateDoc(userRef,rest)

                                         }
                                        resolve(true)

                                        })

                                      }
                             
                                    const docUser = await getDoc(userRef);


    
                  
                              return {id:docUser?.id,...docUser?.data()}
                            }

                }catch(e){
                    console.log(e)
                    throw new Error(e);
                }

        
    },
     createEcoProfile:async function (payload,file,currentUser) {
        try{
            console.log("result")
            const storage = getStorage();
            const fileId=Math.random().toString(36).substring(2,8+2);
            const storageRef = ref(storage, `/${fileId}`);
            console.log(storageRef,"shote")
            const userRef =doc(db,"users",payload?.creator)
            const snapshot=await uploadBytes(storageRef, file)
            console.log(snapshot,"shote")
        
            const ecoSnap = await addDoc(collection(db, "ecosystems"),{
                ...payload,
                img:`https://firebasestorage.googleapis.com/v0/b/${snapshot?.metadata?.bucket}/o/${snapshot?.metadata?.name}?alt=media`,
                pending:[],
                active:[ ],
                teammates:[
                    {     
                        id:currentUser?.id,
                        img:currentUser?.img?.length != undefined ?currentUser?.img :"",
                        firstName:currentUser?.firstName?.length != undefined? currentUser?.firstName :"",
                        lastName:currentUser?.lastName?.length != undefined? currentUser?.lastName :"",
                        display:currentUser?.display?.length != undefined? currentUser?.display :"",
                        email:currentUser?.email,
                    }
                  ],
                type:"eco",
               })
     
            await setDoc(doc(db, "unseen",ecoSnap?.id), {
                messagaes:false,
                ecosystems:false,
                connections:false
              });
            console.log(ecoSnap,"ecosnap")
            const ecoRef=doc(db,"ecosystems",ecoSnap?.id)
            const docSnap = await getDoc(ecoRef);
            const docEco=docSnap.data()
            console.log(doc,"ecosystem doc")

            if (docSnap.exists()) {
              
                const result = await updateDoc(userRef, {
                    ecosystems:[
                        ...currentUser?.ecosystems,
                        {
                                id:ecoSnap?.id,
                                name:payload?.name,
                                creator:docEco?.creator,
                                type:"eco",
                                img:`https://firebasestorage.googleapis.com/v0/b/${snapshot?.metadata?.bucket}/o/${snapshot?.metadata?.name}?alt=media`,
                                teammates:[
                                    ...docEco?.teammates
                                ]
                          }
                        ]
                
                     })
                const docSnap = await getDoc(userRef);
              
                    console.log(docSnap,"ecosystem")
                       if(docSnap?.data()?.ecosystems?.length >0){
                    
                                console.log(docSnap.data()?.ecosystems,"new connections")
                                await Promise.all(docSnap.data()?.ecosystems?.map(async(eco,index)=>{
                                        const refEco =doc(db,"ecosystems",eco?.id)
                                        const docEco = await getDoc(refEco);
            
                                        console.log(docEco?.exists(),index,"Exixt")
                                        console.log(index,"index")
                                        if(docEco?.exists()==false){
                                        console.log( docSnap.data()?.connections,"new ecooss")
                                        const newEco=  docSnap.data()?.ecosystems?.filter((ecosystem)=>ecosystem?.id !=eco?.id)
                                        const newConnections= docSnap.data()?.connections?.length ===undefined ?[]:docSnap.data()?.connections?.filter((ecosystem)=>ecosystem?.id !=eco?.id)
                                        const newActiveMembers= docSnap.data()?.active?.length ===undefined ?[]:  docSnap.data()?.active?.filter((member)=>member?.id !=eco?.id)


                                        console.log(newConnections,"new connections")
                                        console.log(newActiveMembers,"new Active")

                                        const result = await updateDoc(userRef, {
                                              ecosystems:[...newEco],
                                              connections:[...newConnections],
                                              active:[...newActiveMembers]
                                              })


                                        
                                       }
                                
                                        
                                    })
                                  )
                                    }

                            if(docSnap?.data()?.organizations?.length >0){
                        
                                
                                await Promise.all(docSnap?.data()?.organizations?.map(async(org)=>{
                                    const refOrg =doc(db,"organizations",org?.id)
                                    const docOrg = await getDoc(refOrg);
                                    if(docOrg?.exists()==false){
                                        console.log( docSnap.data()?.organizations,"new ecooss")
                                        const newOrg=  docSnap.data()?.organizations?.filter((organization)=>organization?.id !=org?.id)
                                        const newConnections=  docSnap.data()?.connections?.filter((ecosystem)=>ecosystem?.id !=org?.id)
                                        const newActiveMembers=  docSnap.data()?.active?.filter((member)=>member?.id !=org?.id)
    
                                        console.log(newOrg,"new ecooss")
    
                                        const result = await updateDoc(userRef, {
                                            organizations:[...newOrg],
                                            connections:[...newConnections],
                                            active:[...newActiveMembers]
                                              })
                                     }
                                    }))
                                    }
    
                                const docUser = await getDoc(userRef);

              
                   return {id:docUser?.id,...docUser?.data()}
                // return {id:docSnap?.id,...docSnap?.data()}
            
            
                    console.log(result,"result")
              } else {
                
                console.log("No such document!");
              }

         

            }catch(e){
                console.log(e)
                throw new Error(e);
            }
        
    }

}