import React from "react"
import { Routes,Route } from "react-router-dom"
import { HomePage,LoginPage,SignupPage,PrivateRoute,ProfileLayout,OrganizationSettings,ProfileSettings } from "../imports"

export const AllRoutes = ()=>{
    return (
        <>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="signup" element={<SignupPage/>}/>

            {/* settings */}
            <Route element={<PrivateRoute/>}>
            <Route path="/profile" element={<ProfileLayout/>}>
                <Route index element={<ProfileSettings/>}/>
                <Route path="organization" element={<OrganizationSettings/>} />
            </Route>
            </Route>
        </Routes>
        </>
    )
}

export default AllRoutes