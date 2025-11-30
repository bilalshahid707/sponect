import React from "react"
import { Routes,Route } from "react-router-dom"
import { ProtectedRoutes } from "./ProtectedRoutes"

import {HomePage,SigninPage,SignupPage,ProfileLayout,ProfileSettings,CreateSponsor} from "../pages"

export const AllRoutes = ()=>{
    return (
        <>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/signin" element={<SigninPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>

            {/* settings */}
            <Route element={<ProtectedRoutes/>}>
            <Route path="/profile" element={<ProfileLayout/>}>
                <Route index element={<ProfileSettings/>}/>
            </Route>

            <Route path="/sponsors/create" element={<CreateSponsor/>}/>
            </Route>
        </Routes>
        </>
    )
}

export default AllRoutes