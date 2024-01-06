import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Spin } from "@douyinfe/semi-ui";
import { useUserStore } from "../../stores/userStore";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const ref = useRef({});
  const loginUser = useUserStore((state) => state.loginUser);
  const email = useUserStore((state) => state.email);
  const loading = useUserStore((state) => state.loading);
  const navigate = useNavigate();
  function handleSubmit(): void {
    ref.current.validate().then(() => {
      const { email, password } = ref.current.getValues() ?? {};
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
          <Form getFormApi={(api) => (ref.current = api)}>
            {({ formState, values, formApi }) => (
              <Spin spinning={loading}>
                <Form.Input
                  field="email"
                  label="邮箱"
                  placeholder="请输入邮箱"
                  showClear
                  rules={[
                    { type: "email", required: true, message: "请输入邮箱" },
                  ]}
                />
                <Form.Input
                  field="password"
                  label="密码"
                  mode="password"
                  placeholder="请输入密码"
                  showClear
                  rules={[{ required: true, message: "请输入密码" }]}
                />
                <div className={"flex justify-between items-center mt-3"}>
                  <Link to={"/register"}>
                    <button className="btn">Sign up</button>
                  </Link>
                  <button className="btn btn-info" onClick={handleSubmit}>
                    Log in
                  </button>
                </div>
              </Spin>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Landing;
