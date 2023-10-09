import React,{useState,useRef,useEffect} from 'react'
import img2 from "../assets/feedorg.png"
import {IoMdImage} from "react-icons/io"
import {AiTwotoneCalendar,AiOutlineHistory} from "react-icons/ai"
import {ImFilesEmpty} from "react-icons/im"
import {RiCheckboxBlankFill,RiArrowDropDownLine} from "react-icons/ri"
import Request from './request'
import Files from './files'
import Image from './image'
import Events from './events'
import Share from './share'
import {MdArrowDropDown} from "react-icons/md"
import { postApi } from './_api/post'
import ClipLoader from "react-spinners/ClipLoader";
import { Alert, Avatar, Button, Divider, InputBase,Snackbar } from "@mui/material";
import ReactSelect from "react-select";
import ecoImg from "../assets/img3.png"
import org from "../assets/img2.png"
import { shareApi } from './_api/share'

export default function CreatePosts ({group,currentUser,setTrigger}) {

   
     const [errorMsg, setErrorMsg] = useState(null)

     const [request,setReq]=useState(false)
     const [event,setEvent]=useState(false)
     const [file,setFile]=useState(false)
     const [img,setImg]=useState(false)
     const [share,setShare]=useState(false)
     const [others,setOthers]=useState(false)
     const [isLoading,setLoader]=useState(false)
     const [access,setAccess]=useState([])

     const [requests,setRequests]=useState([])
     const [eco,setEco]=useState([])
     const [viewAll,setViewAll]=useState([])
     const [arePosts,setArePost]=useState("")
    const [post,setPost]=useState({
                                  title:"",
                                  body:"",
                                  img:{}
                                })
    const [requestPost,setRequest]=useState({
        title:"",
        body:"",
        })
    const [eventPost,setEvt]=useState({
        title:"",
        body:"",
        img:""
        })

    const [participants,setParticipants]=useState([])
    const [url,setUrl]=useState("")

    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const options = [
        { value: "tech", label: "Tech" },
        { value: "media", label: "Media" },
        { value: "business", label: "Businnes" },
        { value: "art", label: "Art" },
      ];
    
    const handleTagChange = (selectedOption) => {
      console.log(selectedOption);
      setSelectedOption(selectedOption.value);
    };
     



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };


   
      const style = {
        control: (base) => ({
          ...base,
          border: "0px solid rgba(242,242,242,0.6)",
          width: "100%",
          boxShadow: "none",
          backgroundColor: "rgba(242,242,242,0.6)",
          fontSize: "14px",
          "@media (min-width:600px)": {
            width: "100%",
          },
          "@media (min-width:1200px)": {
            width: "100%",
          },
        }),
       };


       useEffect(()=>{
        const getAllEcosystems=async()=>{
            const ecosystems=await shareApi.getAllEcosytems(group)
            setEco(ecosystems)
            console.log(ecosystems,"ecosystems")
            ecosystems?.length===0 &&setArePost("No Feeds")
            ecosystems?.length >0 &&setArePost("")
        
            
            const access=[]
            ecosystems?.map((eco)=>{
              console.log(eco,"ecooo")
                if(eco?.type =="eco"){
                  access.push(eco?.id)
                }
             
             
              })

              console.log(access,"accc")
              setViewAll(access) 

         }
        getAllEcosystems()

      },[])

    console.log(viewAll,"others")
    console.log(participants,"requestiii")

    const makePost=async(group)=>{
      setErrorMsg(null)


      if (post?.body?.length< 3) {
        setErrorMsg( 'Post body is required ');
        setLoader(false);
        return;
      }
  
  
  
     

        console.log("groppp")
        setLoader(true)


        const payload={
            post,
            access:access?.length ==0? viewAll:access
        }


        try{
           console.log(payload?.post?.img?.name,"post image")
           const result =await postApi.makePost(group,payload,currentUser)
           result&&setTrigger(false)
           result&&setLoader(false)
         
        }catch(e){
            console.log(e,"postttt")
            setErrorMsg(e)
            setLoader(false)
        }

       }


       const save=()=>{
        setErrorMsg(null)
        if (post?.body?.length< 3) {
          setErrorMsg( 'Post body is required ');
          setLoader(false);
          return;
        }
         setShare(true) 
         setOthers(true)

       }

    

  return (
      <>
       { others?
       
          <>
         
   
    
               {img&&<Image
                setOthers={setOthers}
                url={url}
                setUrl={setUrl}
                setPost={setPost}
                post={post}
                setImg={setImg}
               />}
              {share&&<Share  
                   setOthers={setOthers}
                   group={group}
                   currentUser={currentUser}
                   setShare={setShare}
                   access={access}
                   setAccess={setAccess}
                   eco={eco}
                   arePosts={arePosts}
                   makePost={makePost}
                   isLoading={isLoading}
               />}


          </>
         



        :


<div className='w-full flex justify-center h-full overflow-y-scroll no-scrollbar'>
        <Snackbar 
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical:"top", horizontal:"center"}}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
               Post created!
            </Alert>
         </Snackbar>

      
      <div className='w-4/5 flex flex-col h-full space-y-10 py-4 '>
         {/* {errorMsg && (
        
           <Alert severity="error">{errorMsg}</Alert>
         )} */}
        <div className='flex items-center space-x-2 w-full'>
              {group?.type?.length>0?

                  <img 
                    src={group?.img}
                    className="h-10 w-10 rounded-full"
                  />
                 :
                 <>
                   {group?.img?.length>0?
                       <img 
                        src={group?.img}
                        className="h-10 w-10 rounded-full"
                       />
                        :
                        <div className='rounded-full p-2 items-center justify-center flex border'
                          >
                         <h5 className='font-semibold text-sm'> {currentUser?.firstName?.slice(0,1) +currentUser?.lastName?.slice(0,1)}</h5>
                      </div>
                        

                    }
                    
                   
                 </>
                 }
                {group?.type?.length>0?

               
                    <div className='flex flex-col '>
                        <h5 className='font-semibold'>{group?.name}</h5>
                    
                          {group?.type=="eco"?
                                         <div className="flex items-center space-x-1">
                                           <img 
                                            src={ecoImg}
                                            className="w-3 h-3"
                                           />
                                           <h5 className='text-xs'>Ecosystem</h5>

                                         </div>
                                       :
                                       <div className="flex items-center space-x-1">
                                             <img 
                                             src={org}
                                             className="w-3 h-3"
                                             />
                                       <h5 className='text-xs'>Organization</h5>

                                     </div>
                         }
                        {/* <div className='flex items-center space-x-1'>
                            <h5 className='text-sm font-semibold '>Share Options</h5>
                            <MdArrowDropDown 
                            className='text-lg'
                            onClick={()=>setShare(true) || setOthers(true)}
                            />
                        </div> */}
                    

                    </div>
                    :
                    <div className='flex flex-col '>
                        {group?.firstName?.length !=undefined?
                              <h5 className='font-semibold'>{group?.firstName + " " + group?.lastName}</h5>
                              :
                              <h5 className='font-semibold'>{group?.display}</h5>

                        }
                     
                        {/* <div className='flex items-center space-x-1'>
                            <h5 className='text-sm font-semibold '>Share Options</h5>
                            <MdArrowDropDown 
                            className='text-lg'
                            onClick={()=>setShare(true) || setOthers(true)}
                            />
                        </div> */}
                    

                    </div>

                 }
         </div>

         <div className='flex flex-col space-y-4 justify-between h-full'>
                    <>
                    { url?.src?.length > 0&&
                        <div className='w-1/2 py-4'>
                                <img
                                  src={url?.src}
                                  className='w-full h-full rounded-lg'
                                />
                        </div>
                      }
                    </>

                    {errorMsg && (
        
                      <Alert severity="error">{errorMsg}</Alert>
                    )}

                     

                {/* <div className='flex flex-col w-full space-y-2'>
                        <label className='text-sm text-slate-700'>Post Title*</label>
                        <input 
                            placeholder='Give your post a title...'
                            className=' py-2 px-4 w-full rounded-md text-sm outline-none border'
                            name="title"
                            value={post?.title}
                            onChange={(e)=>setPost({...post,title:e.target.value})}
     
                        />

                 </div> */}

                 <div className='flex flex-col w-full space-y-2'>
                        {/* <label className='text-sm text-slate-700'>Post body*</label> */}
                        <textarea
                            placeholder='Share a need/request/opportunity with your ecosystem...'
                            style={{background: "#f8f8f8"}}

                            className=' py-2 px-4 w-full rounded-md text-lg outline-none bg-[rgba(242, 242, 242, 0.6)]'
                            name="body"
                            value={post?.body}
                            onChange={(e)=>setPost({...post,body:e.target.value})}
     
     
                        />

                 </div>
                  {/* <div className='flex flex-col'>
                    {requests?.length>0&&requests?.map((req)=>{
                         return(
                            <RequestCard 
                              req={req}
                            />
                         )

                        })}

                  </div> */}
                 


                {/* <button className='text-blue-700 rounded-full px-8 py-1.5 w-1/2'
                        style={{background: "rgba(236, 235, 254, 1)"}}
                        onClick={()=>setReq(true) || setOthers(true)}
                        >
                 Add a Request
                </button> */}
              
                 {/* <div className='flex flex-col w-full space-y-2'>
                        <label className='text-sm text-slate-700'>Tags</label>
                        <ReactSelect 
                         placeholder='Add up to (5) descriptive tags that will help people discover your post....'
                         styles={style}
                         isMulti 
                         onChange={handleTagChange} 
                         options={options} />

                 </div> 
                 {eventPost?.title?.length >0&&
                    <EventCard 
                    eventPost={eventPost}
                  />
                 } */}
                

                 <div className='flex  flex-col space-y-4 py-4'>
                    <h5 className='text-sm font-semibold'>Add a photo</h5>

                    <div className='flex items-center space-x-4'>
                        {[{
                            icon:<IoMdImage/>,
                            click:()=>setImg(true)
                           },
                            
                         ].map((action)=>{
                            return(
                                <h5 className='rounded-full p-3 items-center justify-center text-lg text-slate-700'
                                  style={{background: "rgba(242, 242, 242, 1)" }}
                                  onClick={()=>action.click() || setOthers(true)}
                                >
                                    {action.icon}
                                </h5>
                            )
                        })

                        }


                    </div>

                    {/* <div className='flex w-full items-center justify-center'>
                        {[1,2].map(()=>{
                             return(
                                <RiCheckboxBlankFill
                                className='text-slate-300 text-2xl'
                                 />
                             )
                        })

                        }
                       

                      </div> */}
                 </div>

                 <div className='flex items-center justify-end'>
                    <div className='flex items-center space-x-4'>
                        <h5
                          className='text-blue-700 text-sm font-semibold rounded-full px-4 py-2'
                        
                        >
                          Close
                        </h5>
                 
                            <button
                                style={{background: "rgba(236, 235, 254, 1)"}}
                                className='text-blue-700 rounded-full px-8 text-sm py-1.5'
                                // onClick={()=>makePost(group)}
                                 onClick={save}
                            >
                                Save and continue
                            </button>
                           

                    </div>
                 </div>




         </div>
    
      </div>
      </div>

    }
    </>
  )
}




