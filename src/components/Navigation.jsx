import React, { useState, useEffect } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  UserAddOutlined,
  DashboardOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { VideoCameraOutlined, UploadOutlined } from "@ant-design/icons";
import { HiOutlineUsers } from "react-icons/hi2";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useAction } from "../context/actionContext";
//import { useUserData } from "../context/userContext";
import { useUserData } from "../context/userContext";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

function NavigationBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleUpdatingUser } = useAction();
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const { user } = useUserData();
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    // getItem("Option 1", "1", <PieChartOutlined />),
    // getItem("Option 2", "2", <DesktopOutlined />),
    user?.role !== "Cashier"
      ? getItem("Users", "sub1", <UserOutlined />, [
          getItem("See All Users", "/users", <HiOutlineUsers />),
          getItem("Add New User", "/create", <UserAddOutlined />),
          getItem("My Profile", "/view", <UserOutlined />),
          getItem("Customers", "/customers", <HiOutlineUsers />),
        ])
      : null,
    // getItem("Team", "sub2", <TeamOutlined />, [
    //   getItem("Team 1", "6"),
    //   getItem("Team 2", "8"),
    // ]),
    // getItem("Files", "9", <FileOutlined />),
    user?.role === "Cashier"
      ? getItem("Dashboard", "/dashboard", <DashboardOutlined />)
      : null,
    user.role === "Cashier"
      ? getItem("Add New Customer", "/customers/register", <UserAddOutlined />)
      : null,
    user?.role === "Cashier"
      ? getItem("My Profile", "/view", <UserOutlined />)
      : null,

    user?.role === "Cashier"
      ? getItem("Stashed Bills", "/stashedBills", <FileTextOutlined />)
      : null,
  ];

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    if (e.key === "/create") {
      handleUpdatingUser(false);
    }

    navigate(e.key);
  };

  return (
    // <Sider
    //   theme="light"
    //   breakpoint="lg"
    //   collapsedWidth="0"
    //   width={250} // Set the width here (adjust as needed)
    //   onBreakpoint={(broken) => {
    //     console.log(broken);
    //   }}
    //   onCollapse={(collapsed, type) => {
    //     console.log(collapsed, type);
    //   }}
    // >
    //   <div className="demo-logo-vertical" />
    //   <div className="items-center w-2/4 h-auto pt-8 m-auto">
    //     <Logo />
    //   </div>
    //   <Menu
    //     className="mt-8 text-sm font-poppins font-semibold"
    //     theme="light"
    //     mode="inline"
    //     selectedKeys={[selectedKey]}
    //     onClick={handleMenuClick}
    //     items={items}
    //   />
    // </Sider>
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        position: "sticky",
        left: 0,
        top: 0,
        height: "100vh", // Full viewport height
        overflow: "hidden", // Prevents scrolling
      }}
    >
      <div className="demo-logo-vertical" />

      <div className="items-center w-2/4 h-auto pt-8 m-auto">
        <Logo />
      </div>
      <Menu
        className="mt-8 text-sm font-poppins font-semibold"
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
        items={items}
      />

      {/* <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: "nav 1",
          },
          {
            key: "2",
            icon: <VideoCameraOutlined />,
            label: "nav 2",
          },
          {
            key: "3",
            icon: <UploadOutlined />,
            label: "nav 3",
          },
        ]}
      /> */}
    </Sider>
  );
}

export default NavigationBar;
