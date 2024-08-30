import React, { useEffect, useState } from "react";
import HourGlass from "./HourGlass.jsx";
import { Space, Table, Tag } from "antd";
import axiosInstance from "../api/axiosConfig.js";

const { Column } = Table;

const ProductList = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsResponse = await axiosInstance.get(
          "http://localhost:3008/products"
        );
        setProducts(productsResponse.data);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
    <Table dataSource={products} rowKey={(product) => product.product_id}>
      <Column
        title="Product Name"
        dataIndex="product_name"
        key="product_name"
      />
      <Column title="Unit Weight" dataIndex="unit_weight" key="unit_weight" />
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

export default ProductList;
