import { useState } from "react";
import { Box, TabList, Tabs, Tab, TabPanel,Typography } from "@mui/joy";


import {
  BasicSettings
} from "../../components";

export const AccountSettings = () => {
  const tabs = [
    { name: "Basic Settings", index: 0 },
    { name: "Password", index: 1 },
  ];

  return (
    <Box sx={{ height: "100vh", width: "100%", overflowY: "scroll" }}>
   
        {/* Dashboard Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            padding:4,
            marginTop: { xs: 5, md: 0 },
          }}
        >
          <Box>
            <Typography level="headingTertiary" sx={{color:'dark.main'}}>Account Settings</Typography>
          </Box>
          <Tabs
            defaultValue={0}
            sx={{ bgcolor: "transparent", width: "100%" , display:"flex",gap:2, alignItems:"stretch"}}
          >
            
            <TabList
              size="sm"
              sx={{
                justifyContent: "left",
                display: "flex",
                gap: 2,
                fontWeight: "600",
                color: "white.light",
                bgcolor: "transparent",
              }}
            >
              {tabs.map((tab) => (
                <Tab
                  sx={{ borderRadius: "6px 6px 0 0" }}
                  indicatorInset
                  value={tab.index}
                  key={tab.index}
                >
                  {tab.name}
                </Tab>
              ))}
            </TabList>
            <TabPanel value={0}>
              <BasicSettings />
            </TabPanel>
          </Tabs>
        </Box>
      </Box>

  );
};

export default AccountSettings;
