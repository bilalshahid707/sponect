import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logUser, setUser } from "../../services/UserAuth";
import { User, LogOut } from "lucide-react";
import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

export const UserNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${API_URL}/auth/signout`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      dispatch(logUser(false));
      dispatch(setUser(null));
      navigate("/");
      navigate(0);
    },
    onError: (error) => {
      alert(error.response?.data?.message || error.message);
    },
  });
  const onLogout = () => {
    mutation.mutate();
  };
  return (
    <>
      <nav className="p-sm border-b-2 border-gray-100">
        <ul className="flex flex-col gap-sm text-dark text-base font-medium">
          <li>
            <button
              className="
                  flex items-center gap-sm
                  w-full text-left
                  p-sm
                  rounded-xl hover:bg-gray-100
                "
            >
              <User size={18} className="text-primary" />
              <Link to={"dashboard"}>
                <span className="text-dark">Dashboard</span>
              </Link>
            </button>
          </li>

          <li>
            <button
              onClick={onLogout}
              className="
                  flex items-center gap-sm
                  w-full text-left
                  p-sm
                  rounded-xl hover:bg-gray-100
                  text-red-500
                "
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default UserNav;
