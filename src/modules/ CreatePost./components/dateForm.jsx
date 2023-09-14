import React,{useState} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function DateForm({selectdate,setDate,onSet,pickDate}) {
   
  return (
         <>

            <DatePicker
                selected={selectdate} 
                onChange={(date) =>setDate(date)} 
                onSelect={onSet}
                className=' py-2 px-4 w-full rounded-md text-sm outline-none border'
            />
            
            

        

      </> 
  )
}
