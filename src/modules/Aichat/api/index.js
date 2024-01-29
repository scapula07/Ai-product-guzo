import axios from "axios";



export const aiAPi= {

     keywords:async function (text) {


        const url=`http://127.0.0.1:8080/`
    

        const config = {
            headers:{
                'Content-Type': 'application/json',
                },
                };

        
        try{
        
            const response= await axios.post(
                    url,
                     {
                       text:text
                     },
                    config
               )
              return response
            }catch(e){
            console.log(e)
            throw new Error(e)
            }
            
         }
     
    }