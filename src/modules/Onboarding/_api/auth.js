import {
       createUserWithEmailAndPassword,
        signInWithEmailAndPassword ,
        GoogleAuthProvider,
        signInWithPopup,
        sendPasswordResetEmail,
        signOut,} from "firebase/auth";
       
import { auth ,db} from "../../Firebase";
import { doc,getDoc,setDoc,updateDoc }  from "firebase/firestore";
import axios from "axios";

export const authApi= {
    register:async function (email,password,payload) {
        try{
            const credential = await createUserWithEmailAndPassword(auth,email,password)
            const user=credential.user
            const ref =doc(db,"users",user?.uid)
            await setDoc(ref,{id:user?.uid,...payload})
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
               await setDoc(doc(db, "unseen",user?.uid), {
                   notifications:false
                 });
                return {id:docSnap?.id,...docSnap?.data(),accessToken:user?.accessToken}
              } else {
                
                console.log("No such document!");
              }
            

        }catch(e){
            console.log(e)
            throw new Error(e);
         }
       

       },
       googleAuth:async function (account) {
        console.log(account,"acccount")
       
          try{ 
                const provider = new GoogleAuthProvider();
                provider.addScope("https://www.googleapis.com/auth/userinfo.profile","email")
                const res =  await signInWithPopup(auth,provider)
                const credential = GoogleAuthProvider.credentialFromResult(res);
                const token = credential.accessToken;
                const user = res.user;

                console.log(user,"userrrr")

                // const firstName = user.displayName.split(' ')[0];
                // const lastName = user.displayName.split(' ')[1];


                // console.log(user,"user....")
                // const ref =doc(db,"users",user?.uid)
                // const docSnap1 = await getDoc(ref);
                // if(docSnap1.exists()){
                //    throw new Error("Email already used")
                // }

                // await setDoc(ref,{
                //     id:user?.uid,
                //     firstName:firstName?.length != undefined?firstName:"",
                //     lastName:lastName?.length != undefined?lastName :"",
                //     email:user?.email,
                //     organizations:[],
                //     ecosystems:[],
                //     pending:[]
                //  })

             
                //  const docSnap = await getDoc(ref);
                //  console.log(docSnap.data(),"user data")
                //   if (docSnap.exists()) {
                //     await setDoc(doc(db, "unseen",user?.uid), {
                //       notifications:false
                //     });
                //      return {id:docSnap?.id,...docSnap?.data(),accessToken:user?.accessToken}
              

                //    } else {
                     
                //      console.log("No such document!");
                //    }
               

          
            }catch(e){
                console.log(e)
                throw new Error(e);
            }
   

        },
        login:async function (email,password) {
             try{
                const response = await signInWithEmailAndPassword(auth,email,password)
                console.log(response,"resss")
                const ref =doc(db,"users",response?.user?.uid)
                const docSnap = await getDoc(ref);
                if (docSnap.exists()) {

                      

                    if(docSnap?.data()?.ecosystems?.length >0){
                
                      console.log(docSnap.data()?.ecosystems,"new connections")
                        await Promise.all(docSnap.data()?.ecosystems?.map(async(eco,index)=>{
                              const refEco =doc(db,"ecosystems",eco?.id)
                              const docEco = await getDoc(refEco);
    
                              console.log(docEco?.exists(),index,"Exixt")
                              console.log(index,"index")
                              if(docEco?.exists()==false){
                                console.log( docSnap.data()?.connections,"new ecooss")
                                const newEco=  docSnap.data()?.ecosystems?.length ===undefined?[]:docSnap.data()?.ecosystems?.filter((ecosystem)=>ecosystem?.id !=eco?.id)
                                const newConnections= docSnap.data()?.connections?.length ===undefined?[]: docSnap.data()?.connections?.filter((ecosystem)=>ecosystem?.id !=eco?.id)
                                const newActiveMembers=docSnap.data()?.active?.length ===undefined?[]:  docSnap.data()?.active?.filter((member)=>member?.id !=eco?.id)


                                console.log(newConnections,"new connections")
                                console.log(newActiveMembers,"new Active")

                                const result = await updateDoc(ref, {
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
                                  const newOrg=docSnap.data()?.organizations?.lenght ==undefined?[] : docSnap.data()?.organizations?.filter((organization)=>organization?.id !=org?.id)
                                  const newConnections= docSnap.data()?.connections?.length ==undefined?[] :docSnap.data()?.connections?.filter((ecosystem)=>ecosystem?.id !=org?.id)
                                  const newActiveMembers=docSnap.data()?.active?.length ==undefined?[] :  docSnap.data()?.active?.filter((member)=>member?.id !=org?.id)

                                  console.log(newOrg,"new ecooss")

                                  const result = await updateDoc(ref, {
                                      organizations:[...newOrg],
                                      connections:[...newConnections],
                                      active:[...newActiveMembers]
                                        })
                                   }
                                }))
                              }

                           const docUser = await getDoc(ref);
                          return {id:docUser?.id,...docUser?.data(),accessToken:response?.user?.accessToken}
                        // return {id:docSnap?.id,...docSnap?.data(),accessToken:response?.user?.accessToken}

                    } else {
                      throw new Error("You are not signed up")
                        console.log("No such document!");
                        
                    }
         

                

             }catch(e){
                console.log(e)
                throw new Error(e);
             }

        },
        resetPassword:async function (email) {
            try{
              const res=await sendPasswordResetEmail(auth, email)
              console.log(res,"ressss")

              return true
             }catch(e){
                console.log(e)
                throw new Error(e);
             }

        },
        googleLogin:async function (email) {
           try{

                const provider = new GoogleAuthProvider();
                const res =  await signInWithPopup(auth,provider)
                const credential = GoogleAuthProvider.credentialFromResult(res);
                const token = credential.accessToken;
                const user = res.user;
                const ref =doc(db,"users",user?.uid)

                  const docSnap = await getDoc(ref);
                  console.log(docSnap.data(),"user data")
                    if (docSnap.exists()) {

                      

                              if(docSnap?.data()?.ecosystems?.length >0){
                          
                                
                                  await Promise.all(docSnap.data()?.ecosystems?.map(async(eco,index)=>{
                                        const refEco =doc(db,"ecosystems",eco?.id)
                                        const docEco = await getDoc(refEco);
              
                                        console.log(docEco?.exists(),"Exixt")
                                        console.log(index,"index")
                                        if(docEco?.exists()==false){
                                          console.log( docSnap.data()?.ecosystems,"new ecooss")
                                          const newEco=  docSnap.data()?.ecosystems?.length ===undefined?[]:docSnap.data()?.ecosystems?.filter((ecosystem)=>ecosystem?.id !=eco?.id)
                                          const newConnections= docSnap.data()?.connections?.length ===undefined?[]: docSnap.data()?.connections?.filter((ecosystem)=>ecosystem?.id !=eco?.id)
                                          const newActiveMembers=docSnap.data()?.active?.length ===undefined?[]:  docSnap.data()?.active?.filter((member)=>member?.id !=eco?.id)
          
          
                                          console.log(newConnections,"new connections")
                                          console.log(newActiveMembers,"new Active")
          
                                          const result = await updateDoc(ref, {
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
                                    const newOrg=docSnap.data()?.organizations?.lenght ==undefined?[] : docSnap.data()?.organizations?.filter((organization)=>organization?.id !=org?.id)
                                    const newConnections= docSnap.data()?.connections?.length ==undefined?[] :docSnap.data()?.connections?.filter((ecosystem)=>ecosystem?.id !=org?.id)
                                    const newActiveMembers=docSnap.data()?.active?.length ==undefined?[] :  docSnap.data()?.active?.filter((member)=>member?.id !=org?.id)
  

                                    console.log(newOrg,"new ecooss")

                                    const result = await updateDoc(ref, {
                                      organizations:[...newOrg],
                                      connections:[...newConnections],
                                      active:[...newActiveMembers]
                                        })


                                  
                                    }
                                  
                                })
                                  )
                                }

                  



                      
                      const docUser = await getDoc(ref);
                      return {id:docUser?.id,...docUser?.data(),accessToken:user?.accessToken}
              

                      } else {
                      throw new Error("You are not signed up")
                      console.log("No such document!");
                    }

             }catch(e){
            console.log(e)
            throw new Error(e)
             }

        },
        linkedinAuth:async function (code) {
         


            const url = `http://localhost:7000/api/linkedin-auth`
            // const data = new URLSearchParams();
            // data.append('grant_type', 'authorization_code');
            // data.append('code', code); // Replace with your actual authorization code
            // data.append('client_id', '77qrf2uomwidm7');
            // data.append('client_secret', 'cMbWDEISFgzpzkK1');
            // data.append('redirect_uri', 'http%3A%2F%2Flocalhost%3A3001%2Fregister');

    

              const config = {
                  headers:{
                      'Content-Type': 'application/json',
                      },
                      };
      
              
              try{
              
                  const response= await axios.post(
                          url,
                          {code

                          },
                          config
                    )
                
                  console.log(response,"response")
                  }catch(e){
                  console.log(e)
                  throw new Error("You dont have permissions")
                  }

        },

}