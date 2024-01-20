import React, { useState } from "react";
import { Layout, Menu, Avatar, Dropdown, Breadcrumb, Button } from "antd";
import { routers2 } from "../config/routers";
import { Outlet, useNavigate } from "react-router-dom";
import menuLogo from "../../assets/menuLogo.jpg";
import { useUserStore } from "../../stores/userStore";
import { Watermark } from "antd";
import { ThemeSwapButton } from "../../components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const switchMode = () => {
  const body = document.body;
  if (body.hasAttribute("theme-mode")) {
    body.removeAttribute("theme-mode");
  } else {
    body.setAttribute("theme-mode", "dark");
  }
  if (body.hasAttribute("data-theme")) {
    body.removeAttribute("data-theme");
  } else {
    body.setAttribute("data-theme", "dark");
  }
};
const INIT_COLLAPSED = /Android|webOS|iPhone|iPad/i.test(navigator.userAgent);
const { Header, Footer, Content, Sider } = Layout;
const Home = (): any => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(INIT_COLLAPSED);
  const [selectItem, setSelectItem] = useState({ k: [], label: "" });
  const email = useUserStore((state) => state.email);
  const name = useUserStore((state) => state.name);
  const avatar = useUserStore((state) => state.avatar);
  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Sider style={{ backgroundColor: "#ffffff" }} collapsed={collapsed}>
        <img className={"p-4 w-full rounded-3xl"} src={menuLogo} alt={""} />
        <Menu
          mode="inline"
          selectedKeys={selectItem?.k}
          items={routers2.map((router: any) => ({
            ...router,
            onClick: () => {
              navigate(`/${router?.key}`);
              setSelectItem({ k: [router?.key], label: router?.label });
            },
          }))}
        />
        <Button type="text" onClick={() => setCollapsed(!collapsed)} block>
          {collapsed ? <RightOutlined /> : <LeftOutlined />}
        </Button>
      </Sider>
      <Layout>
        <Header className={"bg-white flex justify-between items-center"}>
          <div>
            <Breadcrumb items={[{ title: selectItem?.label }]} />
          </div>
          <div className={"flex justify-between items-center gap-4"}>
            <ThemeSwapButton onClick={switchMode}></ThemeSwapButton>
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: (
                      <a
                        onClick={() => {
                          localStorage.removeItem("token");
                          setTimeout(() => window.location.reload(), 1000);
                        }}
                      >
                        Logout
                      </a>
                    ),
                  },
                ],
              }}
            >
              <Avatar
                className={"cursor-pointer"}
                src={avatar}
                onClick={() => navigate("/")}
              >
                {name.slice(0, 2)}
              </Avatar>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            padding: "16px",
            height: "100%",
            overflow: "auto",
          }}
        >
          <Watermark content="Offer Expert">
            <Outlet />
          </Watermark>
        </Content>
        <Footer className={"flex items-center justify-center bg-white"}>
          <span>Copyright © 2023 Offer Expert. All Rights Reserved. </span>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
