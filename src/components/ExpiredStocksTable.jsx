import React, { useEffect, useState } from "react";
import { Table, Pagination, Typography } from "antd";
import { axiosInstance_inventory } from "../api/axiosConfig_Inventory";

const { Title } = Typography;

const columns = [
  { title: "Barcode", dataIndex: "barcode", width: "25%" },
  { title: "Product Name", dataIndex: "product_name", width: "25%" },
  { title: "Batch Number", dataIndex: "batch_no", width: "15%" },
  {
    title: "Quantity",
    dataIndex: "quantity",
    width: "10%",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Expiry Date",
    dataIndex: "exp",
    width: "25%",
    sorter: (a, b) => a.age - b.age,
  },
];

const ExpiredStocksTable = () => {
  const pageSize = 2;
  const [expiredStocks, setExpiredStocks] = useState([]);
  const [stockCount, setStockCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpired = async () => {
    setLoading(true);
    const data = {
      location_id: 1,
      type: "expired",
      page_size: pageSize,
      current_page: currentPage,
    };

    try {
      const expiredResponse = await axiosInstance_inventory.post(
        "/expires",
        data
      );
      setExpiredStocks(expiredResponse.data.stocks);
      setStockCount(expiredResponse.data.expiringCount);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch expiring stocks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpired();
  }, []);

  useEffect(() => {
    console.log(currentPage);
    fetchExpired();
  }, [currentPage]);

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (stockId) => {
    console.log("Deleting stock ", stockId, " from expired stocks");
    // Implement delete logic here
  };

  return (
    <div className="mb-5 border border-danger-400 bg-danger-100 rounded-lg overflow-hidden">
      <Table
        bordered
        pagination={false}
        size="small"
        title={() => (
          <Title level={4} className="text-center">
            Expired Stocks
          </Title>
        )}
        loading={loading}
        columns={columns}
        dataSource={expiredStocks}
      />
      <Pagination
        className="py-5 justify-center"
        current={currentPage}
        pageSize={pageSize}
        total={stockCount}
        onChange={(page) => handleCurrentPage(page)}
      />
    </div>
  );
};

export default ExpiredStocksTable;
