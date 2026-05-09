import { Sidebar } from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/joy";

export const Dashboard = () => {
    return(
        <>
        <Box sx={{display:'flex', gap:{xs:4,md:0}}}>
        <Sidebar/>
        <Outlet/>
        </Box>
        </>
    )
};

export default Dashboard;
