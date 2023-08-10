import {
       createUserWithEmailAndPassword,
        signInWithEmailAndPassword ,
        GoogleAuthProvider,
        signInWithPopup,
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
    
            return user.uid

        }catch(e){
            console.log(e)
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
                await setDoc(ref,{email:user?.email})


          
            }catch(e){
                console.log(e)
            }
   

        }
}