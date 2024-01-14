import React from "react";
import { useNavigate } from "react-router-dom";

const Student = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <button className={"btn btn-active"} onClick={goBack}>
      Student
    </button>
  );
};

export default Student;
