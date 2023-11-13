import React ,{useState} from 'react'
import orgPic from "../../assets/orgcover.png"
import CreatePosts from '../../ CreatePost.'
import Modal from '../../Modal'
import {AiOutlineClose } from "react-icons/ai"
import { userState } from '../../Recoil/globalstate'
import { useRecoilValue } from 'recoil'
export default function CreatePost({group}) {
  const [trigger,setTrigger]=useState(false)
  const currentUser=useRecoilValue(userState)

  return (
    <>
    <div className='bg-white w-full rounded-lg flex px-4 flex-col py-4  space-y-4'>
        <div className='flex items-center space-x-4'>
             {group?.img?.length>0?
                  <img 
                  src={group?.img}
                  className="rounded-full h-8 w-8 "
                  />
                  :
                  <div className='rounded-full h-8 w-8 p-2 items-center justify-center flex border'
                    >
                   <h5 className='font-semibold text-sm'> {group?.firstName?.slice(0,1) +group?.lastName?.slice(0,1)}</h5>
                 </div>
              }

               <input 
                 placeholder='Create a post...'
                 className='w-full  rounded-full border outline-hidden py-1 px-4 text-sm'
               />

        </div>
        <button className='bg-blue-600 py-2 rounded-full w-full text-white font-semibold text-sm'
           onClick={()=>setTrigger(true)}
        >Post
        </button>

    </div>

<Modal trigger={trigger}  cname="w-1/2 py-2   px-4 rounded-lg " >
<div className='w-full flex justify-end px-6 py-2'>
     <AiOutlineClose 
     onClick={()=>setTrigger(false)}
  />

</div>
<div className='h-full overflow-y-scroll' style={{height:"500px"}}>
 <CreatePosts 
   group={group}
   currentUser={currentUser}
   setTrigger={setTrigger}
 />

</div>


</Modal>
</>
  )
}
