import {
       createUserWithEmailAndPassword,
        signInWithEmailAndPassword ,
        GoogleAuthProvider,
        signInWithPopup,
        sendPasswordResetEmail,
        signOut} from "firebase/auth";
       
import { auth ,db} from "../../Firebase";
import { doc,getDoc,setDoc }  from "firebase/firestore";
import axios from "axios";

export const authApi= {
    register:async function (email,password,payload) {
        try{
            const credential = await createUserWithEmailAndPassword(auth,email,password)
            const user=credential.user
            const ref =doc(db,"users",user?.uid)
            await setDoc(ref,payload)
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
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
                const res =  await signInWithPopup(auth,provider)
                const credential = GoogleAuthProvider.credentialFromResult(res);
                const token = credential.accessToken;
                const user = res.user;

                console.log(user,"user....")
                const ref =doc(db,"users",user?.uid)
                await setDoc(ref,{
                    email:user?.email,
                    organizations:[],
                    ecosystems:[],
                    pending:[]
                 })

             
                 const docSnap = await getDoc(ref);
                 console.log(docSnap.data(),"user data")
                  if (docSnap.exists()) {
                     return {id:docSnap?.id,...docSnap?.data(),accessToken:user?.accessToken}
              

                   } else {
                     
                     console.log("No such document!");
                   }
               

          
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
                    return {id:docSnap?.id,...docSnap?.data(),accessToken:response?.user?.accessToken}
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
                    return {id:docSnap?.id,...docSnap?.data(),accessToken:user?.accessToken}
             

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