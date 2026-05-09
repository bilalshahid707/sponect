import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logUser, setUser } from "../../../services/UserAuth";
import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, List, ListItem, ListItemButton } from "@mui/joy";
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
        },
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
    <Box component="nav" className="p-sm">
      <List className="flex flex-col gap-sm text-base font-medium">
        <ListItem>
          <ListItemButton
            variant="plain"
            onClick={() => {navigate('/dashboard')}}
            sx={{
              "&.Mui-selected, &[aria-selected='true'], &:hover": {
                bgcolor: "dark.hover",
              },
              borderRadius: 3,
            }}
          >
            <ManageAccountsIcon
              style={{ fontSize: 20, color: "var(--color-primary)" }}
            />
            <span className="text-white font-medium">Account</span>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton
            variant="plain"
            onClick={() => {navigate("/dashboard/profile-settings")}}
            sx={{
              "&.Mui-selected, &[aria-selected='true'], &:hover": {
                bgcolor: "dark.hover",
              },
              borderRadius: 3,
            }}
          >
            <PersonIcon
              style={{ fontSize: 20, color: "var(--color-primary)" }}
            />
            <span className="text-white font-medium">Profile</span>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton
            variant="plain"
            onClick={onLogout}
            sx={{
              "&.Mui-selected, &[aria-selected='true'], &:hover": {
                bgcolor: "dark.hover",
              },
              borderRadius: 3,
            }}
          >
            <LogoutIcon style={{ fontSize: 18, color: "#ef4444" }} />
            <span className="text-red-500">Logout</span>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default UserNav;
