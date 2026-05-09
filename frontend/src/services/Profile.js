import { createSlice } from "@reduxjs/toolkit";

const initialState={
    Data:null,
}

export const Profile = createSlice({
    name:"Profile",
    initialState,
    reducers:{
        setProfile:(state,action)=>{
            state.Data=action.payload
        }
    }
})

export const { setProfile } = Profile.actions;
export default Profile.reducer