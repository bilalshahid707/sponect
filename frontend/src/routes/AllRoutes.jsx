import React from "react";
import PropTypes from "prop-types";
import { Routes, Route, Navigate } from "react-router-dom";

import {
  HomePage,
  SigninPage,
  SignupPage,
  Dashboard,
  NotFoundPage,
} from "../pages";

import { Profile } from "../pages/dashboard/profile/Profile";
import { Account } from "../pages/dashboard/account";
import { Sponsor } from "../pages/sponsor/Sponsor";
import { AllSponsors } from "../pages/allsponsors/AllSponsors";
import { CreatePitch, EditPitch, PitchPage } from "../pages/pitch";
import { AllPitches } from "../pages/allpitches/AllPitches";
import { useSelector } from "react-redux";
import {ManagePitches} from "../pages/dashboard/pitches/ManagePitches";

const SponseeRoute = ({ children }) => {
  const loggedIn = useSelector((state) => state.User?.LoggedIn);
  const user = useSelector((state) => state.User?.Data);

  if (!loggedIn) return <Navigate to="/signin" replace />;
  if (user?.role !== "sponsee") return <NotFoundPage />;
  return children;
};

SponseeRoute.propTypes = { children: PropTypes.node.isRequired };

export const AllRoutes = () => {
  const loggedIn = useSelector((state) => state.User?.LoggedIn);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/sponsors" element={<AllSponsors />} />
      <Route path="/sponsors/:id" element={<Sponsor />} />

      {/* <Route element={<ProtectedRoutes/>}> */}
      <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Navigate to="/signin" replace />}>
        <Route index element={<Account />} />
        <Route path="/dashboard/profile-settings" element={<Profile />} />
        <Route path="/dashboard/manage-pitches" element={<ManagePitches />} />
      </Route>

      <Route path="/pitches" element={<AllPitches />} />
      <Route path="/pitches/create" element={<SponseeRoute><CreatePitch /></SponseeRoute>} />
      <Route path="/pitches/:pitchId/edit" element={<SponseeRoute><EditPitch /></SponseeRoute>} />
      <Route path="/pitches/:pitchId" element={<PitchPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AllRoutes;
