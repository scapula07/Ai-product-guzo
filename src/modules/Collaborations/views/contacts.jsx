import React from 'react'
import SearchBar from '../components/searchbar'
import {BsThreeDots} from "react-icons/bs"
import Contactgroup from './contactgroup'
import ContactTable from './contactTable'

export default function Contacts() {
  return (
        <div className='w-full'>

            <div className='flex flex-col w-full'>
                <div className='flex items-center justify-between w-full'>
                        <div className='flex space-x-6 items-center w-3/4'>
                            <div className='w-2/5 '>
                            <SearchBar
                                title="Search contacts group"
                            />
                            </div>
                        
                            <h5 className='text-sm font-semibold w-1/4 flex items-center space-x-4 '>
                            <span>Guzo Project</span> 
                            <BsThreeDots />
                            </h5>

                        </div>
                        <div className='flex w-1/4'>
                            <SearchBar 
                            title="Search "
                            />

                        </div>

                    </div>

                </div>

                <div className='flex '>
                    <div className='w-1/4'>
                        <Contactgroup />

                    </div>
                    <div className='w-3/4'>
                        <ContactTable />

                    </div>

                </div>

        </div>
  )
}
