import { Header, Footer } from "./components";
import { AllRoutes } from "./routes";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, logUser } from "./services/UserAuth";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_APP_API_URL;

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const { isPending } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/users/me`, {
        withCredentials: true,
      });
      const userData = response.data?.data;
      dispatch(setUser(userData));
      dispatch(logUser(true));
      return userData;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
    onError: () => {
      dispatch(setUser(null));
      dispatch(logUser(false));
    },
  });

  const hideLayout = ["/dashboard", "/signup", "/signin"].some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!hideLayout && <Header transparent={location.pathname === "/"} />}
      <AllRoutes />
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
