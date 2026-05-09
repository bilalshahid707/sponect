import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Avatar from "../../assets/avatar.webp";
import { UserNav } from "./UserNav";
import { AccountOverview } from "../common/AccountOverview";

export const UserDropDown = ({ user }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

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
      {/* Trigger */}
   

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full hover:bg-white-light transition-colors cursor-pointer bg-white-lighter w-18"
      >
        <img
          src={user?.avatar?.url || Avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover "
        />
        <ChevronDown
          size={16}
          className={`text-dark transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
  

      {/* Dropdown panel */}
      <div
        className={`absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-xl z-50 overflow-hidden transition-all duration-200 origin-top-right ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="px-1 pt-1">
          <AccountOverview />
        </div>
        <div className="px-1 pb-1">
          <UserNav />
        </div>
      </div>
    </div>
  );
};

UserDropDown.propTypes = {
  user: PropTypes.object,
};

export default UserDropDown;
