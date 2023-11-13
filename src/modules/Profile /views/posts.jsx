import React,{useEffect, useState} from 'react'
import orgPic from "../../assets/orgcover.png"
import share from "../../assets/icons/share.png"
import {BsFillShareFill} from "react-icons/bs"
import postImg from "../../assets/conference.png"
import CreatePost from './createPost'
import { ecosystemApi } from '../_api'
import {RiArrowDownSLine} from "react-icons/ri"
import {AiOutlineClose} from "react-icons/ai"
import {MdEdit} from "react-icons/md"
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { feedApi } from '../_api'
import Comment from '../components/comment'
import BeatLoader from "react-spinners/BeatLoader";
import Join from '../../JoinPost'
import { calculateTimeOfPost } from '../../Utils/calculateTime'
import DeletePost from '../../DeletePost'
import { db } from '../../Firebase'
import { doc,getDoc,setDoc , updateDoc,collection,addDoc,getDocs,query,where,orderBy,onSnapshot,or}  from "firebase/firestore";


export default function Posts({group}) {
   const [feeds,setFeed]=useState([])
   const [arePosts,setPost]=useState("")

  useEffect(()=>{

    if(group?.id?.length >0){
          const q = query(
            collection(db, 'posts'),
              or(where('creator_id', '==', group?.id),
                where('access', 'array-contains', group?.id)
              ),orderBy('createdAt', 'desc')
             );
      
        const feeds= [];
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
              feeds.push({...doc?.data(),id:doc?.id});
              console.log(doc?.data(),"feeed")
          });
          console.log(feeds?.length,"feds lenth")

          setFeed(feeds)
        }
        feeds?.length===0 &&setPost("No Feeds")
        feeds?.length >0 &&setPost("")

        
        });
    
        return () => {
          unsubscribe()

       };

    }

})


  return (
    <div className='flex flex-col space-y-4'>
      {feeds?.map((feed)=>{
         return(
          <Post 
            feed={feed}
            group={group}
            setFeed={setFeed}
          />
         )
       })

      }
       {arePosts?.length===0&&feeds?.length ===0&&
            <div className='w-full flex justify-center py-10'>
               <ClipLoader 
                    color={"rgba(62, 51, 221, 1)"}
                    loading={true}
                />
            </div>
       }

    {arePosts?.length >0&&
               <div className='w-full flex justify-center py-10'>
                  <h5 className="text-lg font-semibold">No posts</h5>
               </div>

      }


    </div>
  )
}

const Post=({feed,group,setFeed})=>{
  console.log(feed,"imgggg pppppp")

  const time =calculateTimeOfPost(feed?.createdAt?.seconds)
  console.log(feed?.createdAt,"created at")
  console.log(time,"timeeee")
 return(
    <div className='w-full py-4 bg-white h-full rounded-lg'>
    <div className='flex items-center border-b py-2  lg:px-4 px-1 justify-between w-full'>
          <div className='flex items-center space-x-3 w-full'>
              
               <>
                 {feed?.shared_by?.type?.length>0?
                     <img
                     src={feed?.shared_by?.img}
                     className="rounded-full h-8 w-8"
                   />
                    :
                    <>
                      {feed?.shared_by?.img?.length>0?
                           <img
                           src={feed?.shared_by?.img}
                           className="rounded-full h-8 w-8"
                         />
                         :
                         <div className='rounded-full p-2 items-center justify-center flex border'
                            >

                            <h5 className='font-semibold text-sm'> {feed?.shared_by?.firstName?.slice(0,1) } </h5>
                         </div>
                         

                      }
                    
                    
                    </>

                 }
                 
              </>
       
                    <div className='flex items-center space-x-3 w-full'>

                      <h5 className='text-lg font-semibold '>{feed?.shared_by?.name}</h5>
                      <span className='text-xs text-slate-700 '>{time}</span> 

                      </div>
                    

     
             


          </div>
          <div className='flex w-1/6 justify-end'>
             {/* <DeletePost
                feed={feed}
                group={group}
                setFeed={setFeed}
              />  */}
          </div>
     

    </div>

     <div className='flex flex-col w-full py-4 space-y-4'>
        
              <div className='flex flex-col px-4 space-y-6'>
               

                    <p className='text-lg text-black'>
                      {feed?.post?.body}
                    {/* <span className='text-black font-semibold text-sm'>see more</span>   */}
                   </p>
                    
                
              </div> 
              {feed?.img_post?.length >0&&
               <div className='w-full px-4 py-6'>
                    <img 
                      src={feed?.img_post}
                      className="w-full h-56"
                    />
              </div>

              }
              
          <Comments 
             group ={ group }
             feed={feed}
          />
         

      </div>
   

</div>
 )
}



