import React, { useEffect } from "react";
import { Table, Tag } from "@douyinfe/semi-ui";
import { IconMore } from "@douyinfe/semi-icons";
import { useFinanceStore } from "../../store";

const FinanceTable = () => {
  const {
    loading,
    transactions,
    getTransactions,
    total,
    pagination,
    onChangePagination,
  } = useFinanceStore();

  const columns = [
    {
      title: "学生姓名",
      dataIndex: "name",
      render: (text: string) => text,
    },
    {
      title: "负责导师",
      dataIndex: "assignTutor",
      render: (text: any, record: any) => {
        const { avatar = "", name } = record?.assignTutor || {};
        return (
          <Tag avatarSrc={avatar} avatarShape="circle" size="large">
            {name}
          </Tag>
        );
      },
    },
    {
      title: "更新日期",
      dataIndex: "updateTime",
    },
    {
      title: "操作",
      dataIndex: "operate",
      render: () => (
        <div className="join">
          <button className="btn btn-outline join-item">资金往来</button>
          <button className="btn btn-outline btn-primary join-item">
            支付费用
          </button>
          <button className="btn btn-outline btn-error join-item">
            一键提醒
          </button>
        </div>
      ),
    },
  ];

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={transactions}
      pagination={{
        ...pagination,
        total,
        onChange: onChangePagination,
      }}
    />
  );
};

export default FinanceTable;
