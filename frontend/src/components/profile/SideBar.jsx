import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu,XCircleIcon,ArrowUpRightFromCircle,BuildingIcon } from "lucide-react";
export const SideBar = () => {

  const [open,setOpen] = useState(false)

  const handleClick = ()=>{
    setOpen(!open)
  }

  return (
    <aside className={`flex flex-col ${open?'h-40':'h-10'} transition-all w-full md:w-64 bg-dark text-white relative`}>
      <div onClick={handleClick}  className={`cursor-pointer md:hidden flex items-start justify-center w-full h-full`}>
        {open?<XCircleIcon size={40}/>:<Menu size={40}/>}
      </div>
      <nav className={`${open?'flex flex-col':'hidden'} md:visible md:flex md:flex-col gap-sm transition-all`}>
        <NavLink
          to="."
          end
          className={({ isActive }) =>
            `flex items-center p-sm gap-md rounded-lg transition-colors duration-200 hover:bg-primary ${
              isActive ? "bg-primary text-white" : ""
            }`
          }
        >
          <i className="bi bi-person text-white" style={{ fontSize: "20px" }}></i>
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/sponsors/create"
          className={({ isActive }) =>
            `flex items-center p-sm gap-md rounded-lg transition-colors duration-200 hover:bg-primary ${
              isActive ? "bg-primary text-white" : ""
            }`
          }
        >
          <BuildingIcon size={20}/>
          <span>Sponsor Profile</span>
          <ArrowUpRightFromCircle size={20} style={{color:'red'}}/>
        </NavLink>
      </nav>
    </aside>
  );
};

export default (SideBar);
