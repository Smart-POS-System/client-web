import React, { useState, useEffect } from "react";
import {
  PlusCircleOutlined,
  ProductOutlined,
  UserOutlined,
  UserAddOutlined,
  AreaChartOutlined,
  TransactionOutlined,
  UnorderedListOutlined,
  AppstoreAddOutlined,
  DashboardOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  ClusterOutlined,
  ApartmentOutlined,
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
    getItem("Dashboard", "/dashboard", <AreaChartOutlined />),
    user?.role !== "Cashier"
      ? getItem("Users", "sub1", <UserOutlined />, [
          getItem("All Employee", "/users", <HiOutlineUsers />),

          // getItem("New User", "/create", <UserAddOutlined />),
          // getItem("My Profile", "/view", <UserOutlined />),
          getItem("Customers", "/customers", <HiOutlineUsers />),
        ])
      : null,
    user.role === "Cashier"
      ? getItem("New Customer", "/customers/register", <UserAddOutlined />)
      : null,
    user?.role === "Cashier"
      ? getItem("My Profile", "/view", <UserOutlined />)
      : null,
    getItem("Products", "sub2", <ProductOutlined />, [
      getItem("See All Products", "/products", <UnorderedListOutlined />),
      getItem("Add New Product", "/create-product", <AppstoreAddOutlined />),
      getItem("See All Items", "/items", <UnorderedListOutlined />),
      getItem("Add Specific Item", "/create-item", <PlusCircleOutlined />),
      getItem("See All Stocks", "/stocks", <UnorderedListOutlined />),
      getItem("Add Specific Stock", "/create-stock", <PlusCircleOutlined />),
    ]),
    getItem("Expiry Stocks", "sub3", <ClockCircleOutlined />, [
      getItem("Expiring Stocks", "/expiring", <UnorderedListOutlined />),
      getItem("Expired Stocks", "/expired", <UnorderedListOutlined />),
    ]),
    getItem("Transactions", "/transactions", <TransactionOutlined />),
    user.role === "General Manager" ||
    user.role === "Regional Manager" ||
    user.role === "Inventory Manager"
      ? getItem("Locations", "sub4", <ClusterOutlined />, [
          user.role === "General Manager" || user.role === "Regional Manager"
            ? getItem("Regions", "/regions", <ApartmentOutlined />)
            : null,
          getItem("Locations", "/locations", <ApartmentOutlined />),
        ])
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
      // theme="light"
      breakpoint="lg"
      collapsedWidth="0"
      width={250} // Set the width here (adjust as needed)
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{ backgroundColor: "#fcfcfc" }}
    >
      <div className="demo-logo-vertical" />

      <div className="items-center w-2/4 h-auto pt-8 m-auto">
        <Logo />
      </div>
      <Menu
        className="mt-8 text-sm font-poppins bg-inherit"
        theme="light"
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
