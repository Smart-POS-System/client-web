import { Button, Input, Space } from "antd";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Bill from "./Bill";
import Payment from "./Payment";
import calculateTotalBill from "../../helpers/getBillSum";

const BillSider = ({ value }) => {
  const [customer, setCustormer] = useState("");
  const [promoCode, setPromoCode] = useState("");
  //const [sum, setSum] = useState();
  // const getSum= (props.value) =>{
  const sum = calculateTotalBill(value);
  const handleCustomer = () => {
    console.log(customer); //backend calling logic to find the custermmer
  };
  // }
  // setSum(calculateTotalBill(value));
  return (
    <div>
      <Space>
        <Space.Compact size="large">
          <Input
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
            {customer}
            Add Customer
          </Button>
        </Space.Compact>
      </Space>

      <div className="mt-5">
        <Space>
          <Space.Compact size="large">
            <Input placeholder="Add Promo Code" />

            <Button type="primary">Add Promo</Button>
          </Space.Compact>
        </Space>
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
          <Bill value={value} sum={sum} />
        </div>
        {calculateTotalBill(value)}
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
