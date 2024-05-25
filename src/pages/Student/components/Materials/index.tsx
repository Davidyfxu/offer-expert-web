import React, { useContext, useState } from "react";
import { Button, Typography, Upload, UploadProps } from "antd";
import { StarOutlined, UploadOutlined } from "@ant-design/icons";
import { uploadAPI } from "../../../../utils/const";
import { StudentContext } from "../../index";

const props: UploadProps = {
  onChange({ file, fileList }) {
    if (file.status !== "uploading") {
      console.log(file, fileList);
    }
  },

  showUploadList: {
    showDownloadIcon: true,
    downloadIcon: "Download",
    showRemoveIcon: true,
    removeIcon: (
      <StarOutlined
        onClick={(e) => console.log(e, "custom removeIcon event")}
      />
    ),
  },
};
const Materials = () => {
  const { basicInfo } = useContext(StudentContext);
  const [attachments, setAttachments] = useState(basicInfo?.attachments || []);
  return (
    <div className={"mt-4 p-4 bg-white rounded"}>
      <Typography.Title level={5}>材料管理</Typography.Title>
      <Upload
        action={uploadAPI}
        defaultFileList={attachments}
        onChange={({ file, fileList }) => {
          if (file.status !== "uploading") {
            setAttachments(fileList);
          }
          console.log(file, fileList);
        }}
        showUploadList={{
          showRemoveIcon: true,
          removeIcon: (
            <StarOutlined
              onClick={(e) => console.log(e, "custom removeIcon event")}
            />
          ),
        }}
      >
        <Button icon={<UploadOutlined />}>材料上传</Button>
      </Upload>
    </div>
  );
};

export default Materials;
