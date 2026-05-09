import { Tabs, TabList, TabPanel, Box, Tab } from "@mui/joy";
import { PitchTab0 } from "../forms/PitchTab0";
import { useSearchParams } from "react-router-dom";

const tabs = [
  { name: "Overview",   index: 0 },
  { name: "Details",    index: 1 },
  { name: "Promotion",  index: 2 },
  { name: "Packages",   index: 3 },
  { name: "Media",      index: 4 },
];

export const CreatePitch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabNumber = Number(searchParams.get("tabNumber")) || 0;

  return (
    <div className="min-h-screen w-full bg-bg overflow-y-auto">

      {/* Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          padding: { xs: 2, md: 4 },
        }}
      >
        <Tabs
          onChange={(e, newValue) => setSearchParams({ tabNumber: newValue })}
          defaultValue={0}
          value={tabNumber}
          sx={{
            bgcolor: "transparent",
            width: "100%",
            display: "flex",
            gap: 2,
            alignItems: "stretch",
          }}
        >
          <TabList
            size="sm"
            sx={{
              justifyContent: "left",
              display: "flex",
              gap: 2,
              fontWeight: "600",
              bgcolor: "transparent",
              overflowX: "auto",
              overflowY: "hidden",
            }}
          >
            {tabs.map((tab) => (
              <Tab
                sx={{ borderRadius: "6px 6px 0 0", flexShrink: 0 }}
                indicatorInset
                value={tab.index}
                key={tab.index}
              >
                {tab.name.toUpperCase()}
              </Tab>
            ))}
          </TabList>

          <TabPanel value={0}>
            <PitchTab0 />
          </TabPanel>
        </Tabs>
      </Box>

    </div>
  );
};

export default CreatePitch;
