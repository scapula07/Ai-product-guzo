import axios from "axios";



export const inviteEmail= {

    sendInvite:async function (invitee,user) {


        const url=`https://guzo-emailing.onrender.com/api/send-email`
    

        const config = {
            headers:{
                'Content-Type': 'application/json',
                },
                };

        
        try{
        
            const response= await axios.post(
                    url,
                     {
                        receiver:invitee?.email,
                        sender:"communitycare@guzo.io",
                        subject:"Invite to join team on Guzo",
                        message:"https://guzo.vercel.app/register/login"
                        // message:"http://localhost:3000/register/login"
                     },
                    config
               )
            console.log(response?.status,"resss")
            return response?.status;
            }catch(e){
            console.log(e)
            throw new Error(e)
            }
            
         }
     
    }