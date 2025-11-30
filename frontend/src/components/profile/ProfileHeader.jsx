import Avatar from "../../assets/avatar.webp";
import { useUpdateSettings } from "../../hooks/useUpdateSettings";
import { BasicAlert } from "../../components";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { Upload } from "lucide-react";

export const ProfileHeader = ({user}) => {
  const queryClient = useQueryClient();

  const [alertMsg, setAlertMsg] = useState();
  const [alertSeverity, setAlertSeverity] = useState();

  const mutation = useUpdateSettings({ path: "users/me" });

  const [photo, setPhoto] = useState();
  const [photoFile, setPhotoFile] = useState(null);

  const onChange = (e) => {
    const file = e.target.files[0];

    if (photo) {
      URL.revokeObjectURL(photo);
    }
    setPhoto(URL.createObjectURL(file));
    setPhotoFile(file);
  };

  const onClick = () => {
    const formData = new FormData();
    formData.append("profileImage", photoFile);
    mutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        setAlertMsg("Settings saved successfully");
        setAlertSeverity("success");
      },
      onError: (error) => {
        setAlertMsg(error.response?.data?.message || error.message);
        setAlertSeverity("error");
      },
      onSettled: () => {
        setPhotoFile(null);
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
      <div className="container bg-dark overflow-hidden">
        {/* Profile Overview */}
        <div className="profile-overview">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex flex-col gap-md">
              <div className="relative w-40 flex flex-col gap-md items-center">
                <img
                  src={photo || user?.profileImage?.secureUrl || Avatar}
                  alt={user?.fullName}
                  className="w-full h-40 rounded-2xl object-cover relative"
                />
                {/* Styled Upload Button */}
                <label
                  htmlFor="avatarUpload"
                  className={`absolute cursor-pointer w-full h-full flex items-center justify-center top-0 left-0  rounded-2xl opacity-0 hover:opacity-100 backdrop-blur-xs`}
                >
                  <Upload size={40} style={{ color: "black" }} />
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
              <button
                onClick={onClick}
                className="btn-primary cursor-pointer disabled:cursor-not-allowed text-center flex items-center justify-between h-12"
                disabled={photoFile === null || mutation.isPending}
              >
                {mutation.isPending ? (
                  <CircularProgress size={20} sx={{ color: "white" }} />
                ) : (
                  "Save Photo"
                )}
              </button>
            </div>

            <div className="text-white text-center md:text-left">
              <h2 className="heading-tertiary">{user?.fullName}</h2>
              <p className="body-text">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
