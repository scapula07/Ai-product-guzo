import { auth ,db} from "../../Firebase";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"



export const createProfile= {
    createUserProfile:async function (uid,displayName,file) {
        console.log(displayName,"name")
        try{
            console.log(uid,"uid")
            const storage = getStorage();
            const fileId=Math.random().toString(36).substring(2,8+2);
            const storageRef = ref(storage, `/${fileId}`);
            const userRef =doc(db,"users",uid)
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
                    await setDoc(doc(db, "unseen",individualSnap?.id), {
                        messgaes:false,
                        connections:false,
                        notifications:false
                      });
               }
              
    
            
             const docSnap = await getDoc(userRef);
             console.log(docSnap,"ecosystem")

             return {id:docSnap?.id,...docSnap?.data()}

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
                    active:[
                       
                     ],
                    teammates:[
                        currentUser

                      ],
                    type:"org"
                })

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
                                    creator:docOrg?.creator,
                                    type:"org",
                                    img:`https://firebasestorage.googleapis.com/v0/b/${snapshot?.metadata?.bucket}/o/${snapshot?.metadata?.name}?alt=media`,
                                    teammates:[
                                       ...docOrg?.teammates
                                     ]
                                }
                                ]
                        
                            })
                        
                         await setDoc(doc(db, "unseen",orgSnap?.id), {
                            messgaes:false,
                            connections:false,
                            notifications:false
                          });
                    
                        console.log(result,"result")
                        const docSnap = await getDoc(userRef);
                        console.log(docSnap,"ecosystem")
        
                        return {id:docSnap?.id,...docSnap?.data()}
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
                active:[
                 
                ],
                teammates:[
                    currentUser
                ],
                type:"eco",
            })
     
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

                 await setDoc(doc(db, "unseen",ecoSnap?.id), {
                      messgaes:false,
                      ecosystems:false,
                      connections:false,
                      notifications:false
                   });
                const docSnap = await getDoc(userRef);
                console.log(docSnap,"ecosystem")

                return {id:docSnap?.id,...docSnap?.data()}
            
            
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