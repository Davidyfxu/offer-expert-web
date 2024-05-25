import React, { useEffect, useState } from "react";
import { Button, Dropdown, Popconfirm, Table, message, Typography } from "antd";
import { assign_au_case, delete_au_case, get_au_case } from "./apis";
import { IAUCase } from "./types";
import DetailSheet from "./components/DetailSheet";
import { AU_URL } from "./const";
import AssignModal from "../../components/AssignModal";
import { StatusCodes } from "http-status-codes";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { MoreOutlined } from "@ant-design/icons";
const { Text, Title } = Typography;
const ApplyAU = () => {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState<number>(0);
  const [records, setRecords] = useState<IAUCase[]>([]);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<IAUCase>({} as IAUCase);
  const [visible, setVisible] = useState<boolean>(false);
  const [assignModal, setAssignModal] = useState<{
    v: boolean;
    t?: string;
    _id?: string;
  }>({ v: false });
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
      res?.result?.deletedCount > 0 && message.success("此条case已删除");
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
      render: (text: number) => dayjs(text * 1000).format("YYYY-MM-DD"),
    },
    {
      title: "Email",
      width: 150,
      dataIndex: "email",
    },
    {
      title: "详情",
      width: 300,
      fixed: "right",
      dataIndex: "Action",
      render: (text: any, record: IAUCase) => (
        <div className={"flex space-x-1"}>
          <Button
            onClick={() => {
              navigate(`/student?_id=${record?._id}`);
            }}
          >
            Go
          </Button>
          <Button
            onClick={() =>
              window.open(`${AU_URL}/applyAU?_id=${record?._id}`, "_blank")
            }
          >
            编辑
          </Button>
          <Dropdown
            placement={"bottomLeft"}
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <a
                      onClick={() =>
                        setAssignModal({
                          v: true,
                          t: `${record?.lastName} ${record?.firstName}分配导师`,
                          _id: record?._id,
                        })
                      }
                    >
                      指派
                    </a>
                  ),
                },
                {
                  key: "2",
                  label: <a onClick={() => deleteCase(record?._id)}>删除</a>,
                },
              ],
            }}
          >
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        </div>
      ),
    },
  ];

  const handleSubmit = async (params: {
    assignTutors: Array<{
      email: string;
      name: string;
      note: string;
    }>;
  }) => {
    try {
      await assign_au_case({
        ...params,
        _id: assignModal?._id,
      });
      setTimeout(() => setRefresh((r) => r + 1), 1000);
      message.success("导师分配成功");
    } catch (e) {
      console.error(e);
      message.error("导师分配失败");
    }
  };

  return (
    <div className={"p-4"}>
      <Title>澳洲申请</Title>
      <Table
        scroll={{ x: 800 }}
        loading={loading}
        columns={columns as any}
        dataSource={records.map((r) => ({ key: r?._id, ...r }))}
      />
      {/*<DetailSheet*/}
      {/*  visible={visible}*/}
      {/*  detail={detail}*/}
      {/*  onCancel={() => setVisible(false)}*/}
      {/*/>*/}
      <AssignModal
        visible={assignModal.v}
        title={assignModal?.t || ""}
        cancel={() => setAssignModal({ v: false })}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ApplyAU;
