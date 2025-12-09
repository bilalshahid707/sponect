import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logUser } from "../services/UserAuth";
import { useQueryClient } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const useAuth = (endpoint) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${API_URL}/auth/${endpoint}`, data, {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      dispatch(logUser(true));
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    },
  });

  return mutation;
};
