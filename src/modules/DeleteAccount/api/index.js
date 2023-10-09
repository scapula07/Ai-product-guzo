import { collection,  onSnapshot,
    doc, getDocs,
    query, orderBy, 
    limit,getDoc,setDoc ,
   updateDoc,addDoc ,deleteDoc } from 'firebase/firestore'
import { db } from '../../Firebase';


export const deleteProfile = {
    deleteAccount: async function (group,currentUser) {
        console.log(currentUser,"user")

       
        let collectionName="users"
         if(group?.type?.length >0){
              collectionName= group?.type=="eco"?"ecosystems":"organizations"
  
          }
         try{
            if(group?.type?.length >0){
                await deleteDoc(doc(db,collectionName,group?.id));
            }

           

        const ref =doc(db,"users",currentUser?.id)
        const docSnap = await getDoc(ref);
          
        if(group?.type=="eco"){
            const newEcosystems= docSnap.data()?.ecosystems?.filter((eco)=>eco?.id != group?.id)
            const result = await updateDoc(ref, {
                ecosystems:[
                    ...newEcosystems
                ]
            })
         }else if(group?.type=="org"){
            const newOrganizations= docSnap.data()?.organizations?.filter((org)=>org?.id != group?.id)
            console.log(newOrganizations,"new org")
            const result = await updateDoc(ref, {
                organizations:[
                    ...newOrganizations
                ]
            })

          }else{
            const result = await updateDoc(ref, {
                display:"",
                img:""
            })

          }
           localStorage.clear();
           return true

         }catch(e){
           console.log(e)
           throw new Error(e);
         }
     }


}