import React from "react";

import type { MenuProps } from "antd";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { logout } from "../../../supabase/auth";

const { Header, Content, Sider } = Layout;

const items2: MenuProps["items"] = [
  {
    key: `Users`,
    label: `Users`,
    children: [{ key: "users", label: <Link to={"users"}>Users</Link> }],
  },
  {
    key: `Blogs`,
    label: `Blogs`,
    children: [{ key: "blogs", label: <Link to={"blogs"}>Blogs</Link> }],
  },
];

const DashboardLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleLogout = () => {
    logout();
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button style={{ marginLeft: "auto" }} onClick={handleLogout}>
          Log Out
        </Button>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
              items={items2}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default DashboardLayout;
