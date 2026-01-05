import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

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

  return (
    <Collapse in={open}>
      <Alert
        onClose={handleClose}
        variant="filled"
        className="w-max rounded-4xl fixed left-[50%] translate-x-[-50%] top-5 z-50"
        severity={severity}
      >
        {message}
      </Alert>
    </Collapse>
  );
};

export default BasicAlert;
