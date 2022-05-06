import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./loader.style.scss";

type props = {};

export default (props: props) => {
  //   const [loading, setLoading] = useState<boolean>(false);

  const { setLoading } = useSelector((state: RootReducers) => state.loader);

  return (
    <div className={["loader-container", setLoading && "show"].join(" ")}>
      {setLoading && <CircularProgress color="info" size={"10rem"} />}
    </div>
  );
};
