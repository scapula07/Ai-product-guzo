import {atom} from "recoil"


export const accountTypeState =atom({
   key:"account",
   default:"Individual"
})

export const groupState =atom({
   key:"hotel",
   default:{}
})

export const userState =atom({
    key:"user",
    default:{}
 })