const RequestCard=({req})=>{
    const randomNumber = Math.floor(Math.random() * 4) + 1;

    const color=[
        "",
        "rgba(197, 193, 251, 1)",
        "rgba(205, 247, 243, 1)",
        "rgba(254, 247, 197, 1)",
        "rgba(255, 198, 201, 1)"
    ]
    return(
        <div className='w-full '>
            <div className='flex items-center justify-between w-full py-2 rounded-md px-4' style={{background:`${color[randomNumber]}`}}>
                <h5 className='text-sm font-semibold' >{req?.title}</h5>
                <RiArrowDropDownLine
                  className='text-3xl font-semibold'
                 />


            </div>

        </div>
     )
}


const EventCard=({eventPost})=>{
     return(
        <div className='flex flex-col space-y-4'>
             <div className='flex flex-col'>
                <h5 className='text-sm font-semibold'>Event title</h5>
                <h5 className='text-sm font-light'>{eventPost?.title}</h5>

             </div>
            <div className='flex flex-col'>
                <h5 className='text-sm font-semibold'>Event Description</h5>
                <h5 className='text-sm font-light'>{eventPost?.body}</h5>

            </div>
            <div className='flex flex-col'>
                <h5 className='text-sm font-semibold'>Event Link</h5>
                <h5 className='text-sm font-light'>{eventPost?.link}</h5>

            </div>
            
            <div className='flex flex-col space-y-3'>

                <div className='flex items-center w-full justify-between'>
                    <h5>Date/Time</h5>
                    <h5>Location</h5>

                </div>
                <div className='flex items-center w-full justify-between'>
                    <h5 className='text-sm font-semibold'>{eventPost?.start_date}</h5>
                    <h5 className='text-sm font-light'>{eventPost?.start_time}</h5>
                    <h5 className='text-sm font-light'>{eventPost?.location}</h5>

                </div>
                <div className='flex items-center w-full justify-between'>
                    <h5 className='text-sm font-semibold'>{eventPost?.end_date}</h5>
                    <h5 className='text-sm font-light'>{eventPost?.end_time}</h5>
                    <h5 className='text-sm font-light'>{eventPost?.directions}</h5>

                </div>
               

            </div>

        </div>
     )

}