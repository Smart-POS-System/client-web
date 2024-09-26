import React, { useState } from "react";
import { Table, Tag, Button } from "antd";
import "./../SalesTable.css"; // Add custom CSS here
import { salesDetails } from "../helpers/list2";

const SalesTable = () => {
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleDescription = (bill_id) => {
    setExpandedRows((prevState) =>
      prevState.includes(bill_id)
        ? prevState.filter((id) => id !== bill_id)
        : [...prevState, bill_id]
    );
  };

  const columns = [
    {
      title: "Bill Number",
      dataIndex: "bill_id",
      key: "bill_id",
      sorter: (a, b) => a.bill_id - b.bill_id,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => <span style={{ whiteSpace: "nowrap" }}>{date}</span>,
    },
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      key: "customer_name",
      sorter: (a, b) => a.customer_name.localeCompare(b.customer_name),
    },
    {
      title: "Cashier Name",
      dataIndex: "cashier",
      key: "cashier",
      sorter: (a, b) => a.cashier.localeCompare(b.cashier),
    },
    {
      title: "Store Name",
      dataIndex: "store",
      key: "store",
      sorter: (a, b) => a.store.localeCompare(b.store),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
      render: (payment_method) => (
        <Tag color={payment_method === "cash" ? "green" : "blue"}>
          {typeof payment_method === "string"
            ? payment_method.toUpperCase()
            : ""}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Button onClick={() => toggleDescription(record.bill_id)}>
          {expandedRows.includes(record.bill_id) ? "Hide" : "View More"}
        </Button>
      ),
    },
  ];

  return (
    <div className="table-container">
      <Table
        columns={columns}
        dataSource={salesDetails.map((item) => ({
          ...item,
          key: item.bill_id,
        }))}
        rowKey="bill_id"
        pagination={{
          pageSize: 10,
          position: ["bottomCenter"],
        }}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>
              {record.description
                ? record.description
                : "No additional information about this sale."}
            </p>
          ),
          rowExpandable: (record) => true,
          expandedRowKeys: expandedRows,
        }}
        className="custom-table"
      />
    </div>
  );
};

export default SalesTable;
