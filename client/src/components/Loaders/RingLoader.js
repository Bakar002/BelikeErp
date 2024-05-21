import React from "react";
import { Rings } from "react-loader-spinner";
const RingLoader = () => {
  return (
    <>
      <Rings
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="rings-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </>
  );
};

export default RingLoader;
