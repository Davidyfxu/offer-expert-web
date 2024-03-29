import React, { useState } from "react";
import { Layout, Menu, Button, Avatar, Dropdown, Breadcrumb } from "antd";
import { HighlightOutlined } from "@ant-design/icons";
import { routers, routers2 } from "../config/routers";
import { Outlet, useNavigate } from "react-router-dom";
import menuLogo from "../../assets/menuLogo.jpg";
import { useUserStore } from "../../stores/userStore";
import Watermark from "@uiw/react-watermark";

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
const Home = (): React.ReactNode => {
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
      <Sider>
        <img className={"p-8 w-full"} src={menuLogo} alt={""} />
        <Menu
          isCollapsed={collapsed}
          onCollapseChange={(c) => setCollapsed(c)}
          style={{ height: "100%" }}
          selectedKeys={selectItem?.k}
          items={routers2.map((router: any) => ({
            ...router,
            onClick: () => {
              navigate(`/${router?.key}`);
              setSelectItem({ k: [router?.key], label: router?.label });
            },
          }))}
          footer={{
            collapseButton: true,
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
          <div className={"ml-4 flex justify-between items-center"}>
            <div>
              <Breadcrumb>
                <Breadcrumb.Item>{selectItem?.label}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            {/*<Nav mode="horizontal">*/}
            {/*  <Nav.Footer className={"flex gap-2"}>*/}
            {/*    <Button*/}
            {/*      theme="borderless"*/}
            {/*      onClick={switchMode}*/}
            {/*      icon={<HighlightOutlined />}*/}
            {/*    />*/}
            {/*    <Avatar*/}
            {/*      src={avatar}*/}
            {/*      onClick={() => navigate("/")}*/}
            {/*      color="orange"*/}
            {/*      size="small"*/}
            {/*    >*/}
            {/*      {name.slice(0, 2)}*/}
            {/*    </Avatar>*/}
            {/*    <Dropdown*/}
            {/*      render={*/}
            {/*        <Dropdown.Menu>*/}
            {/*          <Dropdown.Item*/}
            {/*            onClick={() => {*/}
            {/*              localStorage.removeItem("token");*/}
            {/*              setTimeout(() => window.location.reload(), 500);*/}
            {/*            }}*/}
            {/*          >*/}
            {/*            退出*/}
            {/*          </Dropdown.Item>*/}
            {/*        </Dropdown.Menu>*/}
            {/*      }*/}
            {/*    >*/}
            {/*      {email}*/}
            {/*    </Dropdown>*/}
            {/*  </Nav.Footer>*/}
            {/*</Nav>*/}
          </div>
        </Header>
        <Content
          style={{
            padding: "16px",
            height: "100%",
            backgroundColor: "rgba(var(--semi-grey-0), 1)",
          }}
        >
          <Watermark title={"菜博士"} content="Offer Expert">
            <Outlet />
          </Watermark>
        </Content>
        <Footer
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
            color: "var(--semi-color-text-2)",
            backgroundColor: "rgba(var(--semi-grey-0), 1)",
          }}
        >
          <span>Copyright © 2023 Offer Expert. All Rights Reserved. </span>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
