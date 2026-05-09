import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Sponsor } from "./sponsor";
import { Sponsee } from "./sponsee";
import { useEffect } from "react";
import { setProfile } from "../../../services/Profile";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const Profile = () => {
  const user = useSelector((state) => state.User.Data);

  const dispatch = useDispatch();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/${user?.role}s/me`, {
        withCredentials: true,
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    dispatch(setProfile(profile?.data));
  }, [profile?.data]);

  return <>{user?.role === "sponsor" ? <Sponsor /> : <Sponsee />}</>;
};

export default Profile;
