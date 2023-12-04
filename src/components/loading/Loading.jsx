import React from "react";
import { FadeLoader } from "react-spinners";

export const Loading = () => {
  return (
    <FadeLoader
      color={"#d9d9d9"}
      loading={true}
      cssOverride={override}
      size={200}
      margin={10}
      height={22}
      radius={7}
      width={9}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loading;

const override = {
  display: "block",
  margin: "0 auto",
  color: "#FFF",
};
