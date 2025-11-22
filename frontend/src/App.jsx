import { Header, Footer, AllRoutes } from "./imports";
import { useQuery } from "@tanstack/react-query";
import { setUser, logUser } from "./services/UserAuth";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";

function App() {
  const API_URL = import.meta.env.VITE_APP_API_URL;
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
      <Header />
      <AllRoutes />
      <Footer />
    </>
  );
}

export default App;
