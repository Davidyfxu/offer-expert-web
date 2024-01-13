import React, { useEffect, useRef, useState } from "react";
import { Form, Avatar, Button, Toast, Spin } from "@douyinfe/semi-ui";
import { uploadAPI } from "../../utils/const";
import { IconCamera } from "@douyinfe/semi-icons";
import { updateUser } from "./apis";
import { get, isEmpty } from "lodash-es";
import { StatusCodes } from "http-status-codes";
const hoverMask = (
  <div
    className={
      "bg-gray-600 h-full w-full flex justify-center items-center text-white"
    }
  >
    <IconCamera size={"large"} />
  </div>
);

const UserSettingPage = (props: {
  email: string;
  name: string;
  avatar?: string;
}) => {
  const { email, name, avatar = "" } = props;
  const [loading, setLoading] = useState(false);
  const ref = useRef({});
  useEffect(() => {
    if (email) {
      ref.current.setValues({ name, avatar });
    }
  }, [email]);
  const submit = async () => {
    try {
      setLoading(true);
      const params = ref.current.getValues();
      const res = await updateUser({
        ...params,
        email: email,
        avatar: get(params, "avatar.[0].response.data", "") || avatar,
      });
      if (!isEmpty(res)) {
        Toast.success("个人信息修改成功");
        setTimeout(() => window.location.reload(), 500);
      }
    } catch (e) {
      console.error("submit", e);
    } finally {
      setLoading(false);
    }
  };
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
        <Form getFormApi={(api) => (ref.current = api)}>
          {({ formApi }) => (
            <>
              <Form.Input
                label="名称"
                autoComplete="username"
                field="name"
                placeholder="请修改你的名称"
              />
              <Form.RadioGroup
                field="isUpdatePSW"
                label="是否修改密码"
                defaultValue={0}
              >
                <Form.Radio value={1}>是</Form.Radio>
                <Form.Radio value={0}>否</Form.Radio>
              </Form.RadioGroup>
              {formApi.getValue("isUpdatePSW") ? (
                <>
                  <Form.Input
                    label="密码"
                    autoComplete="new-password"
                    field="password"
                    mode={"password"}
                    placeholder="请输入你的密码"
                  />
                  <Form.Input
                    label="修改密码"
                    autoComplete="new-password"
                    field="newPassword"
                    mode={"password"}
                    placeholder="请修改你的密码"
                  />
                </>
              ) : (
                <></>
              )}
              <Form.Upload
                accept={"image/*"}
                action={uploadAPI}
                label="头像"
                field="avatar"
                limit={1}
                showUploadList={false}
                onSuccess={() => Toast.success("头像上传成功")}
                onError={(e) => Toast.error("头像上传失败", e?.message)}
              >
                <Avatar
                  src={
                    formApi.getValue("avatar")?.[0]?.response?.data ||
                    formApi.getValue("avatar")
                  }
                  size={"large"}
                  hoverMask={hoverMask}
                />
              </Form.Upload>
            </>
          )}
        </Form>
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
