import { Outlet } from "react-router-dom";
import NavigationBar from "../components/Navigation";
import React, { useEffect } from "react";
import { Layout, theme } from "antd";
import Profile from "../components/Profile";
import { useUserData } from "../context/userContext";
import { useCurrentUser } from "../hooks/useCurrentUser";

const { Header, Content, Footer } = Layout;

function AppLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { isLoading, user } = useCurrentUser();
  const { storeFullUser } = useUserData();

  useEffect(() => {
    if (!isLoading && user) {
      storeFullUser(user);
    }
  }, [isLoading, user, storeFullUser]);

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#e0e0e0" }}>
      <NavigationBar style={{ width: "100%" }} />
      <Layout
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#e0e0e0",
          position: "sticky",
          overflow: "hidden",
        }}
      >
        <Header
          className="p-0 md:h-20 h-14 w-full flex flex-row items-center justify-end"
          style={{
            backgroundColor: "#f0f0f5",
            color: "#333333",
            overflow: "hidden",
          }}
        >
          <div className="flex  mr-4">
            <Profile />
          </div>
        </Header>
        <Content
          className="w-full"
          style={{
            flex: 1,
            padding: "40px 40px",
            color: "#333333",
            overflowY: "auto", // Ensure Content can scroll if needed
            maxHeight: "calc(100vh - 80px - 40px)",
          }}
        >
          <div
            className="p-4 min-h-[360px]"
            style={{
              backgroundColor: "#fcfcfc",
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          className="text-center h-10 flex justify-center items-center"
          style={{ backgroundColor: "#f0f0f5", color: "#333333" }}
        >
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
