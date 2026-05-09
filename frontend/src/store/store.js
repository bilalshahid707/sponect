import { configureStore } from "@reduxjs/toolkit";
import {UserAuth}  from "../services/UserAuth";
import {Profile} from "../services/Profile"
export const store = configureStore({
    reducer:{
        "User":UserAuth.reducer,
        "Profile":Profile.reducer
    },
})

export default store