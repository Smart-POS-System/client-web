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

const ExpiringStocksTable = () => {
  const pageSize = 5;
  const [expiringStocks, setExpiringStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpiring = async () => {
      setLoading(true);
      const data = {
        location_id: 1,
        type: "expiring",
        pageSize: pageSize,
        current_page: currentPage,
      };

      try {
        const expiringResponse = await axiosInstance_inventory.post(
          "/expires",
          data
        );
        // console.log(expiringResponse.data);

        setExpiringStocks(expiringResponse.data.stocks);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch expiring stocks.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpiring();
  }, []);

  const handleDelete = (stockId) => {
    console.log("Deleting stock ", stockId, " from expiring stocks");
    // Implement delete logic here
  };

  return (
    <div className="mb-5 border border-amber-400 bg-amber-100 rounded-lg overflow-hidden">
      <Table
        bordered
        pagination={false}
        size="small"
        title={() => (
          <Title level={4} className="text-center">
            Expiring Stocks
          </Title>
        )}
        loading={loading}
        columns={columns}
        dataSource={expiringStocks}
      />
      <Pagination
        className="py-5 justify-center"
        current={currentPage}
        pageSize={pageSize}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ExpiringStocksTable;
