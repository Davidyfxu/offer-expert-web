import React from "react";
import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="min-h-screen bg-blue-500 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <Spin size={"large"} />
    </div>
  );
};

export default Loading;
