// // import React, { useState } from "react";
// // import { Table, Input, Button, Space, Form } from "antd";
// // import { SearchOutlined } from "@ant-design/icons";

// // //call the db for the items
// // const data = [
// //   // Replace with your store items data
// //   { key: 1, name: "Item 1", age: 100, adress: 1 },
// //   { key: 2, name: "Item 2", age: 200, adress: 1 },
// //   { key: 3, name: "Item 3", age: 150, adress: 1 },
// //   // Add more items
// // ];

// // const SearchItem = (props) => {
// //   const [searchText, setSearchText] = useState("");
// //   const [searchedColumn, setSearchedColumn] = useState("");
// //   const [billItems, setBillItems] = useState([]);
// //   const [barcode, setBarcode] = useState("");
// //   const [quantity, setQuantity] = useState("");

// //   const handleSubmit = () => {
// //     const newEntry = {
// //       name: barcode,
// //       age: quantity,
// //       address: "Sample Address", // Sample address or replace it with actual data
// //       key: Date.now().toString(), // Unique key for each entry
// //     };

// //     // Pass an array of data objects to `props.setVariable`
// //     props.setVariable((prevData) => [...prevData, newEntry]);

// //     // Clear input fields after submission
// //     setBarcode("");
// //     setQuantity("");
// //   };

// //   const handleSearch = (selectedKeys, confirm, dataIndex) => {
// //     confirm();
// //     setSearchText(selectedKeys[0]);
// //     setSearchedColumn(dataIndex);
// //   };

// //   const handleReset = (clearFilters) => {
// //     clearFilters();
// //     setSearchText("");
// //   };

// //   const handleAddToBill = (item, quantity) => {
// //     const updatedItem = { ...item, quantity };
// //     setBillItems([...billItems, updatedItem]);
// //   };

// //   const getColumnSearchProps = (dataIndex) => ({
// //     filterDropdown: ({
// //       setSelectedKeys,
// //       selectedKeys,
// //       confirm,
// //       clearFilters,
// //     }) => (
// //       <div style={{ padding: 8 }}>
// //         <Button
// //           onClick={() => handleReset(clearFilters)}
// //           size="small"
// //           style={{ width: 90 }}
// //         >
// //           Reset
// //         </Button>
// //         <Input
// //           placeholder={`Search ${dataIndex}`}
// //           value={selectedKeys[0]}
// //           onChange={(e) =>
// //             setSelectedKeys(e.target.value ? [e.target.value] : [])
// //           }
// //           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
// //           style={{ marginBottom: 8, display: "block" }}
// //         />
// //         <Space>
// //           <Button
// //             type="primary"
// //             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
// //             icon={<SearchOutlined />}
// //             size="small"
// //             style={{ width: 90 }}
// //           >
// //             Search
// //           </Button>
// //           <Button
// //             onClick={() => handleReset(clearFilters)}
// //             size="small"
// //             style={{ width: 90 }}
// //           >
// //             Reset
// //           </Button>
// //         </Space>
// //       </div>
// //     ),
// //     filterIcon: (filtered) => (
// //       <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
// //     ),
// //     onFilter: (value, record) =>
// //       record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
// //     render: (text) =>
// //       searchedColumn === dataIndex ? <span>{text}</span> : text,
// //   });

// //   const columns = [
// //     {
// //       title: "Item Name",
// //       dataIndex: "name",
// //       key: "name",
// //       ...getColumnSearchProps("name"),
// //     },
// //     {
// //       title: "Age",
// //       dataIndex: "age",
// //       key: "age",
// //     },
// //     {
// //       title: "Adress",
// //       key: "adress",
// //       render: (_, record) => (
// //         <Input
// //           type="number"
// //           min={1}
// //           defaultValue={1}
// //           onChange={(e) => handleAddToBill(record, e.target.value)}
// //         />
// //       ),
// //     },
// //     {
// //       title: "Action",
// //       key: "action",
// //       render: (_, record) => (
// //         <Button
// //           type="primary"
// //           onClick={handleSubmit}
// //           // onClick={() => handleAddToBill(record, record.quantity)}
// //         >
// //           Add to Bill
// //         </Button>
// //       ),
// //     },
// //   ];

// //   return (
// //     <>
// //       <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
// //       {/* Render bill items if needed */}
// //     </>
// //   );
// // };

// // export default SearchItem;
// // import React, { useState } from "react";
// // import { Table, Input, Button, Space, Typography, Form } from "antd";
// // import { SearchOutlined } from "@ant-design/icons";

