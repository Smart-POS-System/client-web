import React, { useState, useEffect } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  ProductOutlined,
  UserOutlined,
  UserAddOutlined,
  UnorderedListOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { HiOutlineUsers } from "react-icons/hi2";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useAction } from "../context/actionContext";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("Users", "sub1", <UserOutlined />, [
    getItem("See All Users", "/users", <HiOutlineUsers />),
    getItem("Add New User", "/create", <UserAddOutlined />),
    getItem("My Profile", "/view", <UserOutlined />),
    getItem("Customers", "/customers", <HiOutlineUsers />),
  ]),
  getItem("Products", "sub2", <ProductOutlined />, [
    getItem("See All Products", "/products", <UnorderedListOutlined />),
    getItem("Add New Product", "/create-product", <AppstoreAddOutlined />),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

function NavigationBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleUpdatingUser } = useAction();

  const [selectedKey, setSelectedKey] = useState(location.pathname);

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
    <Sider
      theme="light"
      breakpoint="lg"
      collapsedWidth="0"
      width={250} // Set the width here (adjust as needed)
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="demo-logo-vertical" />
      <div className="items-center w-2/4 h-auto pt-8 m-auto">
        <Logo />
      </div>
      <Menu
        className="mt-8 text-sm font-poppins font-semibold"
        theme="light"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
        items={items}
      />
    </Sider>
  );
}

export default NavigationBar;
