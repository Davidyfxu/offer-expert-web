import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-500 flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl text-white mb-6">Oops!</h1>
        <p className="text-white text-2xl">我们似乎遇到了一些问题。</p>
        <p className="text-white text-lg mt-2">
          请稍后再试，或者联系我们的支持团队。
        </p>
        <button className="btn btn-primary mt-6" onClick={() => navigate("/")}>
          返回首页
        </button>
      </div>
    </div>
  );
};

export default Error;
