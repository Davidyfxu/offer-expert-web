import React, { useEffect, useState } from "react";
import { get_history } from "./api";
import HistoryTable from "./components/HistoryTable";
import { Spin, Typography } from "@douyinfe/semi-ui";
import { AU_URL } from "../ApplyAU/const";
const { Title } = Typography;

const History = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const getHistory = async () => {
    try {
      setLoading(true);
      const { histories = [] } = await get_history();
      setRecords(histories);
    } catch (e) {
      console.error("getHistory", e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    void getHistory();
  }, []);
  return (
    <Spin spinning={loading}>
      <Title>变更历史</Title>
      <HistoryTable dataSource={records}></HistoryTable>
    </Spin>
  );
};

export default History;
