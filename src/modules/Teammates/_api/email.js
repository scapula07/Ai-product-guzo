import axios from "axios";



export const inviteEmail= {

    sendInvite:async function (invitee,user) {


        const url=`http://localhost:7000/api/send-email`
    

        const config = {
            headers:{
                'Content-Type': 'application/json',
                },
                };

        
        try{
        
            const response= await axios.post(
                    url,
                     {
                        receiver,
                        sender:"",
                        subject:"Invite to join team on Guzo",
                        message:""

                     },
                    config
            )
            console.log(response,"resss")
            return response;
            }catch(e){
            console.log(e)
            }
            
         }
     
    }