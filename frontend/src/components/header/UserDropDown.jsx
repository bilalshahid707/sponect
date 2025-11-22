import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { User, LogOut } from "lucide-react";
import { logUser, setUser } from "../../services/UserAuth";
import Avatar from '../../assets/avatar.webp'
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL

export const UserDropDown = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  // Handling Logout
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${API_URL}/auth/signout`, {}, {
        withCredentials: true,
      })
      return response.data
    },
    onSuccess: () => {
      dispatch(logUser(false));
      dispatch(setUser(null))
      navigate('/')
      navigate(0)
    },
    onError: (error) => {
      alert(error.response?.data?.message || error.message)
    },
  })
  const onLogout = () => {
    mutation.mutate()
  }

  return (
    <div className="relative" ref={dropdownRef}>

      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      >
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
          {/* TOP USER INFO */}
          <div className="flex items-center gap-sm p-sm border-b border-white-lighter">
            <img
              src={user?.profileImage?.secureUrl || Avatar}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="body-text font-semibold text-white">{user?.fullName}</p>
              <p className="text-base text-white">{user?.email}</p>
            </div>
          </div>

          {/* MENU OPTIONS */}
          <ul className="mt-sm">
            <li>
              <button
                className="
                  flex items-center gap-sm
                  w-full text-left
                  p-sm
                  rounded-xl hover:bg-dark-lighter
                "
              >
                <User size={18} className="text-primary" />
                <Link to={'profile'}><span className="text-white">Profile</span></Link>
              </button>
            </li>

            <li>
              <button
                onClick={onLogout}
                className="
                  flex items-center gap-sm
                  w-full text-left
                  p-sm
                  rounded-xl hover:bg-dark-lighter
                  text-red-500
                "
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserDropDown
