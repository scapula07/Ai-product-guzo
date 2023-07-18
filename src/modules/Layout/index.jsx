import React from 'react'
import SidePanel from './sidePanel'
import TabsPanel from './tabsPanel'
import Header from './header'


export default function Layout({children}) {
  return (
    <div className='w-full overflow-x-hidden overflow-y-hidden h-screen' style={{background: "rgba(242, 242, 242, 0.6)"}}>
        <div className='flex w-full h-full relative'>

            <div className='w-1/4  h-full overflow-y-hidden flex  '>
                <div className='w-1/5 border-r h-full '>
                   <SidePanel />
                </div>
                <div className=' border-r h-full w-4/5 '>
                   <TabsPanel />

                </div>
               
               
            </div>
            <div className='w-3/4 relative pt-8 px-8 h-full'>
               <div className='absolute top-0 w-full py-8 px-16'>
                   <Header />
                </div> 
               <div className='pt-20 overflow-y-auto h-full'>
                {children}
               </div>
                
            </div>



        </div>

    </div>
  )
}
