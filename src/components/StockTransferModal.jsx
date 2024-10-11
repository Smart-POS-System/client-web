import { DownOutlined, SwapOutlined } from "@ant-design/icons";
import { Divider, Input, InputNumber, Modal, message } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const locations = [
  { location_id: "1", name: "Mirigama" },
  { location_id: "2", name: "Gampaha" },
  { location_id: "3", name: "Moratuwa" },
  { location_id: "4", name: "Piliyandala" },
];

const StockTransferModal = ({ transferStock, isVisible, onOk, onCancel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [transferQuantity, setTransferQuantity] = useState(0);

  useEffect(() => {
    setTransferQuantity(0);
  }, [isVisible]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOk = () => {
    // Validation for required fields
    if (!selectedLocation || transferQuantity <= 0) {
      toast.error("Sending location and Transfering Quantity are required.");
      return;
    }

    // Call the onOk function with the selected values
    onOk({
      selectedLocation,
      transferQuantity,
    });
    // Reset the state if needed
    setSelectedLocation(null);
    setTransferQuantity(0);
  };

  const handleLocationSelect = (location) => {
    console.log(location);
    setSelectedLocation(location.name);
    setIsOpen(false);
  };
  return (
    <Modal
      centered
      visible={isVisible}
      okText="Transfer"
      onOk={handleOk}
      onCancel={() => {
        onCancel();
        setSelectedLocation(null);
        setIsOpen(false);
      }}
    >
      <div>
        <p className=" font-semibold text-lg">
          Transfer Stocks <SwapOutlined />{" "}
        </p>
        <Divider />
        {transferStock && (
          <>
            <div className=" pb-2 flex justify-between">
              <p>Transfer: </p>
              <Input
                className=" w-2/3"
                value={transferStock.product_name}
                disabled
              />
            </div>
            <div className=" pb-2 flex justify-between">
              <p>Barcode: </p>
              <Input
                className=" w-2/3"
                value={transferStock.barcode}
                disabled
              />
            </div>
            <div className=" pb-2 flex justify-between">
              <p>From: </p>
              <Input
                className=" w-2/3"
                value={transferStock.location}
                disabled
              />
            </div>
            <div className=" pb-2 flex justify-between">
              <p>To: </p>
              <div className="relative w-2/3">
                <button
                  className="w-full border rounded-lg hover:border-primary-300 p-3 flex justify-between items-center bg-white h-8"
                  onClick={toggleDropdown}
                >
                  <span className="m-0">
                    {selectedLocation ? selectedLocation : "Select Location"}
                  </span>
                  <DownOutlined />
                </button>

                {isOpen && (
                  <div className="absolute bg-white border border-gray-300 rounded mt-1 w-full z-10">
                    {locations
                      .filter(
                        (location) => location.name !== transferStock.location
                      )
                      .map((location) => (
                        <div
                          key={location.key}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleLocationSelect(location)}
                        >
                          {location.name}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div className=" pb-2 flex justify-between">
              <p>Quantity: </p>
              <InputNumber
                className=" w-2/3"
                value={transferQuantity}
                onChange={setTransferQuantity}
                min={0}
                max={transferStock.quantity}
              />
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
export default StockTransferModal;
