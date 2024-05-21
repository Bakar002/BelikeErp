import React from "react";
import { ThreeDots } from "react-loader-spinner";
const ThreeDotLoader = () => {
  return (
    <>
      <ThreeDots
        visible={true}
        height="50"
        width="50"
        color="#fff"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </>
  );
};

export default ThreeDotLoader;
