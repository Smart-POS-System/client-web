import React, { useState } from "react";
import { Button, Input, Space, Typography, Row, Col, Divider } from "antd";
import { DollarOutlined, CreditCardOutlined } from "@ant-design/icons";
import PopUp from "./PopUpModel";
import axiosInstance_sales from "../../api/axiosConfig_Sales";

const { Title, Text } = Typography;

const Payment = ({ sum, value }) => {
  const [amountReceived, setAmountReceived] = useState("");

  const handleInputChange = (e) => {
    setAmountReceived(e.target.value);
  };

  const calculateBalance = () => {
    const received = Number(amountReceived);
    return received > sum ? (received - sum).toFixed(2) : 0;
  };

  const handleCheckout = async () => {
    const data = {
      discount: 10,
      cashier_id: 1,
      store_id: 1,
      customer_id: 1,
      items: { value }, // Replace with actual items data
      paymentmethod: "cash",
    };

    try {
      const response = await axiosInstance_sales.post("/newOrder", data);
      // console.log("API request made. Response:", response);

      // Log the status code directly
      // console.log("Status code:", response.status);
      // console.log("Checkout successful:", response.data);
      if (response.status === 201) {
        console.log("Checkout successful:", response.data, response.status);
        // Refresh the page after successful checkout
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
        // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>
        Payment
      </Title>

      <Row gutter={[16, 16]} justify="center">
        <Col>
          <Button type="primary" icon={<DollarOutlined />} size="large">
            Cash
          </Button>
        </Col>
        <Col>
          <Button type="primary" icon={<CreditCardOutlined />} size="large">
            Card
          </Button>
        </Col>
      </Row>

      <Divider />
      <Row justify="space-between" style={{ marginTop: "24px" }}>
        <Col>
          <Text strong>Total:</Text>
        </Col>
        <Col>
          <Title level={4}>{sum.toFixed(2)}</Title>
        </Col>
      </Row>
      <Row justify="space-between" style={{ marginTop: "24px" }}>
        <Col>
          <Text strong>Amount Received:</Text>
        </Col>
        <Col>
          <Space size="large">
            <Input
              placeholder="Enter Amount"
              value={amountReceived}
              onChange={handleInputChange}
              size="large"
              style={{ width: "100px" }}
            />
          </Space>
        </Col>
      </Row>

      <Row justify="space-between" style={{ marginTop: "24px" }}>
        <Col>
          <Text strong>Balance:</Text>
        </Col>
        <Col>
          <Title level={4}>{calculateBalance()}</Title>
        </Col>
      </Row>

      <Divider />
      <Button onClick={handleCheckout}>checkout</Button>
      <PopUp />
    </div>
  );
};

export default Payment;
