import {configureStore} from '@reduxjs/toolkit'
import UserSlice from "../slices/UserSlice";

export const store=configureStore({
    reducer : {


        userinfo:UserSlice,

    } ,

})




