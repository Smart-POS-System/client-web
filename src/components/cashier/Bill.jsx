// // import React from "react";
// // import { Divider, Table } from "antd";
// // import PopUp from "./PopUpModel";
// // import Stash from "./StashBill";
// // const columns = [
// //   {
// //     title: "Name",
// //     dataIndex: "name",
// //   },
// //   {
// //     title: "Age",
// //     dataIndex: "age",
// //   },
// //   {
// //     title: "Address",
// //     dataIndex: "address",
// //   },
// // ];

// // const Bill = (props) => (
// //   <>
// //     <div className="p-0">
// //       <Divider>Order Details</Divider>
// //     </div>
// //     <Table columns={columns} dataSource={props.value} size="middle" />
// //     <div> </div>
// //     <div className="flex justify-center">
// //       <div className="mx-3">
// //         <Stash />
// //       </div>
// //     </div>
// //   </>
// // );
// // export default Bill;
// import React from "react";
// import { Divider, Table, Typography } from "antd";
// import PopUp from "./PopUpModel";
// import Stash from "./StashBill";

// const { Title, Text } = Typography;

// const columns = [
//   {
//     title: "Item Name",
//     dataIndex: "name",
//     key: "name",
//     render: (text) => <Text strong>{text}</Text>,
//   },
//   {
//     title: "Quantity",
//     dataIndex: "quantity",
//     key: "quantity",
//     render: (text) => <Text>{text}</Text>,
//   },
//   {
//     title: "Price",
//     dataIndex: "price",
//     key: "price",
//     render: (text) => <Text>${text}</Text>,
//   },
//   {
//     title: "Total",
//     dataIndex: "total",
//     key: "total",

//     render: (text, record) => (
//       <Text style={{ textAlign: "right", display: "block" }}>
//         {/* ${record.price} × {record.quantity} = */}$
//         {record.price * record.quantity}
//       </Text>
//     ),
//   },
// ];

// // const calculateGrandTotal = (data) => {
// //   return data.reduce((total, item) => total + item.price * item.quantity, 0);
// // };

// const Bill = ({ value, sum }) => {
//   // const grandTotal = calculateGrandTotal(value);
//   console.log(value);
//   return (
//     <>
//       <Divider
//         orientation="center"
//         style={{ fontSize: "18px", margin: "16px 0" }}
//       >
//         Order Details
//       </Divider>

//       <Table
//         columns={columns}
//         dataSource={value}
//         pagination={false} // Disable pagination
//         size="middle"
//         bordered
//         summary={() => (
//           <Table.Summary.Row>
//             <Table.Summary.Cell colSpan={3} align="right">
//               <Title level={4} style={{ margin: 0 }}>
//                 Grand Total:
//               </Title>
//             </Table.Summary.Cell>
//             <Table.Summary.Cell align="center">
//               <Title level={4} style={{ margin: 0 }}>
//                 {sum.toFixed(2)}
//               </Title>
//             </Table.Summary.Cell>
//           </Table.Summary.Row>
//         )}
//       />

//       {/* <div className="flex justify-center" style={{ marginTop: "24px" }}>
//         <Stash />
//       </div> */}
//     </>
//   );
// };

import React, { useEffect, useState } from "react";
import { Divider, Table, Typography, Button } from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  MinusOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Bill = ({ value, setValue }) => {
  const location = useLocation();
  const stashedBill = location.state?.stashedBill;
  const navigate = useNavigate();
  // Use effect to set value only once when component is loaded
  useEffect(() => {
    // If there is stashedBill in location, set it to the state
    console.log("stashed bill:", stashedBill);
    if (stashedBill) {
      setValue(stashedBill.items); // Set state to stashed bill items
    }

    // Now, clear the location state by navigating to the same route without state
    // This ensures that the location state is cleared on reload
    navigate("/dashboard", { replace: true });
  }, [stashedBill, navigate, setValue]);
  const { t } = useTranslation(["cashier"]); // Use the translation hook
  // Function to calculate total sum
  const calculateTotalBill = (items) => {
    return items?.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Increment quantity
  const incrementQuantity = (record) => {
    const updatedData = value.map((item) => {
      if (item.key === record.key) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setValue(updatedData);
  };

  // Decrement quantity (only allow if quantity > 1)
  const decrementQuantity = (record) => {
    const updatedData = value.map((item) => {
      if (item.key === record.key && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setValue(updatedData);
  };

  // Delete item
  const deleteItem = (record) => {
    const updatedData = value.filter((item) => item.key !== record.key);
    setValue(updatedData);
  };

  const columns = [
    {
      title: t("item_name"), // Use the translation hook for item name
      dataIndex: "product_name",
      key: "product_name",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: t("quantity"), // Use the translation hook for quantity
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            icon={<MinusOutlined />}
            size="small"
            className="rounded-full"
            onClick={() => decrementQuantity(record)}
            disabled={record.quantity <= 1} // Disable if quantity is 1
          />
          <Text style={{ margin: "0 8px" }}>{text}</Text>
          <Button
            icon={<PlusOutlined />}
            size="small"
            className="rounded-full"
            onClick={() => incrementQuantity(record)}
          />
        </div>
      ),
    },
    {
      title: t("price"), // Use the translation hook for price
      dataIndex: "price",
      key: "price",
      render: (text) => <Text>${text}</Text>,
    },
    {
      title: t("total"), // Use the translation hook for total
      dataIndex: "total",
      key: "total",
      render: (text, record) => (
        <Text style={{ textAlign: "right", display: "block" }}>
          ${record.price * record.quantity}
        </Text>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Button
          type="dashed"
          size="small"
          danger
          icon={<DeleteTwoTone twoToneColor="#FF0000" />}
          onClick={() => deleteItem(record)}
        ></Button>
      ),
    },
  ];

  // const sum = calculateTotalBill(value);
  console.log("Value : ", value);

  return (
    <>
      <Divider
        orientation="center"
        style={{ fontSize: "18px", margin: "16px 0" }}
      >
        {t("order_details")} {/* Translate "Order Details" */}
      </Divider>

      <Table
        columns={columns}
        dataSource={value}
        pagination={false}
        size="middle"
        bordered
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell colSpan={3} align="right">
              <Title level={4} style={{ margin: 0 }}>
                {t("grand_total")} {/* Translate "Grand Total" */}
              </Title>
            </Table.Summary.Cell>
            <Table.Summary.Cell colSpan={2} align="center">
              <Title level={4} style={{ margin: 0 }}>
                ${calculateTotalBill(value).toFixed(2)}{" "}
                {/* Keep the total as it is */}
              </Title>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    </>
  );
};

export default Bill;
