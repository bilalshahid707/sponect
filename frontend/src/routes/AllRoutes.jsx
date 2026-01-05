import React from "react"
import { Routes,Route } from "react-router-dom"


import {HomePage,SigninPage,SignupPage,SponsorSettings,AccountSettings,Dashboard,Sponsor} from "../pages"

export const AllRoutes = ()=>{
    return (
        <>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/signin" element={<SigninPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/sponsors/:id" element={<Sponsor/>}/>

            {/* settings */}
            {/* <Route element={<ProtectedRoutes/>}> */}
            <Route path="/dashboard" element={<Dashboard/>}>
                <Route index element={<AccountSettings/>}/>
                <Route path="/dashboard/sponsor-settings" element={<SponsorSettings/>}/>
            {/* </Route> */}

            </Route>
        </Routes>
        </>
    )
}

export default AllRoutes