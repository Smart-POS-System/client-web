// import React from "react";
// import { Divider, Table } from "antd";
// import PopUp from "./PopUpModel";
// import Stash from "./StashBill";
// const columns = [
//   {
//     title: "Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Age",
//     dataIndex: "age",
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//   },
// ];

// const Bill = (props) => (
//   <>
//     <div className="p-0">
//       <Divider>Order Details</Divider>
//     </div>
//     <Table columns={columns} dataSource={props.value} size="middle" />
//     <div> </div>
//     <div className="flex justify-center">
//       <div className="mx-3">
//         <Stash />
//       </div>
//     </div>
//   </>
// );
// export default Bill;
import React from "react";
import { Divider, Table, Typography } from "antd";
import PopUp from "./PopUpModel";
import Stash from "./StashBill";

const { Title, Text } = Typography;

const columns = [
  {
    title: "Item Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <Text strong>{text}</Text>,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    render: (text) => <Text>{text}</Text>,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (text) => <Text>${text}</Text>,
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",

    render: (text, record) => (
      <Text style={{ textAlign: "right", display: "block" }}>
        {/* ${record.price} × {record.quantity} = */}$
        {record.price * record.quantity}
      </Text>
    ),
  },
];

// const calculateGrandTotal = (data) => {
//   return data.reduce((total, item) => total + item.price * item.quantity, 0);
// };

const Bill = ({ value, sum }) => {
  // const grandTotal = calculateGrandTotal(value);
  console.log(value);
  return (
    <>
      <Divider
        orientation="center"
        style={{ fontSize: "18px", margin: "16px 0" }}
      >
        Order Details
      </Divider>

      <Table
        columns={columns}
        dataSource={value}
        pagination={false} // Disable pagination
        size="middle"
        bordered
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell colSpan={3} align="right">
              <Title level={4} style={{ margin: 0 }}>
                Grand Total:
              </Title>
            </Table.Summary.Cell>
            <Table.Summary.Cell align="center">
              <Title level={4} style={{ margin: 0 }}>
                {sum.toFixed(2)}
              </Title>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />

      {/* <div className="flex justify-center" style={{ marginTop: "24px" }}>
        <Stash />
      </div> */}
    </>
  );
};

export default Bill;
