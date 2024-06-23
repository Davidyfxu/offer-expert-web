import React, { useEffect, useState } from "react";
import { Button, Image, message, Space, Table, Typography } from "antd";
import { delete_file, get_files } from "./apis.ts";
import dayjs from "dayjs";
import { FILE_PRE } from "../../../../utils/const";
const { Text } = Typography;

const copyToClipboard = async (text: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      message.success("负责成功");
    } catch (err) {
      console.error("无法复制文本: ", err);
      // 这里可以添加复制失败的处理
    }
  }
};
const FilesTable = () => {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fresh, setFresh] = useState(0);
  const columns = [
    {
      title: "文件名",
      dataIndex: "Key",
      key: "Key",
      render: (text: string) => (
        <Text style={{ width: 100 }} ellipsis={{ tooltip: text }}>
          {text}
        </Text>
      ),
    },
    {
      title: "上传时间",
      dataIndex: "LastModified",
      key: "LastModified",
      render: (text: Date) => dayjs(text).format("YYYY-MM-DD HH:MM"),
    },
    {
      title: "预览",
      dataIndex: "Key",
      key: "Key",
      render: (text: string) => (
        <Image src={`${FILE_PRE}${text}`} style={{ width: 100 }}></Image>
      ),
    },
    {
      title: "大小",
      dataIndex: "Size",
      key: "Size",
      render: (text: number) => `${Math.round(text / 1000)} KB`,
    },
    {
      title: "操作",
      dataIndex: "Key",
      key: "Action",
      render: (text: string) => (
        <Space>
          <Button
            type="text"
            onClick={() => copyToClipboard(`${FILE_PRE}${text}`)}
          >
            复制链接
          </Button>
          <Button danger onClick={() => deleteFile(text)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const getAllFiles = async () => {
    try {
      setLoading(true);
      const { files = [] } = await get_files();
      setHistories(files);
    } catch (e) {
      console.error("getAllFiles", e);
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (deleteFile: string) => {
    try {
      await delete_file({ deleteFile });
    } catch (e) {
      console.error("deleteFile", e);
    } finally {
      setFresh((r) => r + 1);
    }
  };

  useEffect(() => {
    void getAllFiles();
  }, [fresh]);

  return (
    <div style={{ marginTop: 16, maxWidth: 1300 }}>
      <Table
        scroll={{ x: 300 }}
        dataSource={histories.map((h, idx) => ({ key: idx, ...h }))}
        columns={columns}
        loading={loading}
      />
    </div>
  );
};

export default FilesTable;
