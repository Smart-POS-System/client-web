// // // import React, { useEffect, useState } from "react";
// // // import { Table, Input, Button, Space, Typography } from "antd";
// // // import { SearchOutlined } from "@ant-design/icons";
// // // import axiosInstance_product from "../../api/axiosConfig_Product";

// // // const { Text } = Typography;

// // // const SearchItem = (props) => {
// // //   const [products, setProducts] = useState([]);
// // //   const [searchText, setSearchText] = useState("");
// // //   const [filteredData, setFilteredData] = useState([]);
// // //   const [billItems, setBillItems] = useState([]);

// // //   const handleSearch = () => {
// // //     const filtered = products.filter((item) =>
// // //       item.name.toLowerCase().includes(searchText.toLowerCase())
// // //     );
// // //     setFilteredData(filtered);
// // //   };

// // //   const handleLoad = async () => {
// // //     try {
// // //       const response = await axiosInstance_product.get("/items");
// // //       const productsData = response.data.map((item, index) => ({
// // //         key: item.item_id,
// // //         name: item.product.product_name,
// // //         price: parseFloat(item.selling_price),
// // //         quantity: 1, // default quantity
// // //       }));
// // //       setProducts(productsData);
// // //       setFilteredData(productsData);
// // //     } catch (error) {
// // //       console.error("Error during data fetch from product service:", error);
// // //     }
// // //   };

// // //   const handleReset = () => {
// // //     setSearchText("");
// // //     setFilteredData(products);
// // //   };

// // //   const handleQuantityChange = (value, key) => {
// // //     const updatedData = filteredData.map((item) => {
// // //       if (item.key === key) {
// // //         return { ...item, quantity: value };
// // //       }
// // //       return item;
// // //     });
// // //     setFilteredData(updatedData);
// // //   };

// // //   const handleSubmit = (item) => {
// // //     const newEntry = {
// // //       ...item,
// // //       quantity: item.quantity || 1, // Default to 1 if no quantity specified
// // //     };

// // //     // Pass the updated items array to `props.setVariable`
// // //     props.setVariable((prevData) => [...prevData, newEntry]);
// // //   };

// // //   const columns = [
// // //     {
// // //       title: "Item Name",
// // //       dataIndex: "name",
// // //       key: "name",
// // //     },
// // //     {
// // //       title: "Price",
// // //       dataIndex: "price",
// // //       key: "price",
// // //       render: (text) => <Text>${text}</Text>,
// // //     },
// // //     {
// // //       title: "Quantity",
// // //       key: "quantity",
// // //       render: (_, record) => (
// // //         <Input
// // //           type="number"
// // //           min={1}
// // //           value={record.quantity}
// // //           onChange={(e) =>
// // //             handleQuantityChange(parseInt(e.target.value, 10), record.key)
// // //           }
// // //           style={{ width: "60px" }}
// // //         />
// // //       ),
// // //     },
// // //     {
// // //       title: "Action",
// // //       key: "action",
// // //       render: (_, record) => (
// // //         <Button
// // //           type="primary"
// // //           onClick={() => handleSubmit(record)}
// // //           style={{ marginLeft: "10px" }}
// // //         >
// // //           Add to Bill
// // //         </Button>
// // //       ),
// // //     },
// // //   ];

// // //   useEffect(() => {
// // //     handleLoad();
// // //   }, []);

// // //   return (
// // //     <div>
// // //       <Space style={{ marginBottom: 16 }}>
// // //         <Input
// // //           placeholder="Search by item name"
// // //           value={searchText}
// // //           onChange={(e) => setSearchText(e.target.value)}
// // //           onPressEnter={handleSearch}
// // //           style={{ width: 200 }}
// // //         />
// // //         <Button type="primary" onClick={handleSearch} icon={<SearchOutlined />}>
// // //           Search
// // //         </Button>
// // //         <Button onClick={handleReset}>Reset</Button>
// // //       </Space>

