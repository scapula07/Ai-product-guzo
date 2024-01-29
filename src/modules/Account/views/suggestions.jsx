import React from 'react'
import sug1 from "../../assets/sug1.png"
import sug2 from "../../assets/sug2.png"
import sug3 from "../../assets/sug3.png"
import sug4 from "../../assets/sug4.png"

export default function Suggestions() {
  return (
    <div className='w-full bg-white py-4 rounded-lg px-4'>
        <h5 className='font-semibold text-lg'>Get better connected...</h5>
        <div className='flex flex-col py-4 space-y-6'>
            {suggestions.map((sug)=>{
                  return(
                    <div className='w-full flex items-center space-x-3'>
                        <img 
                          src={sug?.img}
                          className="rounded-full h-10 w-10"
                        />
                         <div className='flex items-center w-full justify-between'>
                            <div className='flex flex-col'>
                                <h5 className='font-semibold text-sm  '>{sug?.name}</h5>
                                <h5 className='text-sm'>Ecosystems</h5>

                             </div>

                            <button className='border rounded-full text-blue-600 border-blue-600 text-sm font-semibold px-4 py-1'>
                                Join
                            </button>

                        </div>



                    </div>
                  )
            })

           } 

        </div>

       

    </div>
  )
}


const suggestions=[
    {name:"Fifth Ward CRC",
       img:sug1

    },
        {name:"Pearland Innovation Hub",
        img:sug2

    },
    {name:"Greater Heights Area CoC",
    img:sug3

    },
    {name:"Texas Craft Brewers Guild",
    img:sug4

    }
]