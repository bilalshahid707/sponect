import { useEffect, useState } from "react";
import { Alert } from "@mui/joy";

export const BasicAlert = ({ message, severity, setAlertMsg}) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    setAlertMsg(null);
  };

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [open]);


  useEffect(() => {
    if (message) setOpen(true);
  }, [message]);

  if (!open) return null;

  return (
    <Alert
      onClose={handleClose}
      variant="solid"
      color={severity === "error" ? "danger" : severity}
      className="w-max rounded-4xl fixed left-[50%] translate-x-[-50%] top-5 z-50"
    >
      {message}
    </Alert>
  );
};

export default BasicAlert;
