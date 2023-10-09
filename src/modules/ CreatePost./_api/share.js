import { db,auth } from "../../Firebase";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,query,getDocs}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"


export const shareApi= {
    getAllEcosytems:async function (group) {
        console.log(group,"gropp")
        let collectionName="users"
        try{
          if(group?.type?.length >0){
              collectionName= group?.type=="eco"?"ecosystems":"organizations"
              const docRef = doc(db, collectionName, group?.id);
              const docSnap = await getDoc(docRef);
            // const ecosystems=docSnap?.data()?.memberships
              const ecosystems=docSnap?.data()?.active
       
              return ecosystems 
    
            }else{
                const docRef = doc(db, "users", group?.id);
                const docSnap = await getDoc(docRef);
                const ecosystems=docSnap?.data()?.ecosystems


                //  const q = query(collection(db, collectionName));
                //  const ecosystems = []
        
                // const querySnapshot = await getDocs(q);
                // querySnapshot.docs.map((doc) => {
                //     ecosystems.push({ name:doc.data()?.name, id: doc.id })
                
                // })
            
                return ecosystems 

            }
        

            }catch(e){
            console.log(e)
            throw new Error(e);
            }
    }
}