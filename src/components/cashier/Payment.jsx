import React, { useState } from "react";
import {
  Button,
  Input,
  Space,
  Typography,
  Row,
  Col,
  Divider,
  notification,
} from "antd";
import { DollarOutlined, CreditCardOutlined } from "@ant-design/icons";
import PopUp from "./PopUpModel";
import axiosInstance_sales from "../../api/axiosConfig_Sales";
import { useUserData } from "../../context/userContext";
import Notification from "./Notification";
import Stash from "./StashBill";

const { Title, Text } = Typography;

const Payment = ({ sum, value }) => {
  const [amountReceived, setAmountReceived] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [billState, setBillState] = useState("pending");

  const handleInputChange = (e) => {
    setAmountReceived(e.target.value);
  };

  //getting the userdata of the cashier currently working
  const userData = useUserData();
  console.log(userData);

  const calculateBalance = () => {
    const received = Number(amountReceived);
    return received > sum ? (received - sum).toFixed(2) : 0;
  };

  const handleCheckout = async () => {
    const data = {
      discount: 10,
      cashier_id: userData.fullUser.employee_id,
      store_id: 1,
      customer_id: 1,
      items: { value }, // Replace with actual items data
      paymentmethod: paymentMethod,
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
        // Show success notification
        // Show success notification
        notification.success({
          message: "Checkout Successful",
          description: "The payment has been processed successfully.",
          icon: <DollarOutlined style={{ color: "#108ee9" }} />,
          placement: "topRight",
          style: {
            backgroundColor: "#cefad0", // Red background color
            //color: "#fff", // White text color for better contrast
          },
        });

        // Reload the page after a few seconds
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000); // 3 seconds delay before reload
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };
  const handleStash = async () => {
    const data = {
      discount: 10,
      cashier_id: userData.fullUser.employee_id,
      store_id: 1,
      customer_id: 1,
      items: { value }, // Replace with actual items data
      paymentmethod: paymentMethod,
      status: "stashed",
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
        //window.location.reload();
        // Show success notification
        // Show success notification
        notification.success({
          message: "Checkout Successful",
          description: "The payment has been processed successfully.",
          icon: <DollarOutlined style={{ color: "#108ee9" }} />,
          placement: "topRight",
          style: {
            backgroundColor: "#cefad0", // Red background color
            //color: "#fff", // White text color for better contrast
          },
        });

        // Reload the page after a few seconds
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000); // 3 seconds delay before reload
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
          <Button
            type="primary"
            style={{
              backgroundColor: paymentMethod === "cash" ? "#1890ff" : "#ffffff", // Inverted background
              color: paymentMethod === "cash" ? "#ffffff" : "#1890ff", // Inverted text color
              borderColor: paymentMethod === "cash" ? "#1890ff" : "#1890ff", // Border color
            }}
            onClick={() => {
              setPaymentMethod("cash");
            }}
            icon={<DollarOutlined />}
            size="large"
          >
            Cash
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            style={{
              backgroundColor: paymentMethod === "card" ? "#1890ff" : "#ffffff", // Inverted background
              color: paymentMethod === "card" ? "#ffffff" : "#1890ff", // Inverted text color
              borderColor: paymentMethod === "card" ? "#1890ff" : "#1890ff", // Border color
            }}
            onClick={() => {
              setPaymentMethod("card");
            }}
            icon={<CreditCardOutlined />}
            size="large"
          >
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

      {/* <PopUp popup asking cash or card? /> */}
      <div className="flex justify-center" style={{ marginTop: "24px" }}>
        <Button
          type="primary"
          size="large"
          onClick={handleCheckout}
          style={{ margin: 8 }}
        >
          checkout
        </Button>
        <div className="m-[8px]">
          <Stash func={handleStash} />
        </div>
      </div>
    </div>
  );
};

export default Payment;
