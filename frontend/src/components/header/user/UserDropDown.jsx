import { useRef, useEffect } from "react";
import { UserNav } from "./UserNav";

export const UserDropDown = ({setOpen}) => {
  const dropdownRef = useRef(null);

  // close on click outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative hidden md:block" ref={dropdownRef}>
      <div
        className="
            absolute right-20 top-22
            w-60 h-max bg-dark shadow-xl rounded-xl
            p-sm z-50 
          "
      >
        <UserNav />
      </div>
    </div>
  );
};

export default UserDropDown;
