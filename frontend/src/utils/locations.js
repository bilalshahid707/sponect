import axios from "axios";

export const locations = async () => {
  const response = await axios.get(
    `https://api.countrystatecity.in/v1/countries/PK/cities`,
    {
      headers: {
        "X-CSCAPI-KEY":
          import.meta.env.VITE_STATES_API_KEY,
      },
    }
  );
  const cities = response.data.map((city) => city?.name);
  return cities;
};

