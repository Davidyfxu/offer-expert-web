import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Checkbox, Form, Input, Spin } from "antd";
import { useUserStore } from "../../stores/userStore";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form] = Form.useForm();
  const registerUser = useUserStore((state) => state.registerUser);
  const email = useUserStore((state) => state.email);
  const loading = useUserStore((state) => state.loading);
  const navigate = useNavigate();
  function handleSubmit(): void {
    form.validateFields().then((value) => {
      const { name, email, password, confirmPwd } = value;
      if (password !== confirmPwd) return;
      void registerUser({ name, email, password });
    });
  }

  useEffect(() => {
    if (email) {
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  }, [email, navigate]);

  return (
    <div className="min-h-screen bg-blue-500 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="bg-white mt-8 sm:mx-auto sm:w-full sm:max-w-md rounded-lg shadow-xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            注册用户
          </h2>
        </div>
        <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form form={form}>
            <Spin spinning={loading}>
              <Form.Item
                label="昵称"
                name="name"
                rules={[{ required: true, message: "请输入昵称" }]}
              >
                <Input placeholder="请输入昵称" />
              </Form.Item>
              <Form.Item
                label="邮箱"
                name="email"
                rules={[
                  { type: "email", required: true, message: "请输入邮箱" },
                ]}
              >
                <Input allowClear placeholder="请输入邮箱" />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: "请输入密码" }]}
              >
                <Input.Password allowClear placeholder="请输入密码" />
              </Form.Item>
              <Form.Item
                label="确认密码"
                name="confirmPwd"
                rules={[{ required: true, message: "请确认密码" }]}
              >
                <Input.Password allowClear placeholder="请确认密码" />
              </Form.Item>
              <Form.Item name="agree" valuePropName="checked">
                <Checkbox>
                  I have read and agree to the terms of service
                </Checkbox>
              </Form.Item>

              <div className={"flex justify-between items-center"}>
                <p>
                  <span>Or</span>
                  <Link to={"/landing"}>
                    <button className="btn ml-2">Log in</button>
                  </Link>
                </p>

                <button className="btn btn-info" onClick={handleSubmit}>
                  Sign up
                </button>
              </div>
            </Spin>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
