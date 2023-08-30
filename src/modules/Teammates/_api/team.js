import { db,auth } from "../../Firebase";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"




export const teamApi= {

    addInvitee:async function (invitee,group) {
         try{
            
            const collection=group?.type ==="eco"?"ecosystems" :"organizations"
            console.log(collection,"ccccc")
            const groupRef=doc(db,collection,group?.id)
            const groupSnap = await getDoc(groupRef);
            console.log(groupSnap?.data(),"group")
            const array=[]

            const inviteeList=groupSnap?.data()?.invitees ===undefined? array :groupSnap?.data()?.invitees
            console.log(inviteeList,"invitessssss")

             const result = await updateDoc(groupRef, {
                invitees:[
                    ...inviteeList,
                    invitee
                  ]
               })
             console.log( result ,"result")
             return result 


            }catch(e){
                console.log(e)
            }
    },
    getAllTeammates:async function (id,currentUser) {
        const ecoRef =doc(db,"ecosystems",id)
        const docSnap = await getDoc(ecoRef);
        console.log(docSnap?.data(),"api")
        return docSnap?.data()?.teammates

        //  if(docSnap?.data().creator===currentUser?.id){
        //    return docSnap?.data()
        //  }

    },

}