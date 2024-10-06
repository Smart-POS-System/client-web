// import { DeleteOutlined } from "@ant-design/icons";
// import { Button, Pagination, Popconfirm, Table, Typography } from "antd";
// import React, { useState, useEffect } from "react";
// import { axiosInstance_inventory } from "../api/axiosConfig_Inventory";

// const { Title } = Typography;

// const columns = [
//   { title: "Barcode", dataIndex: "barcode", width: "25%" },
//   { title: "Product Name", dataIndex: "product_name", width: "25%" },
//   { title: "Batch Number", dataIndex: "batch_no", width: "15%" },
//   {
//     title: "Quantity",
//     dataIndex: "quantity",
//     width: "10%",
//     sorter: (a, b) => a.age - b.age,
//   },
//   {
//     title: "Expiry Date",
//     dataIndex: "exp",
//     width: "25%",
//     sorter: (a, b) => a.age - b.age,
//   },
// ];

// // const expiringStocks = [
// //   {
// //     stock_id: "S001",
// //     barcode: "1234567890123",
// //     batchNo: "BATCH001",
// //     quantity: 50,
// //     exp: "2024-10-01",
// //     productName: "Organic Whole Milk",
// //   },
// //   {
// //     stock_id: "S002",
// //     barcode: "9876543210987",
// //     batchNo: "BATCH002",
// //     quantity: 20,
// //     exp: "2024-10-02",
// //     productName: "Free-Range Eggs",
// //   },
// //   {
// //     stock_id: "S003",
// //     barcode: "4567890123456",
// //     batchNo: "BATCH003",
// //     quantity: 15,
// //     exp: "2024-09-30",
// //     productName: "Artisan Bread",
// //   },
// //   {
// //     stock_id: "S004",
// //     barcode: "3210987654321",
// //     batchNo: "BATCH004",
// //     quantity: 30,
// //     exp: "2024-10-01",
// //     productName: "Aged Cheddar Cheese",
// //   },
// //   {
// //     stock_id: "S005",
// //     barcode: "9892753210987",
// //     batchNo: "BATCH002",
// //     quantity: 20,
// //     exp: "2024-10-02",
// //     productName: "Free-Range Eggs",
// //   },
// //   {
// //     stock_id: "S006",
// //     barcode: "4567891948356",
// //     batchNo: "BATCH003",
// //     quantity: 15,
// //     exp: "2024-09-30",
// //     productName: "Artisan Bread",
// //   },
// //   {
// //     stock_id: "S007",
// //     barcode: "3210927364321",
// //     batchNo: "BATCH004",
// //     quantity: 30,
// //     exp: "2024-10-01",
// //     productName: "Cheddar Cheese",
// //   },
// // ];

// // const expiredStocks = [
// //   {
// //     stock_id: "S005",
// //     barcode: "6543210987654",
// //     batchNo: "BATCH005",
// //     quantity: 10,
// //     exp: "2024-09-29",
// //     productName: "Salted Butter",
// //   },
// //   {
// //     stock_id: "S006",
// //     barcode: "7890123456789",
// //     batchNo: "BATCH006",
// //     quantity: 5,
// //     exp: "2024-09-28",
// //     productName: "Greek Yogurt",
// //   },
// //   {
// //     stock_id: "S007",
// //     barcode: "2109876543210",
// //     batchNo: "BATCH007",
// //     quantity: 100,
// //     exp: "2024-08-15",
// //     productName: "Fresh Orange Juice",
// //   },
// //   {
// //     stock_id: "S008",
// //     barcode: "1357924680135",
// //     batchNo: "BATCH008",
// //     quantity: 25,
// //     exp: "2024-09-15",
// //     productName: "Whole Wheat Pasta",
// //   },
// //   {
// //     stock_id: "S009",
// //     barcode: "7881453456789",
// //     batchNo: "BATCH006",
// //     quantity: 5,
// //     exp: "2024-09-28",
// //     productName: "Greek Yogurt",
// //   },
// //   {
// //     stock_id: "S010",
// //     barcode: "2109826243210",
// //     batchNo: "BATCH007",
// //     quantity: 100,
// //     exp: "2024-08-15",
// //     productName: "Fresh Orange Juice",
// //   },
// // ];

// const ExpiringOverview = () => {
//   const pageSize = 5;
//   // const expiringCount = expiringStocks.length;
//   // const expiredCount = expiredStocks.length;
//   const [expiringStocks, setExpiringStocks] = useState();
//   const [expiredStocks, setExpiredStocks] = useState();
//   const [expiringCurrentPage, setExpiringCurrentPage] = useState(1);
//   const [expiredCurrentPage, setExpiredCurrentPage] = useState(1);
//   const [expiringLoading, setExpiringLoading] = useState(false);
//   const [expiredLoading, setExpiredLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchExpiring = async () => {
//       setExpiringLoading(true);
//       const data = {
//         location_id: 1,
//         type: "expiring",
//         pageSize: pageSize,
//         current_page: expiringCurrentPage,
//       };

