import React, { useState, useEffect, useRef } from "react";
import JSONEditor from "jsoneditor";
import { Button, Drawer, message, Space } from "antd";
import { getWebsiteData, updateWebsiteData } from "./api";
import styles from "./index.module.scss";
import FileUpload from "./components/FileUpload";
import FilesTable from "./components/FilesTable";

const WebsiteManage = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const editorRef = useRef<any>(null);
  useEffect(() => {
    // 创建 JSON 编辑器实例
    editorRef.current = new JSONEditor(containerRef.current, {
      mode: "text", // 可以是 'code', 'form', 'text', 'tree', 'view'
      schema: {}, // 可选的 JSON Schema 验证
      history: true, // 启用撤销/重做
    });
    getWebsiteData().then((r) => {
      editorRef.current.set(r);
    });
    return () => editorRef.current.destroy();
  }, []);

  const submit = async () => {
    try {
      setLoading(true);
      const editorData = editorRef.current.get();
      await updateWebsiteData(editorData);
      message.success("更新成功");
    } catch (e) {
      console.error("submit", e);
    } finally {
      setLoading(false);
    }
  };
  const openDrawer = () => setOpen(true);

  return (
    <>
      <div className={styles.container}>
        <Space>
          <h1>官网配置JSON</h1>
          <Button type="primary" ghost onClick={submit} loading={loading}>
            Deploy
          </Button>
          <Button type="primary" danger ghost onClick={openDrawer}>
            Upload Images
          </Button>
        </Space>
        <div id="jsoneditor" ref={containerRef} style={{ width: "100%" }} />
      </div>
      <Drawer
        closable
        width={800}
        destroyOnClose
        title={<p>Loading Drawer</p>}
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div>
          <FileUpload />
        </div>
        <FilesTable />
      </Drawer>
    </>
  );
};

export default WebsiteManage;
