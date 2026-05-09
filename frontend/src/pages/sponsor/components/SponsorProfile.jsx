import React from "react";
import { Box, Typography } from "@mui/joy";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "motion/react";
import ProfileHeader from "./ProfileHeader";
import AboutSection from "./AboutSection";
import SponsorshipPreferences from "./SponsorshipPreferences";
import Sponsorships from "./Sponsorships";
import StatsCard from "./StatsCard";
import PostedBy from "./PostedBy";
import SocialsSection from "./SocialsSection";
import ContactsSection from "./ContactsSection";
import SponsorProfileSkeleton from "./SponsorProfileSkeleton";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay: i * 0.08 },
  }),
};
const API_URL = import.meta.env.VITE_APP_API_URL;

export const SponsorProfile = () => {
  const { id } = useParams();

  // Fetch sponsor data from API
  const { data: sponsorData, isLoading, error } = useQuery({
    queryKey: ["sponsor", id],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/sponsors/${id}`, {
        withCredentials: true,
      });
      return response.data.data;
    },
    enabled: !!id,
    staleTime: Infinity,
  });

  return (
    <section className="bg-white min-h-screen py-6 md:py-8">
      {isLoading && (
        <SponsorProfileSkeleton/>
      )}
      {error && (
        <Box className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 rounded-xl border border-primary-light bg-white p-8 text-center">
          <Typography level="body-lg" sx={{ color: "primary.main", fontWeight: 600 }}>
            Error loading sponsor profile
          </Typography>
        </Box>
      )}
      {!isLoading && !error && (
        <Box className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <ProfileHeader sponsorData={sponsorData ?? {}} />
          </motion.div>
          {/* Main Content Grid */}
          <Box className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
            {/* Left Column - Main Content */}
            <Box className="flex flex-col gap-6">
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                <AboutSection description={sponsorData?.description} />
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                <SponsorshipPreferences sponsorData={sponsorData ?? {}} />
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
                <Sponsorships sponsorships={sponsorData?.sponsorships} />
              </motion.div>
            </Box>

            {/* Right Sidebar */}
            <Box className="flex flex-col gap-4">
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                <StatsCard sponsorData={sponsorData ?? {}} />
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
                <PostedBy user={sponsorData?.postedBy} />
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}>
                <SocialsSection socials={sponsorData?.socials} />
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5}>
                <ContactsSection contacts={sponsorData?.contacts} />
              </motion.div>
            </Box>
          </Box>
        </Box>
      )}
    </section>
  );
};

export default SponsorProfile;
