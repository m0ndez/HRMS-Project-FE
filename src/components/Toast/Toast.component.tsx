import * as React from "react";
import { Snackbar, SnackbarOrigin } from "@mui/material";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { toastAction } from "reduxs/toast/actionCreator";

export default () => {
  const { open, anchorOrigin, toastDuration, toastMessage, toastType } =
    useSelector((state: RootReducers) => state.toast.openToast);

  const dispatch = useDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(toastAction({ open: false }));
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={toastDuration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert onClose={handleClose} severity={toastType} sx={{ width: "100%" }}>
        {toastMessage}
      </Alert>
    </Snackbar>
  );
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
});
