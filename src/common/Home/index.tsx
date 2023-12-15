import React, { useEffect, useState } from "react";
import { Layout, Nav, Button, Avatar, Image } from "@douyinfe/semi-ui";
import { IconMoon } from "@douyinfe/semi-icons";
import { routers } from "../config/routers";
import { Outlet, useNavigate } from "react-router-dom";
import menuLogo from "../../assets/menuLogo.jpg";

const switchMode = () => {
  const body = document.body;
  if (body.hasAttribute("theme-mode")) {
    body.removeAttribute("theme-mode");
  } else {
    body.setAttribute("theme-mode", "dark");
  }
};

const Home = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  // isCollapsed

  const { Header, Footer, Content, Sider } = Layout;
  useEffect(() => {
    // 在手机端打开
    if (/Android|webOS|iPhone|iPad/i.test(navigator.userAgent)) {
      setCollapsed(true);
    }
  }, []);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider>
        <Nav
          isCollapsed={collapsed}
          onCollapseChange={(c) => setCollapsed(c)}
          style={{ height: "100%" }}
          defaultSelectedKeys={["Home"]}
          items={routers.map((router: any) => ({
            ...router,
            onClick: () => {
              navigate(`/${router?.itemKey}`);
            },
          }))}
          header={<Image preview src={menuLogo} />}
          footer={{
            collapseButton: true,
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
          <div>
            <Nav mode="horizontal" defaultSelectedKeys={["Home"]}>
              <Nav.Footer>
                <Button
                  theme="borderless"
                  onClick={switchMode}
                  icon={<IconMoon size="large" />}
                />
                <Avatar color="orange" size="small">
                  AU
                </Avatar>
              </Nav.Footer>
            </Nav>
          </div>
        </Header>
        <Content
          style={{
            padding: "16px",
            backgroundColor: "rgba(var(--semi-indigo-0), 1)",
          }}
        >
          <Outlet />
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
