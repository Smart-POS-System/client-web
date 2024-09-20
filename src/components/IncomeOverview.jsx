import { Card } from "antd";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const data = [
  { name: "Jan", income: 4000 },
  { name: "Feb", income: 3000 },
  { name: "Mar", income: 5000 },
  { name: "Apr", income: 7000 },
];

const IncomeOverview = () => {
  return (
    <Card
      title={
        <span className="text-xl font-poppins text-gray-800">
          Income Overview
        </span>
      }
      style={{
        borderRadius: "20px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        background: "linear-gradient(135deg, #f0f4ff 0%, #d9e4ff 100%)",
        padding: "20px",
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" stroke="#555" />
          <YAxis stroke="#555" />
          <Tooltip
            contentStyle={{ backgroundColor: "#f0f4ff", borderRadius: "10px" }}
          />
          <Legend verticalAlign="top" height={36} />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#8884d8"
            strokeWidth={3}
            fill="url(#colorIncome)"
            dot={{ r: 5, fill: "#8884d8" }}
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IncomeOverview;
