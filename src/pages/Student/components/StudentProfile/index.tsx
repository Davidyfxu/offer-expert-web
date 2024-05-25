import React, { useContext } from "react";
import { Descriptions, DescriptionsProps } from "antd";
import { StudentContext } from "../../index";
import dayjs from "dayjs";

const StudentProfile = () => {
  const { basicInfo } = useContext(StudentContext);
  console.log("===hello===", basicInfo);
  const items: DescriptionsProps["items"] = [
    {
      label: "姓名",
      children: basicInfo?.lastName + basicInfo?.firstName,
    },
    {
      label: "本科学校",
      children: basicInfo?.bachelorSchool,
    },
    {
      label: "就读时间",
      children: basicInfo?.period
        .map((d) => dayjs(d * 1000).format("YYYY-MM-DD"))
        .join(" ~ "),
    },
    {
      label: "GPA",
      children: basicInfo?.GPA,
    },
    {
      label: "专业",
      children: basicInfo?.major,
    },
    {
      label: "出生",
      children: dayjs(basicInfo?.birth * 1000).format("YYYY-MM-DD"),
    },
    {
      label: "性别",
      children: basicInfo?.sex === 1 ? "男" : "女",
    },
    {
      label: "地址",
      children: basicInfo?.location,
    },
    {
      label: "学位",
      children: basicInfo?.degree,
    },
    {
      label: "手机",
      children: basicInfo?.phone,
    },
    {
      label: "邮箱",
      children: basicInfo?.email,
    },
  ].map((v, idx) => ({ key: idx, ...v }));

  return (
    <div className={"w-full p-4 bg-white rounded md:w-1/3"}>
      <Descriptions
        // layout="vertical"
        // bordered
        title={"学生信息"}
        items={items}
      />
    </div>
  );
};

export default StudentProfile;
