import { Children } from 'react'
import { useSelector } from "react-redux";
import { Navigate,Outlet } from 'react-router-dom';

export const ProtectedRoutes = () => {
    const loggedIn = useSelector(state=>state.User.LoggedIn)
  return (
    <>
    {loggedIn?<Outlet/>:<Navigate to={'/signin'} replace/>}
    </>
  )
}

export default ProtectedRoutes