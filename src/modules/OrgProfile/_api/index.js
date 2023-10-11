
import { db,auth } from "../../Firebase";
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,getDocs,query,where}  from "firebase/firestore";
import {getStorage, ref, uploadBytes } from "firebase/storage"

export const feedApi= {
          getProfileFeeds: async function (id) {
            console.log(id,"iddddd")
              // const q = query(collection(db, "posts"));
              const feeds= []
                try{
                  const q = query(collection(db, "posts"), where("creator_id", "==",id));
                  const querySnapshot = await getDocs(q);
                  querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    feeds.push({ ...doc.data(), id: doc.id })
                  });


                  console.log(feeds,"feddddds")


                  // const querySnapshot = await getDocs(q);
                  // querySnapshot.docs.map((doc) => {
                  //  
                    
                  // })
              
                  // const filter= feeds.filter(feed => feed?.creator_id===id);
                  return feeds
              
        
              }catch(e){
                  console.log(e)
              }
          },
          getAllMembers:async function (id) {
              try{
                const ecoRef =doc(db,"ecosystems",id)
                const docSnap = await getDoc(ecoRef);
      
                return docSnap?.data()?.active
      
              }catch(e){
                throw new Error(e)

              }
            //  if(docSnap?.data()?.creator===currentUser?.id){
            //    return docSnap?.data()
            //  }
          
          },

          fetchProfile:async function (group) {
            try{
            let collectionName="users"
            if(group?.type?.length >0){
              collectionName= group?.type=="eco"?"ecosystems":"organizations"

            }
          
            const profileRef =doc(db,collectionName,group?.id)
            const docSnap = await getDoc(profileRef);

            return docSnap.data()




            }catch(e){
              console.log(e)
              throw new Error(e)
            }
        },
        makeComments: async function (payload,feed) {
          try{
            const postRef =doc(db,"posts",feed?.id)
            const docSnap = await getDoc(postRef);

            console.log(docSnap,"snappp")


            if(docSnap?.exists()){
              const post=docSnap?.data()
              const comments=post?.comments ==undefined ? [] :post?.comments

              const result = await updateDoc(postRef, {
                comments:[
                  ...comments,
                  payload
                ]
          
                })
                console.log(result,"result")
                return true
          
            }
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
                  const newActive=memberSnap?.data()?.active?.filter((eco)=>eco?.id != group?.id)
                  
                  await updateDoc(doc(db,collectionName,member?.id), {
                    active:[
                      ...newActive,
                      
                      ]
                  
                })


                }else{
                    const memberSnap = await getDoc(doc(db,"individuals",member?.id));
                    const newEcosystems=memberSnap?.data()?.connections?.filter((eco)=>eco?.id != group?.id)
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
