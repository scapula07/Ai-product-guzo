import { collection,  onSnapshot,
        doc, getDocs,
        query, orderBy, 
        limit,getDoc,setDoc ,
       updateDoc,addDoc } from 'firebase/firestore'
import { db } from '../../Firebase';


export const ecosystemApi = {
  
    getAllEcosystems: async function () {
       

        const q = query(collection(db, "ecosystems"));
        const ecosystems = []
          try{
            const querySnapshot = await getDocs(q);
            querySnapshot.docs.map((doc) => {
                ecosystems.push({ ...doc.data(), id: doc.id })
              
            })
           
            return ecosystems 

            }catch(e){
            console.log(e)
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
                
              const res = await updateDoc(userRef, {
                  pending:[
                     {
                       id:docSnap.id,
                       ...docSnap?.data()
                      }
                    ]
            
                 })

            console.log(res,"resss")
            const userSnap = await getDoc(userRef);
            return {id:userSnap?.id,...userSnap?.data()}
        
                    

             }catch(e){
                 console.log(e)
            }

             

         }
}