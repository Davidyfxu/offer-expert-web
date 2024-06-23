import React, { useState, useEffect, useRef } from "react";
import JSONEditor from "jsoneditor";
import { Button, message } from "antd";
import { getWebsiteData, updateWebsiteData } from "./api";
import styles from "./index.module.scss";
const WebsiteManage = () => {
  const [loading, setLoading] = useState(false);
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
      const res = await updateWebsiteData(editorData);
      message.success("更新成功");
    } catch (e) {
      console.error("submit", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h1>JSON Editor Demo</h1>
        <Button type="primary" ghost onClick={() => submit()} loading={loading}>
          Submit
        </Button>
      </div>
      <div
        id="jsoneditor"
        ref={containerRef}
        style={{ width: "100%", height: "400px" }}
      />
    </div>
  );
};

export default WebsiteManage;
