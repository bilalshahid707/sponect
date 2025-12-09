import React from "react";
import { Box, Avatar, Typography } from "@mui/joy";
import { useSelector } from "react-redux";
export const AccountOverview = () => {
  const user = useSelector((state) => state.User.Data);
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", p: 2, gap: 1 }}>
        <Avatar
          variant="outlined"
          size="sm"
          src="https://i.pravatar.cc/150?img=3"
          alt="User Avatar"
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography level="title-sm" sx={{ color: "white.main" }}>
            {user?.fullName}
          </Typography>
          <Typography level="body-xs" sx={{ color: "white.light" }}>
            {user?.email}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default AccountOverview;
