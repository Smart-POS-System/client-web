import React, { useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Column } = Table;

const hardCodedStocks = [
  {
    stock_id: 1,
    barcode: "198457824",
    product_name: "Cheddar Cheese 100g",
    batch_no: 34,
    quantity: 24,
    exp: "2026-02-01",
  },
  {
    stock_id: 2,
    barcode: "198457825",
    product_name: "Mozzarella Cheese 200g",
    batch_no: 12,
    quantity: 30,
    exp: "2025-11-15",
  },
  {
    stock_id: 3,
    barcode: "198457826",
    product_name: "Parmesan Cheese 150g",
    batch_no: 45,
    quantity: 18,
    exp: "2026-05-20",
  },
  {
    stock_id: 4,
    barcode: "198457827",
    product_name: "Whole Wheat Bread",
    batch_no: 22,
    quantity: 50,
    exp: "2025-10-10",
  },
  {
    stock_id: 5,
    barcode: "198457828",
    product_name: "Organic Almond Milk 1L",
    batch_no: 11,
    quantity: 20,
    exp: "2026-03-01",
  },
  {
    stock_id: 6,
    barcode: "198457829",
    product_name: "Brown Rice 1kg",
    batch_no: 33,
    quantity: 15,
    exp: "2027-01-20",
  },
  {
    stock_id: 7,
    barcode: "198457830",
    product_name: "Olive Oil 500ml",
    batch_no: 27,
    quantity: 10,
    exp: "2025-12-30",
  },
  {
    stock_id: 8,
    barcode: "198457831",
    product_name: "Canned Tomatoes 400g",
    batch_no: 19,
    quantity: 40,
    exp: "2026-04-15",
  },
  {
    stock_id: 9,
    barcode: "198457832",
    product_name: "Pasta 500g",
    batch_no: 29,
    quantity: 35,
    exp: "2027-02-25",
  },
  {
    stock_id: 10,
    barcode: "198457833",
    product_name: "Peanut Butter 250g",
    batch_no: 14,
    quantity: 22,
    exp: "2026-06-10",
  },
  {
    stock_id: 11,
    barcode: "198457834",
    product_name: "Honey 500g",
    batch_no: 36,
    quantity: 12,
    exp: "2026-05-05",
  },
  {
    stock_id: 12,
    barcode: "198457835",
    product_name: "Granola Bars 6-pack",
    batch_no: 21,
    quantity: 18,
    exp: "2025-09-22",
  },
  {
    stock_id: 13,
    barcode: "198457836",
    product_name: "Frozen Spinach 400g",
    batch_no: 40,
    quantity: 25,
    exp: "2026-01-15",
  },
  {
    stock_id: 14,
    barcode: "198457837",
    product_name: "Chicken Breast 500g",
    batch_no: 30,
    quantity: 20,
    exp: "2025-10-30",
  },
  {
    stock_id: 15,
    barcode: "198457838",
    product_name: "Yogurt 150g",
    batch_no: 25,
    quantity: 28,
    exp: "2026-02-20",
  },
  {
    stock_id: 16,
    barcode: "198457839",
    product_name: "Apples 1kg",
    batch_no: 44,
    quantity: 15,
    exp: "2025-11-05",
  },
  {
    stock_id: 17,
    barcode: "198457840",
    product_name: "Bananas 1kg",
    batch_no: 32,
    quantity: 30,
    exp: "2025-09-15",
  },
  {
    stock_id: 18,
    barcode: "198457841",
    product_name: "Carrots 500g",
    batch_no: 39,
    quantity: 22,
    exp: "2025-10-20",
  },
  {
    stock_id: 19,
    barcode: "198457842",
    product_name: "Eggs 12-pack",
    batch_no: 15,
    quantity: 18,
    exp: "2025-08-30",
  },
  {
    stock_id: 20,
    barcode: "198457843",
    product_name: "Milk 1L",
    batch_no: 38,
    quantity: 25,
    exp: "2025-09-01",
  },
  {
    stock_id: 21,
    barcode: "198457844",
    product_name: "Sugar 1kg",
    batch_no: 23,
    quantity: 40,
    exp: "2026-07-15",
  },
  {
    stock_id: 22,
    barcode: "198457845",
    product_name: "Salt 500g",
    batch_no: 20,
    quantity: 50,
    exp: "2027-01-01",
  },
  {
    stock_id: 23,
    barcode: "198457846",
    product_name: "Black Pepper 100g",
    batch_no: 31,
    quantity: 35,
    exp: "2026-12-12",
  },
  {
    stock_id: 24,
    barcode: "198457847",
    product_name: "Cereal 500g",
    batch_no: 28,
    quantity: 20,
    exp: "2026-03-30",
  },
];

const StockList = (location_id, page_size, current_page) => {
  const [location, setLocation] = useState(1);
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState(hardCodedStocks);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalStocks, setTotalStocks] = useState();
  const [error, setError] = useState(null);

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

  // useEffect(() => {
  //   setLoading(true);
  //   fetchStocks();
  // }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   fetchStocks();
  // }, [currentPage]);

  const handleDelete = async (stock_id, quantity) => {
    // const data = { stockId: stock_id, qty: quantity };

    try {
      // const deleteResponse = await axiosInstance_inventory.put(
      //   "/removeStock",
      //   data
      // );
      const prevStocks = [...stocks];
      const updatedStocks = prevStocks.filter(
        (stock) => stock.stock_id !== stock_id
      );
      setStocks(updatedStocks);
    } catch (error) {
      setError(error);
    }
  };

  // const handleCurrentPage = async (page) => {
  //   setLoading(true);
  //   setCurrentPage(page);
  // };

  if (error) {
    return (
      <div className="text-blue-600 flex flex-col items-center font-poppins font-semibold text-xl bg-blue-100 border rounded-lg border-blue-200 p-4 text-center m-5">
        <img className="w-4/12 h-auto pt-5" src={"UserNotFound.png"} alt="😥" />
        <h2 className="p-2">{error.message}</h2>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold font-poppins mb-4 md:text-left text-center">
        <strong>All Stocks</strong>
      </h1>
      <div>
        <Table
          // pagination={false}
          pagination={true}
          pageSize={pageSize}
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
              </Popconfirm>
            )}
          />
        </Table>
        {/* <Pagination
          className=" py-5 justify-center"
          defaultCurrent={1}
          current={currentPage}
          pageSize={pageSize}
          total={totalStocks}
          onChange={(page) => handleCurrentPage(page)}
        /> */}
      </div>
    </div>
  );
};

export default StockList;
