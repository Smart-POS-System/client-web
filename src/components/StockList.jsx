import React, { useEffect, useState } from "react";
import HourGlass from "./HourGlass.jsx";
import { Space, Table, Button, Popconfirm, Pagination } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { axiosInstance_inventory } from "../api/axiosConfig_Inventory";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const { Column } = Table;

const StockList = (location_id, page_size, current_page) => {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [location, setLocation] = useState(1);
  const [loading, setLoading] = useState(true);
  const [stocks, setStocks] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalStocks, setTotalStocks] = useState();
  const [error, setError] = useState(null);

  const fetchStocks = async () => {
    const data = {
      location_id: location,
      page_size: pageSize,
      current_page: currentPage,
    };
    try {
      const stocksResponse = await axiosInstance_inventory.post(
        "/stocks",
        data
      );

      setStocks(stocksResponse.data.stocks);
      setTotalStocks(stocksResponse.data.stockCount);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchStocks();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchStocks();
  }, [currentPage]);

  const handleDelete = async (stock_id, quantity) => {
    const data = { stockId: stock_id, qty: quantity };

    try {
      const deleteResponse = await axiosInstance_inventory.put(
        "/removeStock",
        data
      );
      const prevStocks = [...stocks];
      const updatedStocks = prevStocks.filter(
        (stock) => stock.stock_id !== stock_id
      );
      setStocks(updatedStocks);
      console.log(deleteResponse.data);
    } catch (error) {
      setError(error);
    }
  };

  const handleCurrentPage = async (page) => {
    setLoading(true);
    setCurrentPage(page);
    // const fetchStocks = async () => {
    //   const data = {
    //     location_id: location,
    //     page_size: pageSize,
    //     current_page: currentPage,
    //   };
    //   try {
    //     const stocksResponse = await axiosInstance_inventory.post(
    //       "/stocks",
    //       data
    //     );

    //     setStocks(stocksResponse.data.stocks);
    //     setTotalStocks(stocksResponse.data.stockCount);
    //   } catch (error) {
    //     setError(error);
    //     console.log(error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchStocks();
  };

  if (error) {
    return (
      <div className="text-blue-600 flex flex-col items-center font-poppins font-semibold text-xl bg-blue-100 border rounded-lg border-blue-200 p-4 text-center m-5">
        <img className="w-4/12 h-auto pt-5" src={"UserNotFound.png"} alt="😥" />
        <h2 className="p-2">{error.message}</h2>
      </div>
    );
  }

  // const filterName = searchParams.get("name");
  // const filteredProducts = filterName
  //   ? products.filter((product) =>
  //       product?.product_name?.toLowerCase().includes(filterName.toLowerCase())
  //     )
  //   : products;

  return (
    <div>
      <div className=" pt-5">
        <h2 className="text-lg font-poppins font-semibold">Available Stocks</h2>
      </div>
      <div className=" pt-5">
        <Table
          pagination={false}
          dataSource={stocks}
          rowKey={(stock) => stock?.stock_id}
          loading={loading}
        >
          <Column title="Barcode" dataIndex="barcode" key="barcode" />
          <Column
            title="Product Name"
            dataIndex="product_name"
            key="product_name"
          />
          <Column title="Batch No." dataIndex="batch_no" key="batch_no" />
          <Column
            title="Quantity"
            width={"15%"}
            dataIndex="quantity"
            key="quantity"
          />
          <Column title="Expiry Date" dataIndex="exp" key="exp" />
          <Column
            title="Remove Stock"
            key="action"
            width={"10%"}
            render={(stock) => (
              <Popconfirm
                title="Are you sure to delete this stock?"
                onConfirm={() => handleDelete(stock.stock_id, stock.quantity)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" danger>
                  <DeleteOutlined />
                </Button>
                {/* <a className="hover:text-white font-semibold">Delete</a> */}
              </Popconfirm>
            )}
          />
        </Table>
        <Pagination
          className=" py-5 justify-center"
          defaultCurrent={1}
          current={currentPage}
          pageSize={pageSize}
          total={totalStocks}
          // onChange={(page) => setCurrentPage(page)}
          onChange={(page) => handleCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default StockList;
