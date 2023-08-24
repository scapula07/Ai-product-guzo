import React from 'react'
import org from "../../assets/orgcover.png"
import feedorg from "../../assets/feedorg.png"


const Chat=({msg})=>{
     console.log(msg,"msg chat")
     return(
        <div className='flex flex-col w-full space-y-2'>
              <div className='flex items-center justify-between w-full' >
                    <div className='flex items-center space-x-2'>
                        <img 
                        src={msg?.sender?.img}
                        className="h-10 w-10 rounded-full"
                        />

                        <div className='flex flex-col '>
                            <h5 className='font-semibold'>{msg?.sender?.firstName + " " + msg?.sender?.lastName }</h5>
                            <h5 className='text-sm font-light'>{msg?.type}</h5>

                        </div>

                    

                  </div>
                  <h5 className='text-slate-500 font-light text-sm'>12:30</h5>

              </div>

              <div className='w-full px-4 py-3 rounded-lg text-sm font-light' style={{background: "rgba(236, 235, 254, 1)"}}>
                   {msg?.text}
              </div>

        </div>
     )
}

export default function Chatbox({currentChat,messages,send,setNewMessage,receiverInfo}) {
  return (
    <div className='flex flex-col py-8 px-4 h-full'>
        {receiverInfo?.type?.length >0?
            <div className='flex items-center justify-center space-x-4 '>
                    <h5 className='text-lg font-semibold'>{receiverInfo?.name}</h5>
                    <img 
                        src={receiverInfo?.img}
                        className="rounded-full h-10 w-10"
                    />
    
            </div>
                :

            
            <div className='flex items-center justify-center space-x-4 '>
                <h5 className='text-lg font-semibold'>{receiverInfo?.firstName + " " + receiverInfo?.lastName }</h5>
                <img 
                    src={receiverInfo?.img}
                    className="rounded-full h-10 w-10"
                />

            </div>
        }

       <div className='flex flex-col w-full space-y-6 overflow-y-scroll h-full'>
          {messages?.map((msg)=>{
             return(
                <Chat
                 msg={msg}
                 />
             )
          })

          }

       </div>

       <div className='flex items-center space-x-4'>
          <textarea
            placeholder='Type a message'
            className='py-1 px-4 rounded-md w-full text-sm font-semibold border outline-none'
            onChange={(e)=>setNewMessage(e.target.value)}
          />
          <button 
            className='text-white bg-blue-600 rounded-lg py-2 px-6 text-sm '
            onClick={send}
           >Send</button>

          

       </div>

    </div>
  )
}


