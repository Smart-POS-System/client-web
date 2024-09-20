import React from "react";
import { Row, Col } from "antd";
import UsersOverview from "./UsersOverview";
import InventoryStatus from "./InventoryStatus";
import BillsSummary from "./BillsSummary";
import IncomeOverview from "./IncomeOverview";

const AdminDashboard = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <InventoryStatus />
        </Col>
        <Col span={12}>
          <IncomeOverview />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <UsersOverview />
        </Col>
        <Col span={12}>
          <BillsSummary />
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
