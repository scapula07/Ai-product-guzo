import React,{useRef,useState,useEffect} from 'react'
import upload from "../../modules/assets/upload.png"
import {IoMdRadioButtonOn,IoMdRadioButtonOff} from "react-icons/io"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateForm from './components/dateForm';
import axios from 'axios';
import ReactSelect from "react-select";


export default function Events({setOthers, eventPost,setEvt,setSelectedFile,setEvent}) {
    const [choice,setChoice]=useState("In Person")

    
    const close=()=>{
        setOthers(false) 
        setEvent(false)
        setEvt("")

      }

     

   
  return (
    <div className='w-full flex justify-center'>
        
        <div className='w-3/4 flex flex-col space-y-6'>
                <h5 className='text-2xl font-semibold'>Add Event Details to your post...</h5>
                <div className='flex flex-col'>
                     <div className="flex items-center space-x-6 ">
                         {["In Person","Online"].map((text)=>{
                             return(
                                <div className='flex items-center space-x-1'>
                                   
                                    <>
                                    {choice===text?
                                    < IoMdRadioButtonOn 
                                       className='text-slate-500 text-lg'
                                     
                                    />
                                    :
                                    <IoMdRadioButtonOff 
                                        className='text-slate-500 text-lg'
                                        onClick={()=>setChoice(text)}
                                    />
                                    }
                                    </>
                                   
                                 <h5 className='font-light text-xs'>{text}</h5>
                                </div>

                                )
                            })
                        
                         }

                     </div>

                </div>


                <div className='flex flex-col space-y-4'>
                    <div className='flex flex-col w-full space-y-2'>
                                <label className='text-sm text-slate-700 font-semibold'>Event Name*</label>
                                <input 
                                    placeholder='What is the name of your event'
                                    className=' py-2 px-4 w-full rounded-md text-sm outline-none border'
                                    name="title"
                                    value={eventPost?.title}
                                    onChange={(e)=>setEvt({...eventPost,title:e.target.value})}
             
            
                                />

                        </div> 
                    
                        <div className='flex flex-col w-full space-y-2'>
                                <label className='text-sm text-slate-700 font-semibold'>Event Description</label>
                                <textarea
                                    placeholder='Include a description of your opportunity, request or need..... '
                                    className=' py-2 h-28 px-4 w-full rounded-md text-sm outline-none border'
                                    name="body"
                                    value={eventPost?.body}
                                    onChange={(e)=>setEvt({...eventPost,body:e.target.value})}
            
                                />

                        </div> 

                  </div>
                  <EventForms 
                   eventPost={eventPost}
                   setEvt={setEvt}
                   choice={choice}
                  />


              <div className='flex justify-end w-full pt-4 pb-3'>
                   <div className='flex items-center items-center space-x-6'>
                          <button 
                        
                             className='text-blue-700 rounded-full px-12 py-1.5 border border-blue-700'
                             onClick={close}
                            >
                            Back
                        </button>



                        <button
                             style={{background: "rgba(236, 235, 254, 1)"}}
                             className='text-blue-700 rounded-full px-12 py-1.5'
                             onClick={()=>setOthers(false) || setEvent(false)}
                            >
                            Next
                        </button>


                   </div>

              </div>
             

        </div>
     </div>

  )
}