const EventCard=({event,participants})=>{
console.log(participants,"evevveve")
return(
 <div className='w-full flex flex-col space-y-4'>
     <div className='flex w-full justify-between'>
        <div className='flex flex-col'>
            <h5 className='text-lg font-semibold text-slate-600'>Date/Time</h5>
            <h5 className='font-light text-sm'>{event?.start_date},{event?.start_time } - {event?.end_time}</h5>

        </div>
        <div className='flex flex-col'>
            <h5 className='text-lg font-semibold text-slate-600'>Location</h5>
            <h5 className='font-light text-sm'>{event?.location},{event?.directions }</h5>

        </div>
     </div>
     <div className='flex flex-col'>
        {participants?.length >0&&
         <h5 className=' font-semibold text-slate-600'>Host(s)</h5>
        }
         <div className='flex flex-col space-y-2'>
            {participants?.map((participant)=>{
               return (
                <h5 className='text-sm '>{participant}</h5>
               )
            })

            }

         </div>

     </div>

 </div>
)
}







const RequestCard=({req,group,feed,index})=>{
const [randomNumber,setRandom]=useState()
useEffect(()=>{
 setRandom(Math.floor(Math.random() * 4) + 1)
},[])

const [trigger,setTrigger]=useState(false)

const color=[
    "",
    "rgba(197, 193, 251, 1)",
    "rgba(205, 247, 243, 1)",
    "rgba(254, 247, 197, 1)",
    "rgba(255, 198, 201, 1)"
]
return(
    <div className='flex flex-col py-6 px-4 space-y-4 ' style={{background:`${color[randomNumber]}`}} >
        <div className='flex items-center justify-between'>
              <h5 className='text-xl font-semibold'>{req?.title}</h5>
              {trigger?
                  <AiOutlineClose
                  className='text-xl font-light'
                  onClick={()=>setTrigger(false)}
                />
                :
                <RiArrowDownSLine 
                className='text-3xl font-semibold'
                onClick={()=>setTrigger(true)}
              />
                

              }
             

        </div>
        {trigger&&
          <div className='flex flex-col space-y-2'>
               <p>{req?.body}</p>
               <div className='flex justify-center w-full'>
                   <Join 
                     group={group}
                     feed={feed}
                     index={index}
                   />
                </div>
              
          </div>
         }
          

   </div>

)
}


const Comments=({ group, feed })=>{
const [change,setChange]=useState(false)
const [text,setText]=useState("")
const [isLoading,setLoader]=useState(false)

        const makeComment=async()=>{
            if (text?.length == 0) {
              return;
            }
        setLoader(true)
        try{
            let payload;
            if(group?.type?.length >0){
              payload={
                name:group?.name,
                img:group?.img,
                comment:text,
                createdAt:new Date()
              }
            }else if(group?.img.length >0){
              payload={
                name:group?.firstName?.length !=undefined?group?.firstName + " " + group?.lastName :group?.display,
                img:group?.img,
                comment:text,
                createdAt:new Date()
              }

            }else{
                payload={
                name:group?.firstName + " " + group?.lastName,
                img:"",
                comment:text,
                createdAt:new Date()
              }

            }
            console.log(payload,"loaddd")
              const response= await feedApi.makeComments(payload,feed)
              response&&setLoader(false)
              response&&setText("")
          }catch(e){
            console.log(e)
            setLoader(false)
          }

        }

return(
  <div className='flex flex-col w-full px-4  '>
      <div className='flex items-center w-full space-x-2 px-2'>
          <div>
          { group?.type?.length>0?
                     <img
                     src={group ?.img}
                     className="rounded-full h-8 w-8"
                   />
                    :
                    <>
                      { group?.img?.length>0?
                           <img
                           src={ group?.img}
                           className="rounded-full h-8 w-8"
                         />
                         :
                         <div className='rounded-full p-2 items-center justify-center flex border'
                            >
                            <h5 className='font-semibold text-sm'> { group?.firstName?.slice(0,1) + group?.lastName?.slice(0,1)}</h5>
                        </div>
                         

                      }
                    
                    
                    </>

                 }
          </div>
         <div className='flex items-center border px-2 border-black justify-between rounded-full w-full'>
             <input 
               className='border-0 text-sm  py-1 rounded-full outline-none px-2 w-11/12'
               placeholder='Add a comment...'
               value={text}
               onMouseOut={()=>setChange(false)}
               onChange={(e)=>setText(e.target.value)||setChange(true)}
             />
             {isLoading?
                    <BeatLoader
                      color={"rgba(62, 51, 221, 1)"}
                      loading={true}
                      size="6"
                    
                    />
                     :
                     <>
                      {change?
                         <h5 
                           className='text-xs font-semibold'
                           onClick={makeComment}
                         >send</h5>
                           :
                         <MdEdit 
                           className='text-slate-400 '
                           onMouseOver={()=>setChange(true)}
                         />
   
                       }
                     </>
                

                  }
            
               </div>
        
             </div>
              {feed?.comments?.length >0 &&
                <Comment 
                  feed={feed}
                 />

              }
              


    

        </div>

)
}