//       try {
//         const expiringResponse = await axiosInstance_inventory.post(
//           "/expires",
//           data
//         );
//         // console.log(expiringResponse.data);

//         setExpiringStocks(expiringResponse.data.stocks);
//       } catch (error) {
//         console.log(error);
//         setError("Failed to fetch expiring stocks.");
//       } finally {
//         setExpiringLoading(false);
//       }
//     };
//     const fetchExpired = async () => {
//       setExpiredLoading(true);
//       const data = {
//         location_id: 1,
//         type: "expired",
//         page_size: pageSize,
//         current_page: expiredCurrentPage,
//       };

//       try {
//         // console.log(data);

//         const expiredResponse = await axiosInstance_inventory.post(
//           "/expires",
//           data
//         );
//         console.log(expiredResponse.data.stocks);

//         setExpiredStocks(expiredResponse.data.stocks);
//       } catch (error) {
//         console.log(error);
//         setError("Failed to fetch expired stocks.");
//       } finally {
//         setExpiredLoading(false);
//       }
//     };

//     fetchExpiring();
//     fetchExpired();
//   }, []);

//   const handleCurrentPage = (pageNumber, table) => {
//     if (table === "expiring") {
//       setExpiringCurrentPage(pageNumber);
//     } else if (table === "expired") {
//       setExpiredCurrentPage(pageNumber);
//     }
//   };

//   const handleDelete = (stockId, table) => {
//     if (table === "expiring") {
//       console.log("Deleting stock ", stockId, " from table ", table);
//     } else if (table === "expired") {
//       console.log("Deleting stock ", stockId, " from table ", table);
//     }
//   };

//   // console.log(Math.ceil(expiringCount / pageSize));
//   // console.log(Math.ceil(expiredCount / pageSize));

//   return (
//     <div>
//       <div className=" pt-5">
//         <h2 className="text-lg font-poppins font-semibold">
//           Expiring Stocks Overview
//         </h2>
//       </div>
//       <div className=" lg:flex gap-5 pt-5">
//         <div className=" mb-5 md:w-full lg:w-1/2 border border-amber-400 bg-amber-100 rounded-lg overflow-hidden">
//           <Table
//             bordered
//             pagination={false}
//             size="small"
//             title={() => (
//               <Title level={4} style={{ color: "" }} className=" text-center">
//                 {/*set an appropriate Color*/}
//                 Expiring Stocks
//               </Title>
//             )}
//             loading={expiringLoading}
//             columns={columns}
//             dataSource={expiringStocks}
//             // style={{ width: "100%" }}
//           />
//           <Pagination
//             className=" py-5 justify-center"
//             defaultCurrent={1}
//             current={expiringCurrentPage}
//             pageSize={pageSize}
//             // total={expiringCount}
//             onChange={(page) => handleCurrentPage(page, "expiring")}
//           />
//         </div>
//         <div className=" mb-5 md:w-full lg:w-1/2 border border-danger-400 bg-danger-100 rounded-lg overflow-hidden">
//           <Table
//             bordered
//             pagination={false}
//             size="small"
//             title={() => (
//               <Title level={4} style={{ color: "" }} className=" text-center">
//                 {/*set an appropriate Color*/}
//                 Expired Stocks
//               </Title>
//             )}
//             loading={expiredLoading}
//             columns={columns}
//             dataSource={expiredStocks}
//             // style={{ width: "100%" }}
//           />
//           <Pagination
//             className=" py-5 justify-center"
//             defaultCurrent={1}
//             current={expiredCurrentPage}
//             pageSize={pageSize}
//             // total={expiringCount}
//             onChange={(page) => handleCurrentPage(page, "expired")}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExpiringOverview;

import React, { useState } from "react";
import { Typography } from "antd";
import ExpiringStocksTable from "./ExpiringStocksTable";
import ExpiredStocksTable from "./ExpiredStocksTable";

const { Title } = Typography;

const ExpiringOverview = () => {
  const pageSize = 5;
  const [expiringCurrentPage, setExpiringCurrentPage] = useState(1);
  const [expiredCurrentPage, setExpiredCurrentPage] = useState(1);

  return (
    <div>
      <div className="pt-5">
        <h2 className="text-lg font-poppins font-semibold">
          Expiring Stocks Overview
        </h2>
      </div>
      <div className="lg:flex gap-5 pt-5">
        <ExpiringStocksTable
          currentPage={expiringCurrentPage}
          setCurrentPage={setExpiringCurrentPage}
          pageSize={pageSize}
        />
        <ExpiredStocksTable
          currentPage={expiredCurrentPage}
          setCurrentPage={setExpiredCurrentPage}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default ExpiringOverview;
