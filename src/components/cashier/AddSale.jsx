import { Button, Image, Input, Modal, Space } from "antd";
import React, { useState } from "react";
import { ScanOutlined, SearchOutlined } from "@ant-design/icons";

const AddSale = (props) => {
  const [barcode, setBarcode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
        <div className="xl:flex block xl:justify-between ">
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
          <div className=" flex xl:justify-end pt-4 xl:pt-0 ">
            <Button type="primary" onClick={showModal}>
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
      {/* <Modal
        // title="Scan the Barcode"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="flex justify-center p-12"
      >
        <div className="flex justify-center px-24 text-lg  font-semibold">
          <h2 className="text-xl  font-semibold">Scan the Barcode</h2>
        </div>
        <div className="flex justify-center">
          <Image
            src={"/barcode-read.gif"} // Ensure this is the correct path to your image
            alt="Rotating Graph"
            width="200px"
            className="flex justify-center"
            // style={imageStyles}
          ></Image>
        </div>
        
      </Modal> */}
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        className="flex justify-center p-12"
        footer={[
          <Button
            key="cancel"
            onClick={handleCancel}
            className="mx-auto bg-red-500 text-white"
          >
            Cancel
          </Button>,
          <Button
            key="done"
            onClick={handleOk}
            className="mx-auto bg-green-500 text-white"
          >
            Done
          </Button>,
        ]}
      >
        <div className="flex justify-center px-24 text-lg font-semibold">
          <h2 className="text-xl font-semibold">Scan the Barcode</h2>
        </div>
        <div className="flex justify-center">
          <img
            src={"/barcode-read.gif"} // Ensure this is the correct path to your image
            alt="Rotating Graph"
            width="200px"
            className="flex justify-center"
          />
        </div>
      </Modal>
    </div>
  );
};

export default AddSale;
