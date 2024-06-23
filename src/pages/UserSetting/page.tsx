import React, { useEffect, useState } from "react";
import {
  Form,
  message,
  Spin,
  Input,
  Radio,
  Upload,
  Avatar,
  Button,
} from "antd";
import { uploadAPI } from "../../utils/const";
import { updateUser } from "./apis";
import { get, isEmpty } from "lodash-es";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";

const UserSettingPage = (props: {
  email: string;
  name: string;
  avatar?: string;
}) => {
  const { email, name, avatar = "" } = props;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const isUpdatePSW = Form.useWatch("isUpdatePSW", form);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    if (email) {
      form.setFieldsValue({ name, avatar });
    }
  }, [email]);
  const submit = async () => {
    try {
      setLoading(true);
      const params = form.getFieldsValue();
      const newAvatar = get(params, "upload.[0].response.data", "") || avatar;
      const res = await updateUser({
        ...params,
        email: email,
        avatar: newAvatar,
      });
      if (!isEmpty(res)) {
        message.success("个人信息修改成功");
        setTimeout(() => window.location.reload(), 500);
      }
    } catch (e) {
      console.error("submit", e);
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("只能上传 JPG/PNG 文件!");
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error("图片不能超过1MB!");
    }
    return isJpgOrPng && isLt1M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      if (info.file.response.code === 200) {
        setLoading(false);
        console.log(12312312, info.file.response.data);
        form.setFieldValue("img", info.file.response.data);
        // setImageUrl(info.file.response.data);
      }
    }
  };

  const uploadButton = loading ? <LoadingOutlined /> : <UploadOutlined />;
  return (
    <div
      className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--semi-color-bg-0)" }}
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            修改个人信息
          </h2>
        </div>
        <Form form={form}>
          <Form.Item label="名称" name="username">
            <Input placeholder="请修改你的名称" autoComplete="username" />
          </Form.Item>
          <Form.Item label="是否修改密码" name="isUpdatePSW">
            <Radio.Group
              options={[
                { label: "是", value: 1 },
                { label: "否", value: 0 },
              ]}
            />
          </Form.Item>
          {isUpdatePSW ? (
            <>
              <Form.Item label="密码" name="password">
                <Input
                  placeholder="请输入你的密码"
                  autoComplete="new-password"
                />
              </Form.Item>
              <Form.Item label="修改密码" name="newPassword">
                <Input
                  placeholder="请修改你的密码"
                  autoComplete="new-password"
                />
              </Form.Item>
            </>
          ) : (
            <></>
          )}
          <Form.Item
            name="upload"
            label="修改头像"
            valuePropName="fileList"
            getValueFromEvent={(e: any) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
          >
            <Upload name="logo" action={uploadAPI} listType="picture">
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
        {/*<Upload*/}
        {/*  accept={"image/*"}*/}
        {/*  // action={"https://psqrszkvx9.us.aircode.run/general/uploadFile"}*/}
        {/*  action={uploadAPI}*/}
        {/*  label="头像"*/}
        {/*  field="avatar"*/}
        {/*  limit={1}*/}
        {/*  maxSize={1000}*/}
        {/*  showUploadList={false}*/}
        {/*  onChange={(info) => {*/}
        {/*    console.log(info);*/}
        {/*  }}*/}
        {/*  fileList={[]}*/}
        {/*  onSizeError={() => message.error("头像大小应小于1MB")}*/}
        {/*  onSuccess={(e) => message.success("头像上传成功", e)}*/}
        {/*  onError={(e) => message.error("头像上传失败", e?.message)}*/}
        {/*>*/}
        {/*  <Avatar*/}
        {/*    src={""}*/}
        {/*    size={"large"}*/}
        {/*    // hoverMask={hoverMask}*/}
        {/*  />*/}
        {/*</Upload>*/}
        <button
          disabled={loading}
          onClick={submit}
          className={"btn btn-outline btn-success w-full"}
        >
          <Spin spinning={loading} />
          提交
        </button>
      </div>
    </div>
  );
};

export default UserSettingPage;
