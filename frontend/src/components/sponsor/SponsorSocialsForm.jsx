import React, { act } from "react";

export const SponsorSocialsForm = ({ activeTab }) => {
  if (activeTab === 2) {
    return <div>SponsorSocialsPlatform</div>;
  } else {
    return <></>;
  }
};

export default SponsorSocialsForm;
