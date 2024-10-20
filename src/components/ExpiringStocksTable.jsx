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

const expiringSoonStocks = [
  {
    stock_id: 1,
    barcode: "198457901",
    product_name: "Fresh Milk 1L",
    batch_no: 10,
    quantity: 15,
    exp: "2024-10-10",
  },
  {
    stock_id: 2,
    barcode: "198457902",
    product_name: "Greek Yogurt 200g",
    batch_no: 11,
    quantity: 20,
    exp: "2024-10-12",
  },
  {
    stock_id: 3,
    barcode: "198457903",
    product_name: "Whole Wheat Bread",
    batch_no: 12,
    quantity: 30,
    exp: "2024-10-15",
  },
  {
    stock_id: 4,
    barcode: "198457904",
    product_name: "Organic Spinach 250g",
    batch_no: 13,
    quantity: 25,
    exp: "2024-10-18",
  },
  {
    stock_id: 5,
    barcode: "198457905",
    product_name: "Chicken Thighs 500g",
    batch_no: 14,
    quantity: 10,
    exp: "2024-10-20",
  },
  {
    stock_id: 6,
    barcode: "198457906",
    product_name: "Eggs 12-pack",
    batch_no: 15,
    quantity: 18,
    exp: "2024-10-22",
  },
  {
    stock_id: 7,
    barcode: "198457907",
    product_name: "Sliced Cheese 200g",
    batch_no: 16,
    quantity: 22,
    exp: "2024-10-25",
  },
  {
    stock_id: 8,
    barcode: "198457908",
    product_name: "Bananas 1kg",
    batch_no: 17,
    quantity: 30,
    exp: "2024-10-28",
  },
  {
    stock_id: 9,
    barcode: "198457909",
    product_name: "Frozen Peas 500g",
    batch_no: 18,
    quantity: 15,
    exp: "2024-10-30",
  },
  {
    stock_id: 10,
    barcode: "198457910",
    product_name: "Pasta 500g",
    batch_no: 19,
    quantity: 40,
    exp: "2024-11-01",
  },
  {
    stock_id: 11,
    barcode: "198457911",
    product_name: "Tomato Sauce 400g",
    batch_no: 20,
    quantity: 35,
    exp: "2024-11-05",
  },
  {
    stock_id: 12,
    barcode: "198457912",
    product_name: "Granola Bars 6-pack",
    batch_no: 21,
    quantity: 20,
    exp: "2024-11-10",
  },
];

const ExpiringStocksTable = () => {
  const pageSize = 5;
  const [expiringStocks, setExpiringStocks] = useState(expiringSoonStocks);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchExpiring = async () => {
  //     setLoading(true);
  //     const data = {
  //       location_id: 1,
  //       type: "expiring",
  //       pageSize: pageSize,
  //       current_page: currentPage,
  //     };

  //     try {
  //       const expiringResponse = await axiosInstance_inventory.post(
  //         "/expires",
  //         data
  //       );
  //       // console.log(expiringResponse.data);

  //       setExpiringStocks(expiringResponse.data.stocks);
  //     } catch (error) {
  //       console.log(error);
  //       setError("Failed to fetch expiring stocks.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchExpiring();
  // }, []);

  const handleDelete = (stockId) => {
    console.log("Deleting stock ", stockId, " from expiring stocks");
    // Implement delete logic here
  };

  return (
    // <div className="mb-5 border border-amber-400 bg-amber-100 rounded-lg overflow-hidden">
    <div className="mb-5 rounded-lg overflow-hidden">
      <h1 className="text-2xl font-bold font-poppins mb-4 md:text-left text-center">
        <strong>Expiring Stocks</strong>
      </h1>
      <Table
        // pagination={false}
        columns={columns}
        pagination={{
          current: 1,
          pageSize: 10,
          showSizeChanger: false,
          position: ["bottomRight"],
          style: { display: "flex", justifyContent: "center" },
        }}
        pageSize={pageSize}
        dataSource={expiringStocks}
        rowKey={(stock) => stock?.stock_id}
        loading={loading}
      />
      {/* <Pagination
        className="py-5 justify-center"
        current={currentPage}
        pageSize={pageSize}
        onChange={(page) => setCurrentPage(page)}
      /> */}
    </div>
  );
};

export default ExpiringStocksTable;
