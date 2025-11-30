import { useState, useRef, useEffect } from "react";
import Avatar from "../../assets/avatar.webp";
import { UserInfo } from "./UserInfo";
import { UserNav } from "./UserNav";

export const UserDropDown = ({ user }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // close on click outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative hidden md:block" ref={dropdownRef}>
      <button onClick={() => setOpen(!open)} className="cursor-pointer">
        <img
          src={user?.profileImage?.secureUrl || Avatar}
          className="w-12 h-12 rounded-full object-cover"
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute right-0 mt-sm
            w-max h-max bg-dark shadow-lg rounded-3xl
            p-md  z-50 
          "
        >
          <UserInfo user={user} />
          
          <UserNav />
        </div>
      )}
    </div>
  );
};

export default UserDropDown;
