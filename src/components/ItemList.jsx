import React, { useEffect, useState } from "react";
import HourGlass from "./HourGlass.jsx";
import { Space, Table, Tag } from "antd";
import axiosInstance from "../api/axiosConfig.js";

const { Column } = Table;

const ItemList = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const itemsResponse = await axiosInstance.get(
          "http://localhost:3008/items"
        );

        // Sorting items by product_name
        const sortedItems = itemsResponse.data.sort((a, b) => {
          const nameA = a.product.product_name.toLowerCase();
          const nameB = b.product.product_name.toLowerCase();

          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });

        setItems(sortedItems);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);
  console.log(items);

  if (loading) {
    return <HourGlass />;
  }

  if (error) {
    return (
      <div className="text-blue-600 flex flex-col items-center font-poppins font-semibold text-xl bg-blue-100 border rounded-lg border-blue-200 p-4 text-center m-5">
        <img className="w-4/12 h-auto pt-5" src={"UserNotFound.png"} alt="😥" />
        <h2 className="p-2">{error}</h2>
      </div>
    );
  }

  return (
    <Table dataSource={items} rowKey={(item) => item.item_id}>
      <Column
        title="Product Name"
        render={(text, record) => record.product.product_name}
        key="product_name"
      />
      <Column title="Batch Number" dataIndex="batch_no" key="batch_no" />
      <Column
        title="Buying Price"
        dataIndex="buying_price"
        key="buying_price"
      />
      <Column
        title="Selling Price"
        dataIndex="selling_price"
        key="selling_price"
      />
      <Column title="Manufactured Date" dataIndex="mfd" key="mfd" />
      <Column title="Expiry Date" dataIndex="exp" key="exp" />
      <Column
        title="Action"
        key="action"
        render={(_) => (
          <Space size="middle">
            <a>Delete</a>
          </Space>
        )}
      />
    </Table>
  );
};

export default ItemList;
