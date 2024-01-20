import React, { useContext } from "react";
import { StudentContext } from "../../index";
import { Space, Table, TableProps, Tag, Typography } from "antd";
import dayjs from "dayjs";
const SUFFIX_COUNT = 12;
const columns: TableProps["columns"] = [
  {
    title: "大学",
    dataIndex: "college",
    key: "college",
  },
  {
    title: "入学时间",
    dataIndex: "entryMonth",
    key: "entryMonth",
    render: (text) => dayjs(text * 1000).format("YYYY-MMM"),
  },
  {
    title: "学制",
    dataIndex: "learningPeriod",
    key: "learningPeriod",
    render: (text) => `${text}年`,
  },
  {
    title: "项目",
    key: "master",
    dataIndex: "master",
  },
  {
    title: "项目链接",
    key: "programLink",
    dataIndex: "programLink",
    render: (text) => (
      <Typography.Text
        style={{ maxWidth: 200 }}
        ellipsis={{ suffix: text.slice(-SUFFIX_COUNT).trim(), tooltip: text }}
        copyable
      >
        {text.slice(0, text.length - SUFFIX_COUNT).trim()}
      </Typography.Text>
    ),
  },
];

const ApplyingSchools = () => {
  const { basicInfo } = useContext(StudentContext);
  const colleges = basicInfo?.colleges || [];
  return (
    <div className={"p-4 bg-white rounded"}>
      <Typography.Title level={5}>申请信息</Typography.Title>
      <Table
        columns={columns}
        dataSource={colleges.map((c, idx) => ({ ...c, key: idx }))}
      />
    </div>
  );
};

export default ApplyingSchools;
