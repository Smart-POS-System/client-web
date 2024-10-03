import {
  CalendarOutlined,
  LoadingOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Select } from "antd";
import { formattedDate } from "../helpers/formatDate";
import DashboardCards from "./DashboardCards";
import SalesPurchaseChart from "./SalesPurchaseChart";
import { useState, useEffect } from "react";
import { getSummarySalesAndPurchases } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import TopSellingProductsChart from "./TopSellingProducts";
import MostPurchasedProductsChart from "./MostPurchasedProducts";

function IncomeOverview() {
  const today = new Date();
  const todayFormatted = formattedDate(today);
  const startDateFormatted = formattedDate(
    new Date(today.setFullYear(today.getFullYear() - 1))
  );
  const [endDate, setEndDate] = useState(todayFormatted);
  const [startDate, setStartDate] = useState(startDateFormatted);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["salesAndPurchase", { startDate, endDate }],
    queryFn: () => getSummarySalesAndPurchases(startDate, endDate),
    enabled: true,
  });

  function handleChange(value) {
    const today = new Date();
    setEndDate(formattedDate(today));

    let newStartDate;
    if (value === "Today") {
      newStartDate = formattedDate(today);
    } else if (value === "Last 7 days") {
      newStartDate = formattedDate(
        new Date(today.setDate(today.getDate() - 7))
      );
    } else if (value === "Last Month") {
      newStartDate = formattedDate(
        new Date(today.setMonth(today.getMonth() - 1))
      );
    } else if (value === "Last Year") {
      newStartDate = formattedDate(
        new Date(today.setFullYear(today.getFullYear() - 1))
      );
    }
    setStartDate(newStartDate);
    refetch();
  }

  function handleRefresh() {
    refetch();
  }

  useEffect(() => {
    refetch();
  }, [refetch]);

  // console.log(data);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-poppins font-semibold">
          Income and Inventory Overview
        </h1>
        <div className="flex flex-row justify-end items-center gap-4">
          <div className="flex flex-row items-center gap-2">
            <h4 className="font-semibold font-poppins text-sm">
              <CalendarOutlined /> Select Date :{" "}
            </h4>
            <Select
              defaultValue="Last Year"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "Today",
                  label: "Today",
                },
                {
                  value: "Last 7 days",
                  label: "Last 7 days",
                },
                {
                  value: "Last Month",
                  label: "Last Month",
                },
                {
                  value: "Last Year",
                  label: "Last Year",
                },
              ]}
            />
          </div>
          <Button type="primary" onClick={handleRefresh}>
            {!isLoading ? <ReloadOutlined /> : <LoadingOutlined />}
            Refresh
          </Button>
        </div>
      </div>

      {/* {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && !error && (
        <> */}
      <div className="flex flex-row gap-4">
        <DashboardCards />
      </div>
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-row items-center justify-between w-full bg-slate-50 rounded-xl p-4 border border-blue-400">
          <SalesPurchaseChart />
        </div>
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="w-1/2">
            <TopSellingProductsChart />
          </div>
          <div className="w-1/2">
            <MostPurchasedProductsChart />
          </div>
        </div>
      </div>
      {/* </>
      )} */}
    </div>
  );
}

export default IncomeOverview;