// // //       <Table
// // //         columns={columns}
// // //         dataSource={filteredData}
// // //         pagination={{ pageSize: 20 }}
// // //         bordered
// // //         size="middle"
// // //         rowClassName={(record, index) =>
// // //           index % 2 === 0 ? "table-row-light" : "table-row-dark"
// // //         }
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default SearchItem;
// // import React from "react";
// // import { Card, List } from "antd";
// // import {
// //   EditOutlined,
// //   EllipsisOutlined,
// //   SettingOutlined,
// // } from "@ant-design/icons";
// // import { Avatar } from "antd";
// // const { Meta } = Card;
// // const data = [
// //   {
// //     title: "Title 1",
// //   },
// //   {
// //     title: "Title 2",
// //   },
// //   {
// //     title: "Title 3",
// //   },
// //   {
// //     title: "Title 4",
// //   },
// //   {
// //     title: "Title 5",
// //   },
// //   {
// //     title: "Title 6",
// //   },
// // ];
// // const SearchItem = () => (
// //   <List
// //     grid={{
// //       gutter: 16,
// //       xs: 1,
// //       sm: 1,
// //       md: 2,
// //       lg: 3,
// //       xl: 4,
// //       xxl: 3,
// //     }}
// //     dataSource={data}
// //     renderItem={(item) => (
// //       <List.Item>
// //         <Card
// //           //title={item.title}
// //           style={{
// //             width: 120,
// //           }}
// //           cover={
// //             <img
// //               alt="example"
// //               src="https://img.freepik.com/premium-photo/sports-shoes-model_1022967-7027.jpg?w=360"
// //             />
// //           }
// //           actions={[
// //             <SettingOutlined key="setting" />,
// //             <EditOutlined key="edit" />,
// //             <EllipsisOutlined key="ellipsis" />,
// //           ]}
// //         >
// //           Card content
// //         </Card>
// //       </List.Item>
// //     )}
// //   />
// // );
// // export default SearchItem;
// import React, { useEffect, useState } from "react";
// import { Card, List, Input, Button, Space, Col, Row } from "antd";
// import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
// import axiosInstance_product from "../../api/axiosConfig_Product";

// const SearchItem = (props) => {
//   const [products, setProducts] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [filteredData, setFilteredData] = useState([]);

//   const handleSearch = () => {
//     const filtered = products.filter((item) =>
//       item.name.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };

//   const handleLoad = async () => {
//     try {
//       const response = await axiosInstance_product.get("/items");
//       const productsData = response.data.map((item) => ({
//         key: item.item_id,
//         name: item.product.product_name,
//         price: parseFloat(item.selling_price),
//         quantity: 1, // Default quantity
//         imageUrl:
//           //"https://img.freepik.com/premium-photo/sports-shoes-model_1022967-7027.jpg?w=360", // Placeholder image
//           "/shoe.png",
//       }));
//       setProducts(productsData);
//       setFilteredData(productsData);
//     } catch (error) {
//       console.error("Error during data fetch from product service:", error);
//     }
//   };

//   const handleReset = () => {
//     setSearchText("");
//     setFilteredData(products);
//   };

//   const handleQuantityChange = (value, key) => {
//     const updatedData = filteredData.map((item) => {
//       if (item.key === key) {
//         return { ...item, quantity: value };
//       }
//       return item;
//     });
//     setFilteredData(updatedData);
//   };

//   const handleSubmit = (item) => {
//     const newEntry = {
//       ...item,
//       quantity: item.quantity || 1, // Default to 1 if no quantity specified
//     };

//     // Pass the updated items array to `props.setVariable`
//     props.setVariable((prevData) => [...prevData, newEntry]);
//   };

//   useEffect(() => {
//     handleLoad();
//   }, []);

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

