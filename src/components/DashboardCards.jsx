import {
  AccountBookOutlined,
  DollarOutlined,
  RetweetOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Card from "./Cards";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";

function DashboardCards({ startDate, endDate }) {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(
      "Running useEffect in DashboardCards with new start and end dates: ",
      startDate,
      endDate
    );

    const fetchTotalRevenue = async () => {
      setLoading(true);
      try {
        const totalRevenueResponse = await axiosInstance.get(
          `http://localhost:49164/total-revenue?startDate=${startDate}&endDate=${endDate}`
        );

        setTotalRevenue(totalRevenueResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalRevenue();
  }, [startDate, endDate]);

  return (
    <>
      <Card
        title="Total Revenue"
        amount={`Rs. ${totalRevenue}`}
        icon={<AccountBookOutlined />}
        colour={"bg-green-300"}
        outerColour={"bg-green-100"}
      />
      <Card
        title="Total Sales"
        amount="Rs. 5000"
        icon={<DollarOutlined />}
        colour={"bg-purple-300"}
        outerColour={"bg-purple-100"}
      />
      <Card
        title="Total Purchase"
        amount="Rs. 5000"
        icon={<ShoppingCartOutlined />}
        colour={"bg-orange-300"}
        outerColour={"bg-orange-100"}
      />
      <Card
        title="Total Return"
        amount="Rs. 5000"
        icon={<RetweetOutlined />}
        colour={"bg-yellow-300"}
        outerColour={"bg-yellow-100"}
      />
    </>
  );
}

export default DashboardCards;
