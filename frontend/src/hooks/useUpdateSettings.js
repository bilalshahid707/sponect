import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const useUpdateSettings = ({  path }) => {

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.patch(
        `${API_URL}/${path}`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
  });
  return mutation;
};

export default useUpdateSettings;