//       <List
//         grid={{
//           gutter: 24,
//           xs: 1,
//           sm: 1,
//           md: 2,
//           lg: 3,
//           xl: 5,
//           "1755-1600": 6,
//           xxl: 7,
//         }}
//         dataSource={filteredData}
//         renderItem={(item) => (
//           <List.Item>
//             <Card
//               // bodyStyle={{ padding: 10 }} // Remove padding from the card body
//               hoverable="true"
//               className="shadow-lg rounded-md overflow-hidden"
//               style={{ width: 150 }} // Inline CSS for card width
//               cover={
//                 <img
//                   alt={item.name}
//                   src={item.imageUrl}
//                   className="h-30 object-cover w-30" // Tailwind for image
//                 />
//               }
//             >
//               {/* <Card.Meta title={item.name} description={`$${item.price}`} /> */}

//               {/* Quantity Selector */}
//               {/* <Space direction="vertical" style={{ marginTop: 8 }}>
//                 <Input
//                   type="number"
//                   min={1}
//                   value={item.quantity}
//                   onChange={(e) =>
//                     handleQuantityChange(parseInt(e.target.value, 10), item.key)
//                   }
//                   style={{ width: 60 }}
//                 /> */}

//               {/* Add to Bill Button */}
//               {/* <Button type="primary" onClick={() => handleSubmit(item)}>
//                   Add to Bill
//                 </Button>
//               </Space> */}

//               <div className="p-2">
//                 <h3 className="text-lg font-semibold text-gray-700 truncate">
//                   {item.name}
//                 </h3>
//                 <p className="text-blue-500 text-xl font-bold">${item.price}</p>
//               </div>
//               <div className="flex justify-between p-2 m-">
//                 <Input
//                   type="number"
//                   min={1}
//                   value={item.quantity}
//                   onChange={(e) =>
//                     handleQuantityChange(parseInt(e.target.value, 10), item.key)
//                   }
//                   style={{ width: 60 }}
//                 />
//                 <Button
//                   onClick={() => handleSubmit(item)}
//                   type="primary"
//                   icon={<PlusOutlined />}
//                   className="w-full mt-2 rounded-xl"
//                 ></Button>
//               </div>
//             </Card>
//           </List.Item>
//         )}
//       />
//     </div>
//   );
// };

// export default SearchItem;
// import React, { useEffect, useState } from "react";
// import { Card, Input, Button, Row, Col, Space } from "antd";
// import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
// import axiosInstance_product from "../../api/axiosConfig_Product";

// const SearchItem = (props) => {
//   const [products, setProducts] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [filteredData, setFilteredData] = useState([]);

//   const handleSearch = () => {
//     const filtered = products.filter((item) =>
//       item.name.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };

//   const handleLoad = async () => {
//     try {
//       const response = await axiosInstance_product.get("/items");
//       const productsData = response.data.map((item) => ({
//         key: item.item_id,
//         name: item.product.product_name,
//         price: parseFloat(item.selling_price),
//         quantity: 1, // Default quantity
//         imageUrl: "/shoe.png", // Default placeholder
//       }));
//       setProducts(productsData);
//       setFilteredData(productsData);
//     } catch (error) {
//       console.error("Error during data fetch from product service:", error);
//     }
//   };

//   const handleReset = () => {
//     setSearchText("");
//     setFilteredData(products);
//   };

//   const handleQuantityChange = (value, key) => {
//     const updatedData = filteredData.map((item) => {
//       if (item.key === key) {
//         return { ...item, quantity: value };
//       }
//       return item;
//     });
//     setFilteredData(updatedData);
//   };

//   const handleSubmit = (item) => {
//     const newEntry = {
//       ...item,
//       quantity: item.quantity || 1, // Default to 1 if no quantity specified
//     };

//     props.setVariable((prevData) => [...prevData, newEntry]);
//   };

//   useEffect(() => {
//     handleLoad();
//   }, []);

//   return (
//     <div style={{}}>
//       {/* Search bar section */}
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

