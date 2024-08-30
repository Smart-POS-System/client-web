import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axiosInstance_product from "../../api/axiosConfig_Product";

const { Text } = Typography;

const SearchItem = (props) => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [billItems, setBillItems] = useState([]);

  const handleSearch = () => {
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleLoad = async () => {
    try {
      const response = await axiosInstance_product.get("/items");
      const productsData = response.data.map((item, index) => ({
        key: item.item_id,
        name: item.product.product_name,
        price: parseFloat(item.selling_price),
        quantity: 1, // default quantity
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

  useEffect(() => {
    handleLoad();
  }, []);

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
