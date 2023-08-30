import { db,auth } from "../../Firebase";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"




export const teamApi= {

    addInvitee:async function (invitee,user) {

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