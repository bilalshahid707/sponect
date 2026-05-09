import { Box, Typography, Tabs, TabList, Tab, TabPanel } from '@mui/joy'

export const ManagePitches = () => {
  return (
    <Box sx={{ height: "100vh", width: "100%", overflowY: "scroll" }}>
      {/* Dashboard Header */}
      <Box
        className="flex flex-col gap-lg p-lg w-full"
      >
        <Box>
          <Typography level="headingTertiary" sx={{ color: "dark.main" }}>
            Manage Pitches
          </Typography>
        </Box>
        {/* <Tabs
          defaultValue={0}
          sx={{
            bgcolor: "transparent", width: "100%" , display:"flex",gap:2, flexDirection:"column"
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
                  borderRadius: "6px 6px 0 0",flexShrink:0
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
            <SponseeOverviewForm />
          </TabPanel>
          <TabPanel value={1}>
            <SponseeSocialsForm />
          </TabPanel>
          <TabPanel value={2}>
            <SponseeContactsForm />
          </TabPanel>
        </Tabs> */}
      </Box>
    </Box>
  )
}

export default ManagePitches