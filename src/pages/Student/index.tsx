import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Anchor, Skeleton, Steps } from "antd";
import { get_case_detail } from "./apis";
import { useSearchParams } from "react-router-dom";
import StudentProfile from "./components/StudentProfile";
import ApplyingSchools from "./components/ApplyingSchools";
import Materials from "./components/Materials";
import { LeftOutlined } from "@ant-design/icons";
export const StudentContext = React.createContext({});

const Student = () => {
  const [searchParams, _] = useSearchParams();
  const _id = searchParams.get("_id");
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);
  const goBack = () => {
    navigate(-1);
  };
  const getStudentDetail = async () => {
    try {
      setLoading(true);
      const { basicInfo } = await get_case_detail({ _id });
      setStudent({ basicInfo });
    } catch (e) {
      console.error("getStudentDetail", e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    void getStudentDetail();
  }, [_id]);

  return (
    <StudentContext.Provider value={{ ...student }}>
      <Skeleton loading={loading} avatar paragraph={{ rows: 4 }}>
        <button className={"btn btn-outline btn-info"} onClick={goBack}>
          <LeftOutlined />
        </button>
        {/*<Steps*/}
        {/*  size="small"*/}
        {/*  current={1}*/}
        {/*  items={[*/}
        {/*    {*/}
        {/*      title: "Finished",*/}
        {/*    },*/}
        {/*    {*/}
        {/*      title: "In Progress",*/}
        {/*    },*/}
        {/*    {*/}
        {/*      title: "Waiting",*/}
        {/*    },*/}
        {/*  ]}*/}
        {/*/>*/}

        <div className={"flex flex-col gap-4 md:flex-row"}>
          <StudentProfile />
          <div className={"flex-1"}>
            <ApplyingSchools />
            <Materials />
          </div>
        </div>
        <Anchor
          className={"fixed right-8 top-24"}
          affix={false}
          items={[
            {
              key: "part-1",
              href: "#part-1",
              title: "Part 1",
            },
            {
              key: "part-2",
              href: "#part-2",
              title: "Part 2",
            },
            {
              key: "part-3",
              href: "#part-3",
              title: "Part 3",
            },
          ]}
        />
      </Skeleton>
    </StudentContext.Provider>
  );
};

export default Student;