const EventForms=({ eventPost,setEvt,choice})=>{
    // const [pickDate, setPick] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [pickStartDate, setStart] = useState(false);
    const [pickEndDate, setEnd] = useState(false);

    const [timezones,setTime]=useState([])


    const style = {
        control: (base) => ({
          ...base,
          border: "0px solid rgba(242,242,242,0.6)",
          width: "100%",
          boxShadow: "none",
          backgroundColor: "white",
          fontSize: "10px",
          "@media (min-width:600px)": {
            width: "100%",
          },
          "@media (min-width:1200px)": {
            width: "100%",
          },
        }),
      };



      console.log(eventPost,"postte ")

      useEffect(() => {
        getTimeZones();
      }, []);
    

      async function getTimeZones() {
        await axios
          .get("https://timeapi.io/api/TimeZone/AvailableTimeZones")
          .then((response) => {
            console.log(response,"timeemmm")
            setTime(response?.data);
          });
      }
     

      console.log(timezones,"time zonesssss")

     return(
        <div className='flex flex-col py-4 space-y-4'>
            <div  className='grid grid-flow-row lg:grid-cols-2 grid-cols-1 gap-4 gap-y-8 h-full w-full' >
                    <div className='flex flex-col w-full space-y-2'>
                         <label className='text-sm text-black font-semibold'>Timezone</label>
                
                    
                            {/* <input 
                                placeholder="(UTC) Central Time (US and Canada)"
                                className=' py-2 px-4 w-full rounded-md text-sm outline-none border'
                                onChange={(e)=>setEvt({...eventPost,timezone:e.target.value})}
                                value={eventPost?.timezone}
                                name={"time"}
                        


                            /> */}
                                  <div className="border-[1px] border-[rgba(242,242,242,0.6)] rounded-[8px] w-full">
                                        <ReactSelect
                                            styles={style}
                                            placeholder='(UTC) Central Time (US and Canada)'
                                            options={
                                            timezones &&
                                            timezones?.map((item, index) => ({
                                        
                                                value: item,
                                            }))
                                            }
                                            value={eventPost?.timezone}
                                            menuPlacement="auto"
                                            menuPosition="fixed"
                                            noOptionsMessage={(opt) => {
                                            if (opt.inputValue === "") {
                                                return "Select your time zone";
                                            } else {
                                                return "no search results for " + opt?.inputValue;
                                            }
                                            }}
                                            components={{
                                            IndicatorSeparator: () => null,
                                            }}
                                            onChange={(opt) => {
                                                setEvt({...eventPost,timezone:opt?.value})
                                            }}
                                        />
                                    </div>
                    </div>
                    <div className='flex flex-col w-full space-y-2'>
                         <label className='text-sm text-black font-semibold'>Start Date</label>
                
                    
                         <DateForm 
                           selectdate={startDate}
                           setDate={setStartDate}
                           onSet={(e)=>{
                            const date = new Date(e);

                            const day = date.getDate();
                            const month = date.toLocaleString('default', { month: 'short' }); 
                            const year = date.getFullYear(); 
                            setEvt({...eventPost,start_date: `${day} ${month} ${year}`})
                           }
                          }
                           pickDate={pickStartDate}
                           
                         />
                    </div>

                    <div className='flex flex-col w-full space-y-2'>
                         <label className='text-sm text-black font-semibold'>Start Time</label>
                
                    
                            <input 
                               placeholder="Start Time"
                                className=' py-2 px-4 w-full rounded-md text-xs outline-none border'
                                onChange={(e)=>setEvt({...eventPost,start_time:e.target.value})}
                                name={"time"}
                        


                            />
                    </div>

                    <div className='flex flex-col w-full space-y-2'>
                         <label className='text-sm text-black font-semibold'>End Date</label>
                
                    
                         <DateForm 
                           selectdate={endDate}
                           setDate={setEndDate}
                           onSet={(e)=>{
                            const date = new Date(e);

                            const day = date.getDate();
                            const month = date.toLocaleString('default', { month: 'short' }); 
                            const year = date.getFullYear(); 
                            setEvt({...eventPost,end_date: `${day} ${month} ${year}`})
                           }
                          }
                           pickDate={pickStartDate}
                           
                         />
                    </div>

                    <div className='flex flex-col w-full space-y-2'>
                         <label className='text-sm text-black font-semibold'>End Time</label>
                
                    
                            <input 
                               placeholder="Start Time"
                                className=' py-2 px-4 w-full rounded-md text-xs outline-none border'
                                onChange={(e)=>setEvt({...eventPost,end_time:e.target.value})}
                                name={"time"}
                        


                            />
                    </div>

                    
                 

            </div>
            {choice==="In Person"&&

            
            <div className='flex flex-col py-4 space-y-6'>
                {[
                       {
                        name:"Location/Address",
                        placeholder:"Venue/Address",
                        click:(e)=>setEvt({...eventPost,location:e.target.value})

                    },
                    {
                        name:"Additional Directions",
                        placeholder:"Floor Number, Room Number, Parking Details",
                        click:(e)=>setEvt({...eventPost,directions:e.target.value})


                    }].map((field)=>{
                        
                        return(
                        
                    <div className='flex flex-col w-full space-y-2'>
                            <label className='text-sm text-black font-semibold'>{field?.name}</label>
                            <input 
                                placeholder={field?.placeholder}
                                className=' py-2 px-4 w-full rounded-md text-sm outline-none border'
                                onChange={(e)=>field?.click(e)}


                            />
            
                        </div> 
                        )
                    })
        

                    }
             </div>
             }
                

             <div className='flex flex-col py-2 space-y-6'>
                {[ {
                        name:"Event Link",
                        placeholder:"Link",
                        click:(e)=>setEvt({...eventPost,link:e.target.value})


                    },
                    {
                        name:"Featured Participant(s)",
                        placeholder:"Add Ecosystem, Organization, or Individual accounts...",
                        click:(e)=>setEvt({...eventPost,participants:e.target.value})


                    }

                  ].map((field)=>{
                        
                            return(
                            
                        <div className='flex flex-col w-full space-y-2'>
                                <label className='text-sm text-black font-semibold'>{field?.name}</label>
                                <input 
                                    placeholder={field?.placeholder}
                                    className=' py-2 px-4 w-full rounded-md text-sm outline-none border'
                                    onChange={(e)=>field?.click(e)}


                                />
                
                            </div> 
                            )
                        })
            

                        }

             </div>
           
     

        </div>
     )
}