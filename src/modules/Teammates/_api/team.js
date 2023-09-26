import { db,auth } from "../../Firebase";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,query,where,getDocs}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"




export const teamApi= {

    addInvitee:async function (invitee,group) {
         try{
            console.log("addding")
            const userRef = collection(db, "users");
            const q = query(userRef, where("email", "==", invitee?.email));
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot,"emailll")
            let user;
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());

                user={
                    id:doc.id,
                    ...doc.data()
                }
              });
              console.log(user,"userrr")
              


            const collectionName=group?.type ==="eco"?"ecosystems" :"organizations"
            const groupRef=doc(db,collectionName,group?.id)
            const groupSnap = await getDoc(groupRef);
            console.log(groupSnap?.data(),"group")
            const array=[]

            const inviteeList=groupSnap?.data()?.invitees ===undefined? [] :groupSnap?.data()?.invitees
            console.log(inviteeList,"invitessssss")

            if(user===undefined) {
                throw new Error("This user does not exist")
            }

              await updateDoc(groupRef, {
                invitees:[
                    ...inviteeList,
                    {
                        id:user?.id,
                        email:invitee?.email,
                        name:user?.firstName?.length !=undefined ?user?.firstName + " "+ user?.lastName :user?.display

                    }
                   ]
               })
       
           

       

             const notificationSnap = await addDoc(collection(db, "notifications"),{
                name:group?.name,
                img:group?.img,
                message:"Requested to join your network.",
                type:"join request",
                from:{
                    id:group?.id,
                    type:group?.type
                },
                to:user?.id
    
              })
          
            const docSnap = await getDoc(groupRef);

            return {teammates:docSnap?.data()?.teammates,invitees:docSnap?.data()?.invitees,status:true}


            }catch(e){
                console.log(e)
                throw new Error(e);
            }
    },
        getAllTeammates:async function (group,currentUser) {
            const collection=group?.type=="eco"?"ecosystems":"organizations"
            const ecoRef =doc(db,collection,group?.id)
            const docSnap = await getDoc(ecoRef);
            console.log(docSnap?.data()?.invitees,"api")
            return {teammates:docSnap?.data()?.teammates,invitees:docSnap?.data()?.invitees}

            //  if(docSnap?.data().creator===currentUser?.id){
            //    return docSnap?.data()
            //  }

        },

}