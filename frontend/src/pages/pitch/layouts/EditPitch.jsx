import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabList, TabPanel, Box, Tab } from "@mui/joy";
import { PitchTab0 } from "../forms/PitchTab0";
import { PitchTab1 } from "../forms/PitchTab1";
import { PitchTab2 } from "../forms/PitchTab2";
import { PitchTab3 } from "../forms/PitchTab3";
import { PitchTab4 } from "../forms/PitchTab4";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { NotFoundPage } from "../../../pages/not-found/NotFoundPage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const EditPitch = () => {
  const user = useSelector(state=>state.User?.Data)

  const [searchParams, setSearchParams] = useSearchParams();
  const { pitchId } = useParams();
  const tabNumber = searchParams.get("tabNumber");

  const response = useQuery({
    queryKey: ["pitch", pitchId],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/pitches/${pitchId}`);
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const pitch = response?.data;
  const pitchStatus = pitch?.status;

  if (!response.isPending && pitch && user?.Sponsee?.id !== pitch?.sponseeId) {
    return <NotFoundPage />;
  }

  const tabs = [
    {
      name: "Overview",
      index: 0,
    },
    {
      name: "Details",
      index: 1,
    },
    {
      name: "Preferences",
      index: 2,
    },
    {
      name: "Packages",
      index: 3,
    },
    {
      name: "Media",
      index: 4,
    },
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
          padding: 4,
          marginTop: { xs: 5, md: 0 },
        }}
      >
        <Tabs
          onChange={(e, newValue) => {
            setSearchParams({ tabNumber: newValue });
          }}
          defaultValue={
            pitchStatus === "draft" ? Number(pitch?.tabNumber) : 0
          }
          value={Number(tabNumber)}
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
              color: "white.light",
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
                disabled={Number(pitch?.wizardNumber) < tab.index}
              >
                {tab.name.toUpperCase()}
              </Tab>
            ))}
          </TabList>
          {pitch ? (
            <>
              <TabPanel value={0}>
                <PitchTab0 pitch={pitch} />
              </TabPanel>
              <TabPanel value={1}>
                <PitchTab1 pitch={pitch} />
              </TabPanel>
              <TabPanel value={2}>
                <PitchTab2 pitch={pitch} />
              </TabPanel>
              <TabPanel value={3}>
                <PitchTab3 pitch={pitch} />
              </TabPanel>
              <TabPanel value={4}>
                <PitchTab4 pitch={pitch} />
              </TabPanel>
            </>
          ) : (
            <div className="max-w-3xl mx-auto mt-2 rounded-md border border-border overflow-hidden">
              <Skeleton className="h-16 w-full rounded-none" />
              <div className="h-0.5 bg-primary" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="grid grid-cols-[1fr_2fr] border-b border-border last:border-0">
                  <div className="p-6 bg-white-light/40 flex flex-col gap-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                  <div className="px-6 py-5 flex flex-col gap-2">
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              ))}
              <div className="px-6 py-4 flex justify-end border-t border-border">
                <Skeleton className="h-9 w-32" />
              </div>
            </div>
          )}
        </Tabs>
      </Box>
    </Box>
  );
};

export default EditPitch;
