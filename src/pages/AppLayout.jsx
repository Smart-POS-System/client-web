import { Outlet } from "react-router-dom";
import NavigationBar from "../components/Navigation";
import React, { useEffect, useState } from "react";
import { Layout, theme } from "antd";
import Profile from "../components/Profile";
import { useUserData } from "../context/userContext";
import { useCurrentUser } from "../hooks/useCurrentUser";
import HourGlass from "../components/HourGlass";
import PasswordAlert from "../components/PasswordAlert";
import HeaderSearch from "../components/HeaderSearch";
import Notifications from "../components/Notifications";
import NightModeButton from "../components/NightModeButton";

const { Header, Content, Footer } = Layout;

function AppLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { isLoading, user } = useCurrentUser();
  const { storeFullUser } = useUserData();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!isLoading && user) {
      storeFullUser(user);
    }
  }, [isLoading, user, storeFullUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <HourGlass />;
  }

  return (
    <>
      <PasswordAlert
        visible={visible}
        temporary={user?.temporary}
        setVisible={setVisible}
      />
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
            className="p-0 md:h-20 h-14 w-full flex flex-row items-center justify-center"
            style={{ background: colorBgContainer }}
          >
            <div className="w-11/12 flex flex-row items-center justify-between">
              <div className="w-5/12">
                <HeaderSearch />
              </div>

              <div className="flex flex-row items-center justify-between gap-6 mr-4">
                <Notifications />
                <NightModeButton />
                <Profile />
              </div>
            </div>
          </Header>
          <Content className="w-full h-auto flex flex-col items-center justify-center ">
            <div
              className="p-6 w-11/12 h-full rounded-lg bg-white my-12"
              style={{
                borderRadius: borderRadiusLG, // This needs to remain inline as Tailwind doesn't support dynamic values directly
              }}
            >
              <Outlet />
            </div>
          </Content>

          <Footer className="text-center h-10 bg-white w-full  flex justify-center items-center">
            <h3 className="text-sm">
              Smart POS System ©{new Date().getFullYear()} Created by Polos
              Community
            </h3>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default AppLayout;
