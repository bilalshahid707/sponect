import { Box, TabList, Tabs, Tab, TabPanel, Typography } from "@mui/joy";

import { SponsorOverviewForm } from "./components/SponsorOverviewForm";
import { SponsorPreferencesForm } from "./components/SponsorPreferencesForm";
import { SponsorSocialsForm } from "./components/SponsorSocialsForm";
import { SponsorHistory } from "./components/SponsorHistory";
import { SponsorContactsForm } from "./components/SponsorContactsForm";

export const Sponsor = () => {
  const tabs = [
    { name: "Overview", index: 0 },
    { name: "Preferences", index: 1 },
    { name: "Links", index: 2 },
    { name: "History", index: 3 },
    { name: "Contacts", index: 4 },
  ];

  return (
    <Box sx={{ height: "100vh", width: "100%", overflowY: "scroll" }}>
      {/* Dashboard Header */}
      <Box className="flex flex-col gap-lg p-lg w-full">
        <Box>
          <Typography level="headingTertiary" sx={{ color: "dark.main" }}>
            Sponsor Settings
          </Typography>
        </Box>
        <Tabs
          defaultValue={0}
          sx={{
            bgcolor: "transparent",
            width: "100%",
            display: "flex",
            gap: 2,
            flexDirection: "column",
          }}
        >
          <TabList
            size="sm"
            sx={{
              justifyContent: "flex-start",
              display: "flex",
              gap: 2,
              fontWeight: "600",
              color: "white.light",
              bgcolor: "transparent",
              overflowX: "auto",
              overflowY: "hidden",
              width: "100%",
            }}
          >
            {tabs.map((tab) => (
              <Tab
                sx={{
                  borderRadius: "6px 6px 0 0",
                  flexShrink: 0,
                }}
                indicatorInset
                value={tab.index}
                key={tab.index}
              >
                {tab.name}
              </Tab>
            ))}
          </TabList>
          <TabPanel value={0}>
            <SponsorOverviewForm />
          </TabPanel>
          <TabPanel value={1}>
            <SponsorPreferencesForm />
          </TabPanel>
          <TabPanel value={2}>
            <SponsorSocialsForm />
          </TabPanel>
          <TabPanel value={3}>
            <SponsorHistory />
          </TabPanel>
          <TabPanel value={4}>
            <SponsorContactsForm />
          </TabPanel>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Sponsor;
