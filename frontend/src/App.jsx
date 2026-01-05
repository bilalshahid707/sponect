import { Header, Footer } from "./components";
import { AllRoutes } from "./routes";
import { useQuery } from "@tanstack/react-query";
import { setUser, logUser } from "./services/UserAuth";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";

const API_URL = import.meta.env.VITE_APP_API_URL;

function App() {
  const location = useLocation()

  const dispatch = useDispatch();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/users/me`, {
        withCredentials: true,
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (user) {
      dispatch(setUser(user?.data));
      dispatch(logUser(true));
    } else {
      dispatch(setUser(null));
      dispatch(logUser(false));
    }
  }, [user]);

  return (
    <>
      {['/dashboard', '/signup', '/signin'].some(path => location.pathname.startsWith(path))?'':<Header />}
      <AllRoutes />
      {['/dashboard', '/signup', '/signin'].some(path => location.pathname.startsWith(path))?'':<Footer />}
    </>
  );
}

export default App;
