import axios from "axios";



export const notificationApi= {
   sendNotification:async(token,to)=>{
    console.log(to,"tttt")
    
    const YOUR_PROJECT_ID = 'guzo-v2';
    const YOUR_ACCESS_TOKEN = token;
    
    const url = `https://fcm.googleapis.com/v1/projects/${YOUR_PROJECT_ID}/messages:send`;
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${YOUR_ACCESS_TOKEN}`,
    };
    
    const data = {
      message: {
        token: to,
        notification: {
          title: 'Background Message Title',
          body: 'Background message body',
        },
        webpush: {
          fcm_options: {
            link: 'https://dummypage.com',
          },
        },
      },
    };
    

    
    
    try{
        // const response=await axios.post(url, data, config)
        // // console.log(response.data,"res")
        axios.post(url, data, { headers })
        .then((response) => {
          console.log('Message sent successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
        
       
     
    }catch(e){
        console.log(e,"err")
    }

   }
   

}