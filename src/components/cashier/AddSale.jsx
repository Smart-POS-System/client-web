import { Button, Image, Input, Modal, Space } from "antd";
import React, { useState } from "react";
import { ScanOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const AddSale = (props) => {
  const { t } = useTranslation(["cashier"]);
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

  return (
    <div>
      <div>
        <div className="xl:flex block xl:justify-between ">
          <Space>
            <Space.Compact size="medium">
              <Input
                placeholder={t("add_sale.enter_barcode")}
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
              />
              <Input
                placeholder={t("add_sale.enter_quantity")}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Button type="primary" onClick={handleSubmit}>
                {t("add_sale.submit")}
              </Button>
            </Space.Compact>
          </Space>
          <div className="flex xl:justify-end pt-4 xl:pt-0 ">
            <Button type="primary" onClick={showModal}>
              <ScanOutlined />
              {t("add_sale.scan_barcode")}
            </Button>
          </div>
        </div>
      </div>
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
            {t("add_sale.cancel")}
          </Button>,
          <Button
            key="done"
            onClick={handleOk}
            className="mx-auto bg-green-500 text-white"
          >
            {t("add_sale.done")}
          </Button>,
        ]}
      >
        <div className="flex justify-center px-24 text-lg font-semibold">
          <h2 className="text-xl font-semibold">
            {t("add_sale.scan_barcode_modal_title")}
          </h2>
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
