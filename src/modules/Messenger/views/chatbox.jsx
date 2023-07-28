import React from 'react'
import org from "../../assets/orgcover.png"
import feedorg from "../../assets/feedorg.png"


const Chat=({msg})=>{
     return(
        <div className='flex flex-col w-full space-y-2'>
              <div className='flex items-center justify-between w-full' >
                    <div className='flex items-center space-x-2'>
                        <img 
                        src={msg?.img}
                        className="h-10 w-10 rounded-full"
                        />

                        <div className='flex flex-col '>
                            <h5 className='font-semibold'>{msg?.name}</h5>
                            <h5 className='text-sm font-light'>{msg?.type}</h5>

                        </div>

                    

                  </div>
                  <h5 className='text-slate-500 font-light text-sm'>12:30</h5>

              </div>

              <div className='w-full px-4 py-3 rounded-lg text-sm font-light' style={{background: "rgba(236, 235, 254, 1)"}}>
                   {msg?.msg}
              </div>

        </div>
     )
}

export default function Chatbox() {
  return (
    <div className='flex flex-col py-8 px-4 h-full'>
       <div className='flex items-center justify-center space-x-4 '>
          <h5 className='text-lg font-semibold'>Common Desk</h5>
          <img 
            src={org}
            className="rounded-full h-10 w-10"
          />

       </div>

       <div className='flex flex-col w-full space-y-6 overflow-y-scroll h-full'>
          {messages.map((msg)=>{
             return(
                <Chat
                 msg={msg}
                 />
             )
          })

          }

       </div>

    </div>
  )
}



const messages=[
    {
        img:feedorg,
        name:"Ion Houston",
        type:"Ecosystem",
        msg:"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis ipsum dolor sit amet, consectetur."

    },
    {
        img:org,
        name:"Common Desk",
        type:"Org",
        msg:"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis ipsum dolor sit amet, consectetur."

    },
    {
        img:feedorg,
        name:"Ion Houston",
        type:"Ecosystem",
        msg:"Qorem ipsum dolor sit amet, consectetur adipiscing elit. "

    },
    {
        img:org,
        name:"Common Desk",
        type:"Org",
        msg:"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis ipsum dolor sit amet, consectetur."

    },
    {
        img:feedorg,
        name:"Ion Houston",
        type:"Ecosystem",
        msg:"Qorem ipsum dolor sit amet, consectetur adipiscing elit. "

    },
    {
        img:org,
        name:"Common Desk",
        type:"Org",
        msg:"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis ipsum dolor sit amet, consectetur."

    },
]