import {
       createUserWithEmailAndPassword,
        signInWithEmailAndPassword ,
        GoogleAuthProvider,
        signInWithPopup,
        sendPasswordResetEmail,
        signOut} from "firebase/auth";
       
import { auth ,db} from "../../Firebase";
import { doc,getDoc,setDoc }  from "firebase/firestore";


export const authApi= {
    register:async function (email,password,payload) {
        try{
            const credential = await createUserWithEmailAndPassword(auth,email,password)
            const user=credential.user
            const ref =doc(db,"users",user?.uid)
            await setDoc(ref,payload)
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                return {id:docSnap?.id,...docSnap?.data()}
              } else {
                
                console.log("No such document!");
              }
            

        }catch(e){
            console.log(e)
            throw new Error(e);
         }
       

       },
       googleAuth:async function (email,password,payload) {
       
          try{ 
                const provider = new GoogleAuthProvider();
                const res =  await signInWithPopup(auth,provider)
                const credential = GoogleAuthProvider.credentialFromResult(res);
                const token = credential.accessToken;
                const user = res.user;
                const ref =doc(db,"users",user?.uid)
                await setDoc(ref,{
                    email:user?.email,
                    organizations:[],
                    ecosystems:[],
                    pending:[]
                 })


          
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
                    return {id:docSnap?.id,...docSnap?.data()}
                } else {
                    
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

        }
}