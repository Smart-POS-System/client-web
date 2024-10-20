import React, { useEffect, useState } from "react";
import { Table, Pagination, Typography } from "antd";
// import { axiosInstance_inventory } from "../api/axiosConfig_Inventory";

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

const hardCodedStocks = [
  {
    stock_id: 1,
    barcode: "198457913",
    product_name: "Canned Beans 400g",
    batch_no: 22,
    quantity: 10,
    exp: "2024-09-15",
  },
  {
    stock_id: 2,
    barcode: "198457914",
    product_name: "Rice 1kg",
    batch_no: 23,
    quantity: 20,
    exp: "2024-09-20",
  },
  {
    stock_id: 3,
    barcode: "198457915",
    product_name: "Olive Oil 500ml",
    batch_no: 24,
    quantity: 15,
    exp: "2024-09-25",
  },
  {
    stock_id: 4,
    barcode: "198457916",
    product_name: "Coconut Milk 400ml",
    batch_no: 25,
    quantity: 30,
    exp: "2024-09-28",
  },
  {
    stock_id: 5,
    barcode: "198457917",
    product_name: "Frozen Chicken 1kg",
    batch_no: 26,
    quantity: 12,
    exp: "2024-09-30",
  },
  {
    stock_id: 6,
    barcode: "198457918",
    product_name: "Peanut Butter 250g",
    batch_no: 27,
    quantity: 18,
    exp: "2024-09-29",
  },
  {
    stock_id: 7,
    barcode: "198457919",
    product_name: "Sugar 1kg",
    batch_no: 28,
    quantity: 25,
    exp: "2024-09-15",
  },
  {
    stock_id: 8,
    barcode: "198457920",
    product_name: "Flour 1kg",
    batch_no: 29,
    quantity: 20,
    exp: "2024-09-05",
  },
  {
    stock_id: 9,
    barcode: "198457921",
    product_name: "Spices 100g",
    batch_no: 30,
    quantity: 15,
    exp: "2024-08-28",
  },
  {
    stock_id: 10,
    barcode: "198457922",
    product_name: "Chips 200g",
    batch_no: 31,
    quantity: 10,
    exp: "2024-09-10",
  },
  {
    stock_id: 11,
    barcode: "198457923",
    product_name: "Chocolate Bar 100g",
    batch_no: 32,
    quantity: 22,
    exp: "2024-09-12",
  },
  {
    stock_id: 12,
    barcode: "198457924",
    product_name: "Snack Cakes 6-pack",
    batch_no: 33,
    quantity: 18,
    exp: "2024-09-18",
  },
];

const ExpiredStocksTable = () => {
  const pageSize = 2;
  const [expiredStocks, setExpiredStocks] = useState(hardCodedStocks);
  const [stockCount, setStockCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const fetchExpired = async () => {
  //   setLoading(true);
  //   const data = {
  //     location_id: 1,
  //     type: "expired",
  //     page_size: pageSize,
  //     current_page: currentPage,
  //   };

  //   try {
  //     const expiredResponse = await axiosInstance_inventory.post(
  //       "/expires",
  //       data
  //     );
  //     setExpiredStocks(expiredResponse.data.stocks);
  //     setStockCount(expiredResponse.data.expiringCount);
  //   } catch (error) {
  //     console.log(error);
  //     setError("Failed to fetch expiring stocks.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchExpired();
  // }, []);

  // useEffect(() => {
  //   console.log(currentPage);
  //   fetchExpired();
  // }, [currentPage]);

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (stockId) => {
    console.log("Deleting stock ", stockId, " from expired stocks");
    // Implement delete logic here
  };

  return (
    // <div className="mb-5 border border-danger-400 bg-danger-100 rounded-lg overflow-hidden">
    <div className="mb-5 rounded-lg overflow-hidden">
      <h1 className="text-2xl font-bold font-poppins mb-4 md:text-left text-center">
        <strong>Expired Stocks</strong>
      </h1>
      <div>
        <Table
          // pagination={false}
          columns={columns}
          pagination={false}
          pageSize={pageSize}
          dataSource={hardCodedStocks}
          rowKey={(stock) => stock?.stock_id}
          loading={loading}
        />
        <Pagination
          className="py-8 justify-end"
          current={currentPage}
          pageSize={pageSize}
          total={stockCount}
          onChange={(page) => handleCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default ExpiredStocksTable;