//       {/* Responsive grid layout */}
//       <Row gutter={[16, 16]}>
//         {filteredData.map((item) => (
//           <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={4} key={item.key}>
//             <Card
//               hoverable
//               className="shadow-lg rounded-md"
//               cover={
//                 <img
//                   alt={item.name}
//                   src={item.imageUrl}
//                   style={{ height: "150px", objectFit: "cover" }}
//                 />
//               }
//             >
//               <div className="p-2">
//                 <h3 className="text-lg font-semibold text-gray-700 truncate">
//                   {item.name}
//                 </h3>
//                 <p className="text-blue-500 text-xl font-bold">${item.price}</p>
//               </div>
//               <div className="flex justify-between p-2">
//                 <Input
//                   type="number"
//                   min={1}
//                   value={item.quantity}
//                   onChange={(e) =>
//                     handleQuantityChange(parseInt(e.target.value, 10), item.key)
//                   }
//                   style={{ width: 60 }}
//                 />
//                 <Button
//                   onClick={() => handleSubmit(item)}
//                   type="primary"
//                   icon={<PlusOutlined />}
//                   className="w-full mt-2 rounded-xl"
//                 />
//               </div>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default SearchItem;
import React, { useEffect, useState } from "react";
import { Card, Input, Button, Row, Col, Space, Pagination } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import axiosInstance_product from "../../api/axiosConfig_Product";
import { useTranslation } from "react-i18next";

const SearchItem = (props) => {
  const { t } = useTranslation(["cashier"]);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(18); // Default page size

  const imageUrls = [
    "/items/26.png", // Replace with your actual image URLs
    "/items/27.png",
    "/items/28.png",
    "/items/29.png",
    "/items/30.png",
    "/items/31.png", // Replace with your actual image URLs

    "/items/34.png",
    "/items/35.png",
    "/items/36.png",
    "/items/37.png",
    "/items/38.png",
  ];

  const handleSearch = () => {
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page on new search
  };

  //delete this fuction after backend integration
  function getRandomNumber(max) {
    return Math.floor(Math.random() * (max + 1)); // Generates a number between 0 and max (inclusive)
  }

  const handleLoad = async () => {
    try {
      const response = await axiosInstance_product.get("/items");
      const productsData = response.data.map((item) => ({
        key: item.item_id,
        name: item.product.product_name,
        price: parseFloat(item.selling_price),
        quantity: 1, // Default quantity
        imageUrl: imageUrls[getRandomNumber(10)], // Default placeholder
        // imageUrl: "/shoe.png", // Default placeholder
      }));
      setProducts(productsData);
      setFilteredData(productsData);
    } catch (error) {
      console.error("Error during data fetch from product service:", error);
    }
  };

  const handleReset = () => {
    setSearchText("");
    setFilteredData(products);
    setCurrentPage(1); // Reset to first page on reset
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

    props.setVariable((prevData) => [...prevData, newEntry]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  // Calculate current page data
  const currentData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      {/* Search bar section */}
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder={t("search_items.searchPlaceholder")}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onPressEnter={handleSearch}
          style={{ width: 200 }}
        />
        <Button type="primary" onClick={handleSearch} icon={<SearchOutlined />}>
          {t("search_items.searchButton")}
        </Button>
        <Button onClick={handleReset}>{t("search_items.resetButton")}</Button>
      </Space>

      {/* Responsive grid layout */}
      <Row gutter={[16, 16]}>
        {currentData.map((item) => (
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={4} key={item.key}>
            <Card
              hoverable
              className="shadow-lg rounded-md"
              cover={
                <img
                  alt={item.name}
                  src={item.imageUrl}
                  style={{ height: "150px", objectFit: "cover" }}
                />
              }
              bodyStyle={{ padding: "20px" }} // Set padding to 0
            >
              <div className="p-2">
                <h3 className="text-lg font-semibold text-gray-700 truncate">
                  {item.name}
                </h3>
                <p className="text-blue-500 text-xl font-bold">${item.price}</p>
              </div>
              <div className="flex justify-between p-2">
                <Input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value, 10), item.key)
                  }
                  style={{ width: 60 }}
                />
                <Button
                  onClick={() => handleSubmit(item)}
                  type="primary"
                  icon={<PlusOutlined />}
                  className="w-full mt-2 rounded-xl"
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination Component */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredData.length}
        onChange={handlePageChange}
        style={{ marginTop: 16, textAlign: "center" }}
      />
    </div>
  );
};

export default SearchItem;