// // const { Text } = Typography;

// // // Sample data to simulate fetching from the database
// // const data = [
// //   { key: 1, name: "Item 1", price: 100, quantity: 1 },
// //   { key: 2, name: "Item 2", price: 200, quantity: 1 },
// //   { key: 3, name: "Item 3", price: 150, quantity: 1 },
// //   // Add more items
// // ];

// // const SearchItem = (props) => {
// //   const [searchText, setSearchText] = useState("");
// //   const [searchedColumn, setSearchedColumn] = useState("");
// //   const [billItems, setBillItems] = useState([]);

// //   const handleSubmit = (item) => {
// //     const newEntry = {
// //       ...item,
// //       quantity: item.quantity || 1, // Default to 1 if no quantity specified
// //     };

// //     // Pass the updated items array to `props.setVariable`
// //     props.setVariable((prevData) => [...prevData, newEntry]);

// //     // Clear input fields after submission (if using controlled inputs)
// //   };

// //   const handleSearch = (selectedKeys, confirm, dataIndex) => {
// //     confirm();
// //     setSearchText(selectedKeys[0]);
// //     setSearchedColumn(dataIndex);
// //   };

// //   const handleReset = (clearFilters) => {
// //     clearFilters();
// //     setSearchText("");
// //   };

// //   const getColumnSearchProps = (dataIndex) => ({
// //     filterDropdown: ({
// //       setSelectedKeys,
// //       selectedKeys,
// //       confirm,
// //       clearFilters,
// //     }) => (
// //       <div style={{ padding: 8 }}>
// //         <Input
// //           placeholder={`Search ${dataIndex}`}
// //           value={selectedKeys[0]}
// //           onChange={(e) =>
// //             setSelectedKeys(e.target.value ? [e.target.value] : [])
// //           }
// //           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
// //           style={{ marginBottom: 8, display: "block" }}
// //         />
// //         <Space>
// //           <Button
// //             type="primary"
// //             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
// //             icon={<SearchOutlined />}
// //             size="small"
// //             style={{ width: 90 }}
// //           >
// //             Search
// //           </Button>
// //           <Button
// //             onClick={() => handleReset(clearFilters)}
// //             size="small"
// //             style={{ width: 90 }}
// //           >
// //             Reset
// //           </Button>
// //         </Space>
// //       </div>
// //     ),
// //     filterIcon: (filtered) => (
// //       <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
// //     ),
// //     onFilter: (value, record) =>
// //       record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
// //     render: (text) =>
// //       searchedColumn === dataIndex ? (
// //         <Text mark>{text}</Text>
// //       ) : (
// //         <Text>{text}</Text>
// //       ),
// //   });

// //   const columns = [
// //     {
// //       title: "Item Name",
// //       dataIndex: "name",
// //       key: "name",
// //       ...getColumnSearchProps("name"),
// //     },
// //     {
// //       title: "Price",
// //       dataIndex: "price",
// //       key: "price",
// //       render: (text) => <Text>${text}</Text>,
// //     },
// //     {
// //       title: "Quantity",
// //       key: "quantity",
// //       render: (_, record) => (
// //         <Input
// //           type="number"
// //           min={1}
// //           defaultValue={record.quantity}
// //           onChange={(e) => {
// //             const newQuantity = parseInt(e.target.value, 10);
// //             const updatedItem = { ...record, quantity: newQuantity };
// //             setBillItems((prevItems) =>
// //               prevItems.map((item) =>
// //                 item.key === record.key ? updatedItem : item
// //               )
// //             );
// //           }}
// //           style={{ width: "60px" }}
// //         />
// //       ),
// //     },
// //     {
// //       title: "Action",
// //       key: "action",
// //       render: (_, record) => (
// //         <Button
// //           type="primary"
// //           onClick={() => handleSubmit(record)}
// //           style={{ marginLeft: "10px" }}
// //         >
// //           Add to Bill
// //         </Button>
// //       ),
// //     },
// //   ];

// //   return (
// //     <>
// //       <Table
// //         columns={columns}
// //         dataSource={data}
// //         pagination={{ pageSize: 5 }}
// //         bordered
// //         size="middle"
// //         rowClassName={(record, index) =>
// //           index % 2 === 0 ? "table-row-light" : "table-row-dark"
// //         }
// //       />
// //     </>
// //   );
// // };

// // export default SearchItem;

// import React, { useState } from "react";
// import { Table, Input, Button, Space, Typography, Form } from "antd";
// import { SearchOutlined } from "@ant-design/icons";

// const { Text } = Typography;

