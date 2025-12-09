import { useState } from "react";
import {
  Sheet,
  Box,
  IconButton,
  Divider,
  List,
  ListItem,
  Button,
} from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useLocation, useNavigate } from "react-router-dom";

import { AccountOverview } from "../common/AccountOverview";

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);
  const pathname = location.pathname;

  const toggleSidebar = () => setOpenSidebar(!openSidebar);

  const sidebarItems = [
    {
      label: "Account Settings",
      icon: <ManageAccountsIcon />,
      path: "/dashboard",
    },
    {
      label: "Sponsor Settings",
      icon: <DomainAddIcon />,
      path: "/dashboard/sponsor-settings",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        height: "100dvh",
        zIndex: "10000",
        position: "relative",
      }}
    >
      {openSidebar && (
        <Box
          className="Sidebar-overlay"
          sx={{
            position: "fixed",
            zIndex: "9998",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            opacity: openSidebar ? "0.5" : "0",
            backgroundColor: "black",
            transition: "opacity 0.5s",
            transform: {
              xs: openSidebar ? "translateX(0%)" : "translateX(-100%)",
              lg: "translateX(-100%)",
            },
          }}
          onClick={() => toggleSidebar()}
        />
      )}
      <Sheet
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "230px",
          transition: "ease-in-out 0.5s",
          transform: {
            xs: openSidebar ? "translateX(0%)" : "translateX(-100%)",
            md: "translateX(0%)",
          },
          position: { xs: "fixed", md: "sticky" },
          top: 0,
          left: 0,
          height: "100%",
          minHeight: "100vh",
          bgcolor: "dark.main",
          zIndex: "10000",
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <IconButton
            size="sm"
            variant="plain"
            onClick={toggleSidebar}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <CloseIcon color="white.main" />
          </IconButton>
        </Box>

        <AccountOverview />

        <Divider sx={{ borderColor: "white.light" }} />

        {/* Tabs */}
        <List sx={{ display: "flex", flexDirection: "column", mt: 2, gap: 1 }}>
          {sidebarItems.map((item) => (
            <ListItem
              key={sidebarItems.indexOf(item)}
              variant={pathname === item.path ? "solid" : "plain"}
              color={pathname === item.path ? "primary" : "white"}
              onClick={() => navigate(item.path)}
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                transition: "all 0.4s",
                backgroundColor: pathname === item.path ? "primary.main" : "",
                color: pathname === item.path ? "white.main" : "white.lighter",
                "&:hover": {
                  bgcolor: pathname === item.path ? "dark.light" : "dark.light",
                },
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              {item.icon}
              {item.label}
            </ListItem>
          ))}
        </List>

        <Divider sx={{ borderColor: "white.light" }} />

        {/* Log out and back to home */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingTop: 2,
            gap: 1,
          }}
        >
          {/* Log Out Button */}
          <Button
            color="primary"
            onClick={() => navigate(item?.path)} // Assuming 'item' is defined in the surrounding scope
            startDecorator={<LogoutIcon />}
            sx={{
              justifyContent: "flex-start",
              textTransform: "none",
              transition: "all 0.4s",
              background: "none",
              color: "white.main",
              "&:hover": {
                bgcolor: "dark.light",
              },
              borderRadius: 4,
              cursor: "pointer",
              paddingY: "10px",
            }}
          >
            Log Out
          </Button>

          {/* Back to Home Button */}
          <Button
            variant="solid"
            color="primary"
            onClick={() => navigate("/")} // Assuming 'item' is defined in the surrounding scope
            startDecorator={<ArrowBackIcon />}
            sx={{
              justifyContent: "flex-start",
              textTransform: "none",
              transition: "all 0.4s",
              background: "none",
              color: "white.main",
              "&:hover": {
                bgcolor: "dark.light",
              },
              borderRadius: 4,
              cursor: "pointer",
              paddingY: "10px",
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Sheet>
      {!openSidebar && (
        <IconButton
          size="lg"
          variant="plain"
          onClick={toggleSidebar}
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems:'start',
            position: "fixed", 
            height:'100%',
            top: 0,
            left: 0,
            paddingTop:2,
            borderRadius:'0px',
            zIndex: 11000, 
            bgcolor: "dark.main",
            "&:hover": {
              bgcolor: "dark.main",
            },
          }}
        >
          <MenuIcon sx={{color:'primary.main'}} />
        </IconButton>
      )}

      {/* Hamburger Button for Mobile */}
    </Box>
  );
};

export default Sidebar;
