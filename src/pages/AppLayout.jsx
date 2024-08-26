import { Outlet } from "react-router-dom";
import NavigationBar from "../ui/Navigation";
import React from "react";
import { Layout, theme } from "antd";

const { Header, Content, Footer } = Layout;

function AppLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <NavigationBar style={{ width: "100%" }} />
      <Layout
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Header
          className="p-0 md:h-20 h-14 w-full"
          style={{ background: colorBgContainer }}
        >
          Header
        </Header>
        <Content
          className="w-11/12"
          style={{
            flex: 1,
            padding: "0 24px",
            overflowY: "auto", // Ensure Content can scroll if needed
          }}
        >
          <div
            className="p-6 min-h-[360px] my-3"
            style={{
              background: `linear-gradient(150deg, #ffffff, #ffffff)`,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer className="text-center h-10 flex justify-center items-center">
          <h3 className="text-sm mb-6">
            Smart POS System ©{new Date().getFullYear()} Created by Polos
            Community
          </h3>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
