import React from 'react'
import guzo from "../../assets/guzoLogo.png"
import guzo1 from "../../assets/img1.png"
import guzo2 from "../../assets/img2.png"
import guzo3 from "../../assets/img3.png"
import { accountTypeState } from '../../Recoil/globalstate'
import { useRecoilValue,useRecoilState} from 'recoil';
import { Link } from 'react-router-dom'
  export default function AccountTypes() {
    const [active,setActive]=useRecoilState(accountTypeState)

    return (
      <div className='w-full h-screen' >
            <div className='flex  h-full w-full justify-center  items-center space-x-10'>
             
                  <img 
                    src={guzo}
                    className="w-1/7"
                  />

            

                <div className='w-3/5 flex flex-col space-y-6'>
                      <div className='bg-white w-full flex flex-col space-y-10 items-center py-6 rounded-lg'>
                              <h5 className='text-lg font-semibold'>Join Guzo as an.... </h5>
                              
                              <div className='flex flex-col w-full items-center space-y-6'>
                                {accounts?.map((acct)=>{
                                    return(
                                      <div className={`${active==acct?.name?'flex w-1/2 border-blue-700 border border-4 justify-center items-center px-6 py-4 space-x-4 rounded-lg':'flex w-1/2 hover:border-blue-700 border hover:border-4 justify-center items-center px-6 py-4 space-x-4 rounded-lg'}`}
                                        onClick={()=>setActive(acct?.name)}
                                      >
                                            <div className='flex flex-col space-y-4 items-center'>
                                                <img 
                                                   src={acct?.img}
                                                />
                                                <h5 className='text-sm font-semibold'>{acct?.name}</h5>
                                            </div>
                                            <div className='w-3/4'>
                                              <p className='text-xs font-semibold '> {acct?.desc}</p>
                                            </div>
                                       </div>
                                    )
                                   
                                  })

                                }

                              </div>

                      </div>
                        <div className='flex  items-center w-full justify-between'>
                            <h5 style={{color: "rgba(37, 31, 134, 1)"}}
                              onClick={()=>window.history.go(-1)}
                              >
                              Back
                            </h5>
                         
                               <Link to={`/create-account/profile/${active}`}>
                               <button className='px-6 py-2 text-blue-600 rounded-full' style={{background: "rgba(237, 237, 237, 1)"}}> Continue</button>
                         
                             </Link>
                        

                      
                   
                            
                           
                       </div>
                  
                </div>

            </div>
          

      </div>
    )
  }




  const accounts=[
    {
      img:guzo1,
      name:"Individual",
      desc:"I am an individual joining ecosystems to post and participate in opportunities"

    },
    {
      img:guzo2,
      name:"Organization",
      desc:"I am an organization joining ecosystems to post and participate in opportunities"
    },
    {
      img:guzo3,
      name:"Ecosystem",
      desc:"I host an ecosystem of organizations and individuals and their opportunities"
    },

  ]