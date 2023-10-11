import { collection,  onSnapshot,
        doc, getDocs,
        query, orderBy, 
        limit,getDoc,setDoc ,
       updateDoc,addDoc } from 'firebase/firestore'
import { db } from '../../Firebase';


export const ecosystemApi = {
  
    getAllEcosystems: async function () {
       

        const q = query(collection(db, "ecosystems"));
        // const ecosystems = []
          try{
            // const querySnapshot = await getDocs(q);
            // querySnapshot.docs.map((doc) => {
            //     ecosystems.push({ ...doc.data(), id: doc.id })
              
            // })
           
            // return ecosystems 

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
              const ecosystems = []
              querySnapshot.forEach((doc) => {
                    ecosystems.push({ ...doc.data(), id: doc.id })
                    console.log({ ...doc.data(), id: doc.id },"ecosystem")
              });

              console.log(ecosystems,"apiii")
              return ecosystems 

         
            });
            // unsubscribe()

            // console.log(ecosystems,"api eee")
           
           

            }catch(e){
            console.log(e)
            throw new Error(e);
            }
      },

        joinRequest: async function (ecoId,currentUser,group) {
            
            try{
                
                 const ecoRef =doc(db,"ecosystems",ecoId)
                 const userRef =doc(db,"users",currentUser?.id)
                 const docSnap = await getDoc(ecoRef);
                 const ecosystem =docSnap?.data()
                 const pendingMembers =ecosystem?.pending
                 console.log()
                 const result = await updateDoc(ecoRef, {
                    pending:[
                        ...pendingMembers,
                        {
                           ...group
                        }
                       ]
                     })
                  
                  console.log(result,"result")
                
            //   const res = await updateDoc(userRef, {
            //       pending:[
            //          {
            //            id:docSnap.id,
            //            ...docSnap?.data()
            //           }
            //         ]
            
            //      })

            // console.log(res,"resss")
            // const userSnap = await getDoc(userRef);
            // return {id:userSnap?.id,...userSnap?.data()}

         if(group?.type?.length >0){
              const collection=group?.type ==="eco"?"ecosystems" :"organizations"
              console.log(collection,"ccccc")
              const groupRef=doc(db,collection,group?.id)
              const groupSnap = await getDoc(groupRef);
              console.log(groupSnap?.data(),"members")
              const pending=groupSnap?.data()?.pendingMemberships?.length ===undefined? []:groupSnap?.data()?.pendingMemberships
                const result = await updateDoc(groupRef, {
                      pendingMemberships:[
                          ...pending,
                          {
                            id:docSnap?.id,
                            name:docSnap?.data()?.name,
                            teammates:docSnap?.data()?.teammates,
                            img:docSnap?.data()?.img,
                            type:docSnap?.data()?.type
                          }
                        ]
                    })
                    console.log( result ,"member log")

                  
          

            }else{
                    const userRef =doc(db,"individuals",group?.id)
                    const userSnap = await getDoc(userRef);
                    console.log(userSnap?.data(),"usersss")
                    const pending=userSnap?.data()?.pending?.length ===undefined? []:userSnap?.data()?.pending
                    console.log(pending,"pendnn")
                    const result2 = await updateDoc(userRef, {
                         pending:[
                              ...pending,
                              {
                                 id:docSnap?.id,
                                name:docSnap?.data()?.name,
                                teammates:docSnap?.data()?.teammates,
                                img:docSnap?.data()?.img,
                                type:docSnap?.data()?.type


                              }
                          ]
                          
                      })
                      console.log( result2 ,"user log")


                      
                        

              }
            
               return true     

             }catch(e){
                 console.log(e)
                 throw new Error(e);
            }

             

         }
}