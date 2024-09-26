import { Button, Input, Space, Form } from "antd";
import React, { useState } from "react";
import {
  FireFilled,
  FireOutlined,
  PhoneOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Bill from "./Bill";
import Payment from "./Payment";
import calculateTotalBill from "../../helpers/getBillSum";
import Icon from "@ant-design/icons/lib/components/Icon";

const BillSider = ({ value, setValue }) => {
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");

  const sum = calculateTotalBill(value);

  const handleCustomerChange = (e) => {
    const inputValue = e.target.value;
    setCustomer(inputValue);

    // Backend logic or validation
    if (inputValue === "077121212") {
      // Example condition: when customer input is "0"
      setPhone("success");
    } else {
      setPhone("warning"); // Reset the validation status if the condition is not met
    }
  };

  return (
    <div>
      <Form layout="vertical">
        <Form.Item hasFeedback validateStatus={phone}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <label style={{ marginRight: 8 }}>Phone:</label>
            <Input
              className="w-3/4"
              placeholder="Your phone number"
              prefix={<PhoneOutlined />}
              value={customer}
              onChange={handleCustomerChange}
              size="medium"
              style={{ backgroundColor: "#fafafa", flexGrow: 1 }} // Adjust the input to fill the remaining space
            />
          </div>
          {/* <Input
            placeholder="your phone number"
            prefix={<PhoneOutlined />}
            value={customer}
            onChange={(e) => setCustormer(e.target.value)}
            onPressEnter={handleCustomer(value)}
            size="medium"
            style={{ backgroundColor: "#fafafa" }} // Adjust the background color to match the design
            suffix={
              <Button
                type="primary"
                value={customer}
                onChange={(e) => setCustormer(e.target.value)}
                onPressEnter={handleCustomer(value)}
              > */}
          {/* {customer} */}
          {/* <UserAddOutlined /> */}
          {/* Add Customer */}
          {/* </Button>
            }
          /> */}
        </Form.Item>

        {/* Discount Field */}
        <Form.Item hasFeedback validateStatus="success" className=" ">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",

              alignItems: "center",
            }}
          >
            <label style={{ marginRight: 8 }}>Promo Code:</label>
            <Input
              className="w-3/4"
              placeholder="25%"
              prefix={<FireOutlined />}
              // suffix={
              //   <Button type="primary">
              //     <FireFilled />
              //   </Button>
              // }
              size="medium"
              style={{ backgroundColor: "#fafafa" }} // Adjust the background color to match the design
            />
          </div>
        </Form.Item>
      </Form>
      {/* <div className="flex justify-end">
        <Space>
          <Space.Compact size="medium" className="w-full">
            <Input
              className="w-full"
              placeholder="Add Promo Code"
              value={customer}
              onChange={(e) => setCustormer(e.target.value)}
              onPressEnter={handleCustomer(value)}
            />

            <Button
              type="primary"
              value={customer}
              onChange={(e) => setCustormer(e.target.value)}
              onPressEnter={handleCustomer(value)}
            >
              {/* {customer} */}
      {/* <UserAddOutlined /> */}
      {/* Add Customer */}
      {/* </Button> */}
      {/* </Space.Compact>
        </Space>
      </div> */}
      {/* <div className="mt-5 w-full flex justify-end">
        <Space>
          <Space.Compact size="medium">
            <Input placeholder="Add Promo Code" />

            <Button type="primary">
              <FireFilled />
            </Button>
          </Space.Compact>
        </Space>
      </div> */}

      <div className="mt-5">
        <div
          className="rounded-xl shadow-lg border border-gray-300 p-4"
          style={{
            padding: 24,
            minHeight: 360,
            background: "white",
            // borderRadius: borderRadiusLG,
          }}
        >
          <Bill value={value} sum={sum} setValue={setValue} />
        </div>
        {/* {calculateTotalBill(value)} */}
      </div>
      <div className="mt-5">
        <div
          className="rounded-xl shadow-lg border border-gray-300 p-4"
          style={{
            padding: 24,
            minHeight: 360,
            background: "white",
            // borderRadius: borderRadiusLG,
          }}
        >
          <Payment sum={sum} value={value} />
        </div>
      </div>
    </div>
  );
};

export default BillSider;
