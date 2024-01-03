import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Spin } from "antd";
import { useUserStore } from "../../stores/userStore";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [form] = Form.useForm();
  const loginUser = useUserStore((state) => state.loginUser);
  const email = useUserStore((state) => state.email);
  const loading = useUserStore((state) => state.loading);
  const navigate = useNavigate();
  function handleSubmit(): void {
    form.validateFields().then(() => {
      const { email, password } = form.getFieldsValue();
      void loginUser({ email, password });
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
            登陆到你的账户
          </h2>
        </div>
        <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form form={form}>
            <Spin spinning={loading}>
              <Form.Item
                label="邮箱"
                name="email"
                rules={[{ required: true, message: "请输入邮箱" }]}
              >
                <Input inputMode={"email"} placeholder="请输入邮箱" />
              </Form.Item>
              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: "请输入密码" }]}
              >
                <Input.Password placeholder="请输入密码" />
              </Form.Item>
              <div className={"flex justify-between items-center mt-3"}>
                <Link to={"/register"}>
                  <button className="btn">Sign up</button>
                </Link>
                <button className="btn btn-info" onClick={handleSubmit}>
                  Log in
                </button>
              </div>
            </Spin>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Landing;
