import { NavLink } from "react-router-dom";
import { memo } from "react";
export const SideBar = () => {

  return (
    <aside className="flex flex-col h-screen w-64 bg-dark text-white">
      <nav className="flex flex-col gap-sm">
        <NavLink
          to="."
          end
          className={({ isActive }) =>
            `flex items-center p-sm gap-md rounded-xl transition-colors duration-200 hover:bg-primary ${
              isActive ? "bg-primary text-white" : ""
            }`
          }
        >
          <i className="bi bi-person text-white" style={{ fontSize: "20px" }}></i>
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="organization"
          className={({ isActive }) =>
            `flex items-center p-sm gap-md rounded-xl transition-colors duration-200 hover:bg-primary ${
              isActive ? "bg-primary text-white" : ""
            }`
          }
        >
          <i className="bi bi-building text-white" style={{ fontSize: "20px" }}></i>
          <span>Organization</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default memo(SideBar);
