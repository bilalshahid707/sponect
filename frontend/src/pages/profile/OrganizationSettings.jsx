import { Applicant, Sponsor } from "../../imports";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const OrganizationSettings = () => {
  const user = useSelector((state) => state.User?.Data);

  const accountType =
    user?.accountType === "applicant" ? "applicants" : "sponsors";

  const { data } = useQuery({
    queryKey: [accountType],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/${accountType}/me`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const organization = data?.data;

  return (
    <>
      {accountType === "applicants" ? (
        <Applicant initialData={organization} />
      ) : (
        <Sponsor initialData={organization} />
      )}
    </>
  );
};

export default OrganizationSettings;
