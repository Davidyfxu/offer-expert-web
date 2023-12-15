import React, { useEffect, useState } from "react";
import { Popconfirm, Table, Toast, Typography } from "@douyinfe/semi-ui";
import { delete_au_case, get_au_case } from "./apis";
import { format } from "date-fns";
import { IAUCase } from "./types";
import DetailSheet from "./components/DetailSheet";
import { AU_URL } from "./const";
const { Text, Title } = Typography;
const ApplyAU = () => {
  const [refresh, setRefresh] = useState<number>(0);
  const [records, setRecords] = useState<IAUCase[]>([]);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<IAUCase>({} as IAUCase);
  const [visible, setVisible] = useState<boolean>(false);
  const getAUCase = async () => {
    try {
      setLoading(true);
      const { cases } = await get_au_case({});
      setRecords(cases);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const deleteCase = async (_id: string) => {
    try {
      setLoading(true);
      const res = await delete_au_case({ _id });
      res?.result?.deletedCount > 0 && Toast.success("此条case已删除");
      setLoading(false);
      setTimeout(() => {
        setRefresh((r) => r + 1);
      }, 500);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    void getAUCase();
  }, [refresh]);

  const columns = [
    {
      title: "id",
      fixed: "left",
      width: 120,
      dataIndex: "_id",
      render: (text: string) => (
        <Text copyable ellipsis={{ showTooltip: true }} style={{ width: 80 }}>
          {text}
        </Text>
      ),
    },
    {
      title: "Last Name",
      width: 120,
      dataIndex: "lastName",
    },
    {
      title: "First Name",
      width: 120,
      dataIndex: "firstName",
    },

    {
      title: "College",
      width: 150,
      dataIndex: "bachelorSchool",
    },
    {
      title: "GPA",
      width: 100,
      dataIndex: "GPA",
    },
    {
      title: "Major",
      width: 100,
      dataIndex: "major",
    },
    {
      title: "Birth",
      dataIndex: "birth",
      width: 120,
      render: (text: number) => format(text * 1000, "yyyy-MM-dd"),
    },
    {
      title: "Email",
      width: 150,
      dataIndex: "email",
    },
    {
      title: "详情",
      width: 250,
      fixed: "right",
      dataIndex: "Action",
      render: (text: any, record: IAUCase) => (
        <div className={"flex space-x-1"}>
          <button
            className={"btn btn-outline btn-primary"}
            onClick={() => {
              setDetail(record);
              setVisible(true);
            }}
          >
            详情
          </button>
          <button
            className={"btn btn-outline btn-accent"}
            onClick={() =>
              window.open(`${AU_URL}?_id=${record?._id}`, "_blank")
            }
          >
            编辑
          </button>
          <Popconfirm
            title="再次确定是否要删除？"
            content="此删除将不可逆"
            okButtonProps={{
              autoFocus: true,
              type: "danger",
            }}
            onConfirm={() => deleteCase(record?._id)}
          >
            <button className={"btn btn-secondary"}>删除</button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <div className={"flex flex-col"}>
      <Title link={{ href: AU_URL, target: "_blank" }}>澳洲申请</Title>
      <Table loading={loading} columns={columns as any} dataSource={records} />
      <DetailSheet
        visible={visible}
        detail={detail}
        onCancel={() => setVisible(false)}
      />
    </div>
  );
};

export default ApplyAU;
