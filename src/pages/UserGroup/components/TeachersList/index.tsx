import { Avatar, Input, Table } from "antd";
import React, { useCallback } from "react";
import { debounce } from "lodash-es";
import dayjs from "dayjs";
import { GroupMap, RoleMap } from "../../const";
import { SearchOutlined } from "@ant-design/icons";

const TeachersList = (props: any) => {
  const { tutors, getAllTeachers, loading } = props;
  const onSearch = useCallback(
    debounce((v) => getAllTeachers({ name: v, email: v }), 500),
    [tutors],
  );
  const columns = [
    {
      title: "昵称",
      dataIndex: "name",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "头像",
      dataIndex: "avatar",
      render: (text: string) => <Avatar src={text} size={"small"} />,
    },
    {
      title: "导师组",
      dataIndex: "group",
      width: 80,
      render: (text: number) => GroupMap[text],
    },
    {
      title: "导师权限",
      dataIndex: "role",
      width: 90,
      render: (text: number) => RoleMap[text],
    },
    {
      title: "创建日期",
      dataIndex: "createdAt",
      render: (text: string) => dayjs(text).format("YYYY/MM/DD"),
    },
  ];
  return (
    <div className="my-2 px-2 w-full overflow-hidden sm:my-1 sm:px-1 sm:w-1/2 md:my-2 md:px-2 md:w-1/2 lg:my-2 lg:px-2 lg:w-1/2 xl:my-2 xl:px-2 xl:w-1/2">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
        <h2 className="text-gray-700 font-semibold mb-4">全体导师列表</h2>
        <Input
          className={"mb-4"}
          onCompositionEnd={onSearch}
          onChange={onSearch}
          allowClear
          placeholder="请输入邮箱或昵称搜索"
          prefix={<SearchOutlined />}
        />
        <Table columns={columns} dataSource={tutors} loading={loading} />
      </div>
    </div>
  );
};

export default TeachersList;
