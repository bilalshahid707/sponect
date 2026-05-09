import { Box, Avatar, Typography } from "@mui/joy";
import { useSelector } from "react-redux";
export const UserBadge = () => {
  const user = useSelector((state) => state.User.Data);

  return (
    <Box className="flex items-center gap-1 rounded-md">
      <Avatar
        variant="outlined"
        size="md"
        src={user?.avatar?.url}
        alt="User Avatar"
      />
      <Box className="flex items-start flex-col">
        <Typography
          level="title-sm"
          sx={{ color: "white.main", fontWeight: "500" }}
        >
          {user?.username}
        </Typography>
        <Typography level="body-xs" sx={{ color: "white.main" }}>
          {user?.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserBadge;
