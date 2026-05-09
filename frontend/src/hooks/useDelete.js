import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const useDelete = ({ path }) => {
  const mutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`${API_URL}/${path}/${id}`, {
        withCredentials: true,
      });
      return response.data;
    },
  });
  return mutation;
};

export default useDelete;