// // Sample data to simulate fetching from the database
// const initialData = [
//   { key: 1, name: "Item 1", price: 100, quantity: 1 },
//   { key: 2, name: "Item 2", price: 200, quantity: 1 },
//   { key: 3, name: "Item 3", price: 150, quantity: 1 },
//   // Add more items
// ];

// const SearchItem = (props) => {
//   const [searchText, setSearchText] = useState("");
//   const [filteredData, setFilteredData] = useState(initialData);
//   const [billItems, setBillItems] = useState([]);

//   const handleSearch = () => {
//     const filtered = initialData.filter((item) =>
//       item.name.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };

//   const handleReset = () => {
//     setSearchText("");
//     setFilteredData(initialData);
//   };

//   const handleSubmit = (item) => {
//     const newEntry = {
//       ...item,
//       quantity: item.quantity || 1, // Default to 1 if no quantity specified
//     };

//     // Pass the updated items array to `props.setVariable`
//     props.setVariable((prevData) => [...prevData, newEntry]);
//   };

//   const columns = [
//     {
//       title: "Item Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Price",
//       dataIndex: "price",
//       key: "price",
//       render: (text) => <Text>${text}</Text>,
//     },
//     {
//       title: "Quantity",
//       key: "quantity",
//       render: (_, record) => (
//         <Input
//           type="number"
//           min={1}
//           defaultValue={record.quantity}
//           onChange={(e) => {
//             const newQuantity = parseInt(e.target.value, 10);
//             const updatedItem = { ...record, quantity: newQuantity };
//             setBillItems((prevItems) =>
//               prevItems.map((item) =>
//                 item.key === record.key ? updatedItem : item
//               )
//             );
//           }}
//           style={{ width: "60px" }}
//         />
//       ),
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Button
//           type="primary"
//           onClick={() => handleSubmit(record)}
//           style={{ marginLeft: "10px" }}
//         >
//           Add to Bill
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Space style={{ marginBottom: 16 }}>
//         <Input
//           placeholder="Search by item name"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           onPressEnter={handleSearch}
//           style={{ width: 200 }}
//         />
//         <Button type="primary" onClick={handleSearch} icon={<SearchOutlined />}>
//           Search
//         </Button>
//         <Button onClick={handleReset}>Reset</Button>
//       </Space>

//       <Table
//         columns={columns}
//         dataSource={filteredData}
//         pagination={{ pageSize: 5 }}
//         bordered
//         size="middle"
//         rowClassName={(record, index) =>
//           index % 2 === 0 ? "table-row-light" : "table-row-dark"
//         }
//       />
//     </div>
//   );
// };

// export default SearchItem;
import React, { useState } from "react";
import { Table, Input, Button, Space, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Text } = Typography;

// Sample data to simulate fetching from the database
const initialData = [
  { key: 1, name: "Item 1", price: 100, quantity: 1 },
  { key: 2, name: "Item 2", price: 200, quantity: 1 },
  { key: 3, name: "Item 3", price: 150, quantity: 1 },
  // Add more items
];

const SearchItem = (props) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(initialData);
  const [billItems, setBillItems] = useState([]);

  const handleSearch = () => {
    const filtered = initialData.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setSearchText("");
    setFilteredData(initialData);
  };

  const handleQuantityChange = (value, key) => {
    const updatedData = filteredData.map((item) => {
      if (item.key === key) {
        return { ...item, quantity: value };
      }
      return item;
    });
    setFilteredData(updatedData);
  };

  const handleSubmit = (item) => {
    const newEntry = {
      ...item,
      quantity: item.quantity || 1, // Default to 1 if no quantity specified
    };

    // Pass the updated items array to `props.setVariable`
    props.setVariable((prevData) => [...prevData, newEntry]);
  };

  const columns = [
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <Text>${text}</Text>,
    },
    {
      title: "Quantity",
      key: "quantity",
      render: (_, record) => (
        <Input
          type="number"
          min={1}
          value={record.quantity}
          onChange={(e) =>
            handleQuantityChange(parseInt(e.target.value, 10), record.key)
          }
          style={{ width: "60px" }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleSubmit(record)}
          style={{ marginLeft: "10px" }}
        >
          Add to Bill
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by item name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onPressEnter={handleSearch}
          style={{ width: 200 }}
        />
        <Button type="primary" onClick={handleSearch} icon={<SearchOutlined />}>
          Search
        </Button>
        <Button onClick={handleReset}>Reset</Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        bordered
        size="middle"
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
      />
    </div>
  );
};

export default SearchItem;
