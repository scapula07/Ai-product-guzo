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
export default Chat