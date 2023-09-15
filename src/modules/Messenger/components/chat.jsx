import eco from "../../assets/img3.png"
 
 const Chat=({msg,group})=>{
    console.log(msg,"msg chat")
    return(
       <div className='flex flex-col w-full space-y-1'>
             <div className='flex items-center justify-between w-full' >

                     {msg?.sender?.type?.length>0?
                        <div className='flex items-center space-x-2'>
                                    <img 
                                    src={msg?.sender?.img}
                                    className="h-10 w-10 rounded-full"
                                    />

                                <div className='flex flex-col '>
                                    <h5 className='font-semibold'>{msg?.sender?.name}</h5>
                                    <div className='text-xs  font-semiibold'>
                                       {msg?.sender?.type=="eco"?
                                         <div className="flex items-center space-x-1">
                                           <img 
                                            src={eco}
                                            className="w-3 h-3"
                                           />
                                           <h5>Ecosystem</h5>

                                         </div>
                                       :
                                       <div className="flex items-center space-x-1">
                                             <img 
                                             src={eco}
                                             className="w-3 h-3"
                                             />
                                       <h5>Ecosystem</h5>

                                     </div>
                                       }
                                    </div>

                                </div>
                        </div>
                           :
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


                     }
                      

                   

                 
                 <h5 className='text-slate-500 font-light text-sm'>12:30</h5>

             </div>
              {group?.id ==msg?.sender?.id?
                <div className='w-full px-7  py-4 text-black rounded-lg text-sm font-light' style={{background: "rgba(236, 235, 254, 1)"}}>
                   {msg?.text}
                </div>
                :
                <div className='w-full px-7  py-4 text-black rounded-lg text-sm font-light' style={{background: "rgba(231, 231, 231, 1)"}}>
                   {msg?.text}
                </div>

              }


       </div>
    )
}
export default Chat