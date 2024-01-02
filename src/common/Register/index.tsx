import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Spin } from "@douyinfe/semi-ui";
import { useUserStore } from "../../stores/userStore";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const ref = useRef({});
  const registerUser = useUserStore((state) => state.registerUser);
  const email = useUserStore((state) => state.email);
  const loading = useUserStore((state) => state.loading);
  const navigate = useNavigate();
  function handleSubmit(): void {
    ref.current.validate().then(() => {
      const { name, email, password, confirmPwd } =
        ref.current.getValues() ?? {};
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
          <Form getFormApi={(api) => (ref.current = api)}>
            {({ formState, values, formApi }) => (
              <Spin spinning={loading}>
                <Form.Input
                  field="name"
                  label="昵称"
                  placeholder="请输入昵称"
                  showClear
                  rules={[{ required: true, message: "请输入密码" }]}
                />
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
                <Form.Input
                  field="confirmPwd"
                  label="确认密码"
                  mode="password"
                  placeholder="请确认密码"
                  showClear
                  rules={[{ required: true, message: "请确认密码" }]}
                />
                <Form.Checkbox field="agree" noLabel>
                  I have read and agree to the terms of service
                </Form.Checkbox>
                <div className={"flex justify-between items-center"}>
                  <p>
                    <span>Or</span>
                    <Link to={"/landing"}>
                      <button className="btn ml-2">Log in</button>
                    </Link>
                  </p>
                  <button
                    className="btn btn-info"
                    disabled={!values.agree}
                    onClick={handleSubmit}
                  >
                    Sign up
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

export default Register;
