import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import "./loader.style.scss";

type props = {};

export default (props: props) => {
  const { setLoading } = useSelector((state: RootReducers) => state.loader);
  return (
    <Backdrop
      open={setLoading}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: "blur(2px)",
      }}
    >
      <CircularProgress color="info" size={"10rem"} />
    </Backdrop>
  );
};
