import Avatar from "../../assets/avatar.webp";
import { SideBar, BasicAlert, useUpdateSettings } from "../../imports";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import {  useQueryClient } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";

export const ProfileLayout = () => {
  const queryClient = useQueryClient()
  const user = useSelector((state) => state.User.Data);

  const [alertMsg, setAlertMsg] = useState();
  const [alertSeverity, setAlertSeverity] = useState();

  const mutation  = useUpdateSettings({path:'users/me'});

  const [photo, setPhoto] = useState();

  const onChange = (e) => {
    const file = e.target.files[0];
    setPhoto(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("profileImage", file);
    mutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['user']})
        setAlertMsg("Settings saved successfully");
        setAlertSeverity("success");
      },
      onError: (error) => {
        setAlertMsg(error.response?.data?.message || error.message);
        setAlertSeverity("error");
      },
    });
  };

  return (
    <>
      {alertMsg && (
        <BasicAlert
          message={alertMsg}
          severity={alertSeverity}
          setAlertMsg={setAlertMsg}
        />
      )}
      <section className="section">
        <div className="container bg-dark overflow-hidden">
          {/* Profile Overview */}
          <div className="profile-overview">
            <div className="flex items-center gap-6">
              <div className="relative w-40 flex flex-col gap-md items-center">
                <img
                  src={photo || user?.profileImage?.secureUrl || Avatar}
                  alt={user?.fullName}
                  className="w-full h-40 rounded-3xl object-cover"
                />

                {/* Styled Upload Button */}
                <label
                  htmlFor="avatarUpload"
                  className={`${
                    mutation.isPending ? "cursor-not-allowed" : "cursor-pointer"
                  } bg-primary text-base w-full h-12 rounded-xl text-white p-sm flex items-center justify-center`}
                >
                  {mutation.isPending ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    "Change Photo"
                  )}

                  <input
                    id="avatarUpload"
                    type="file"
                    accept="image/png,image/jpeg"
                    className={`hidden`}
                    disabled={mutation.isPending}
                    onChange={onChange}
                  />
                </label>
              </div>

              <div className="text-white">
                <h2 className="heading-tertiary">{user?.fullName}</h2>
                <p className="body-text">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="rounded-3xl max-w-7xl mx-auto flex gap-lg">
          <div className="p-md bg-dark rounded-3xl">
            <SideBar />
          </div>
          <div className="flex-1 bg-white shadow-2xl p-lg rounded-3xl">
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileLayout;
