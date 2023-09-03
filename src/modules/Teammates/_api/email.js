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
                        receiver:invitee?.email,
                        sender:"communitycare@guzo.io",
                        subject:"Invite to join team on Guzo",
                        message:"http://localhost:3001/new/notifications"

                     },
                    config
               )
            console.log(response?.status,"resss")
            return response?.status;
            }catch(e){
            console.log(e)
            }
            
         }
     
    }