import React,{useState} from 'react'
import { calculateTimeOfPost } from '../../Utils/calculateTime'
import { Link } from 'react-router-dom';

export default function Comment({feed,group}) {

   const [trigger,setTrigger]=useState(false)
   const comments=  feed?.comments.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
  return (
    <div className='flex flex-col w-full space-y-3 py-4'>
    <div className='flex items-center space-x-4'>
        <div className='flex items-center  -space-x-4 '>
            {feed?.comments?.slice(0,2)?.map((comment)=>{
                    
                     return(
                      <div className='flex w-full space-x-1'>
                          <div className=''>
                            {comment?.img.length>0?

                                <img 
                                  src={comment?.img}
                                  className="rounded-full h-10 w-10"
                                />
                                :
                                <div className='rounded-full h-8 w-8 bg-black text-white items-center justify-center flex border'
                                >
                                    <h5 className='font-semibold text-sm'> { comment?.name?.slice(0,1) +comment?.name?.slice(1,2)}</h5>
                                </div>


                            }


                            </div>
                      </div>

                       )
                     
                      

                  })

               }
        </div>
        <div className='flex'>
           <h5 className='text-xs font-semibold'>and {Number(feed?.comments?.length - 1)} others</h5>

        </div>



    </div>

    <div className='flex flex-col pt-4 pb-2 w-full space-y-4'>
        {comments?.slice(0,`${trigger?feed?.comments?.length :3}`)?.map((comment)=>{
            const timeAt =calculateTimeOfPost(comment?.createdAt?.seconds)
          return(
              <div className='flex w-full space-x-1'>
                   <div className=''>
                      {comment?.img.length>0?
                        <Link 
                            to={`/posterprofile/${group?.id}`}
                             state={{
                               group:comment
                           
                              }}
                           >
                                 <img 
                                    src={comment?.img}
                                    className="rounded-full h-10 w-10"
                                 />
                          </Link>
                          :
                          <div className='rounded-full p-2 items-center justify-center flex border'
                          >
                             <h5 className='font-semibold text-sm'> { comment?.name?.slice(0,1) +comment?.name?.slice(1,2)}</h5>
                          </div>


                      }


                       </div>

                    <div className='flex flex-col bg-slate-100 w-full px-4 py-2 space-y-2 rounded-md'>
                       <div className='flex justify-between items-center'>
                           <h5 className='text-xs font-semibold text-slate-700'>{comment?.name}</h5>
                           <h5  className='text-xs font-semibold text-slate-700'>{timeAt}</h5>
                        </div>
                     
                        <p className='text-xs text-slate-700'>
                          {comment?.comment}
                       </p>
                    </div>

              </div>

           )
        })

       }

    </div>
       {feed?.comments?.length >3&&
          <>
          {trigger?
            <h5 className='text-sm font-semibold text-slate-700' onClick={()=>setTrigger(false)}>See less comments</h5>
            :
            <h5 className='text-sm font-semibold text-slate-700' onClick={()=>setTrigger(true)}>See more comments</h5>

          }
          </>
          

       }
      


    </div>




  )
}
