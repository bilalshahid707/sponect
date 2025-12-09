import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateSettings } from "../../hooks/useUpdateSettings";
import { BasicAlert } from "../../components";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, FormLabel, Button, Input, AspectRatio } from "@mui/joy";

export const UploadPhoto = ({ path, queryKey, src }) => {
  const queryClient = useQueryClient();
  const [photo, setPhoto] = useState();
  const [photoFile, setPhotoFile] = useState(null);

  const mutation = useUpdateSettings({ path: path });

  const [alertMsg, setAlertMsg] = useState();
  const [alertSeverity, setAlertSeverity] = useState();

  const onChange = (e) => {
    const file = e.target.files[0];

    if (file.size > (import.meta.env.VITE_PROFILE_MAX_SIZE)) {
    setAlertMsg("File size must be less than 2 MB.");
    setAlertSeverity("error");
    return;
  }
    if (photo) {
      URL.revokeObjectURL(photo);
    }
    setPhoto(URL.createObjectURL(file));
    setPhotoFile(file);
  };

  useEffect(() => {
    if (photo) {
      URL.revokeObjectURL(photo);
    }
  },[photo]);

  const onClick = () => {
    const formData = new FormData();
    formData.append("profileImage", photoFile);
    mutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
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
      <Box className="flex flex-col gap-md items-center lg:items-start w-max">
        <Box className="relative flex flex-col gap-md items-center rounded-full">
          <AspectRatio ratio={1} className="w-40" sx={{ borderRadius: "100%" }}>
            <img
              src={src}
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          </AspectRatio>
          {/* Styled Upload Button */}
          <FormLabel
            htmlFor="avatarUpload"
            className={`absolute cursor-pointer w-full h-full flex flex-col items-center justify-center top-0 left-0 rounded-full opacity-0 hover:opacity-100`}
            sx={{ background: "none" }}
          >
            <CloudUploadIcon sx={{ fontSize: 40, color: "primary.main" }} />
            <input
              id="avatarUpload"
              type="file"
              accept="image/png,image/jpeg"
              className="absolute w-0 h-0 opacity-0"
              disabled={mutation.isPending}
              onChange={onChange}
            />
          </FormLabel>
        </Box>
        <Button
          onClick={onClick}
          className="self-center"
          sx={{
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
              transition: "0.15s ",
            },
          }}
          disabled={photoFile === null || mutation.isPending}
          loading={mutation.isPending}
        >
          Save Changes
        </Button>
      </Box>
    </>
  );
};

export default UploadPhoto;
