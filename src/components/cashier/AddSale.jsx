import { Button, Input, Space } from "antd";
import React, { useState } from "react";
import { ScanOutlined, SearchOutlined } from "@ant-design/icons";

const AddSale = (props) => {
  const [barcode, setBarcode] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = () => {
    const newEntry = {
      name: barcode,
      quantity: quantity,
      address: "Sample Address", // Sample address or replace it with actual data
      key: Date.now().toString(), // Unique key for each entry
    };

    // Pass an array of data objects to `props.setVariable`
    props.setVariable((prevData) => [...prevData, newEntry]);

    // Clear input fields after submission
    setBarcode("");
    setQuantity("");
  };

  // const handleSubmit = () => {
  //   console.log("Barcode:", barcode);
  //   console.log("Quantity:", quantity);
  //   // You can pass these values to a parent component or use them directly here
  //   props.setVariable({
  //     name: barcode,
  //     age: quantity,
  //     adress: "agfd",
  //     key: "1",
  //   });
  // };

  return (
    <div>
      <div>
        <div className="flex justify-between">
          <Space>
            <Space.Compact size="medium">
              <Input
                placeholder="Enter BarCode"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
              />
              <Input
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Space.Compact>
          </Space>
          <div className="px-5">
            <Button type="primary">
              <ScanOutlined />
              Scan Barcode
            </Button>
          </div>
        </div>
      </div>
      {/* <div className="mt-5">
        <Button type="primary">
          <ScanOutlined />
          Scan Barcode
        </Button>
      </div> */}
    </div>
  );
};

export default AddSale;
