import {atom} from "recoil"


export const accountTypeState =atom({
   key:"account",
   default:"Individual"
})

export const HotelState =atom({
   key:"hotel",
   default:[]
})