import { useState } from "react";
import { Button, theme } from "antd";
import { DisconnectOutlined } from "@ant-design/icons";
import StashedContainer from "./StashedContainer";

function Stashed() {
  //   const stashedBills = [
  //     {
  //       id: 234783,
  //       customer: "nirmal220",
  //       total: "254.00",
  //       timestamp: "16:57:23 9/21/2024",
  //     },
  //     {
  //       id: 234784,
  //       customer: "john_doe",
  //       total: "150.75",
  //       timestamp: "10:15:30 9/22/2024",
  //     },
  //     {
  //       id: 234785,
  //       customer: "jane_smith",
  //       total: "320.50",
  //       timestamp: "11:45:00 9/23/2024",
  //     },
  //     {
  //       id: 234786,
  //       customer: "alice_wonder",
  //       total: "89.99",
  //       timestamp: "14:30:00 9/24/2024",
  //     },
  //     {
  //       id: 234787,
  //       customer: "bob_builder",
  //       total: "412.00",
  //       timestamp: "09:00:00 9/25/2024",
  //     },
  //   ];

  const [stashedBills, setStashedBills] = useState([
    {
      id: 234783,
      customer: "nirmal220",
      total: "254.00",
      timestamp: "16:57:23 9/21/2024",
    },
    {
      id: 234784,
      customer: "john_doe",
      total: "150.75",
      timestamp: "10:15:30 9/22/2024",
    },
    {
      id: 234785,
      customer: "jane_smith",
      total: "320.50",
      timestamp: "11:45:00 9/23/2024",
    },
    {
      id: 234786,
      customer: "alice_wonder",
      total: "89.99",
      timestamp: "14:30:00 9/24/2024",
    },
    {
      id: 234787,
      customer: "bob_builder",
      total: "412.00",
      timestamp: "09:00:00 9/25/2024",
    },
  ]);
  const [searchId, setSearchId] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");

  const filteredBills = stashedBills.filter((bill) => {
    const idMached = String(bill.id).includes(searchId);
    const customerMatched = bill.customer
      .toLowerCase()
      .includes(searchCustomer.toLowerCase());
    return idMached && customerMatched;
  });

  const handleReset = () => {
    setSearchId("");
    setSearchCustomer("");
  };

  const handleRemove = (key) => {
    console.log("Removing stashed bill: ", key);
    setStashedBills((bills) => bills.filter((bill) => bill.id !== key));
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <div
        className="p-6 min-h-[360px] ml-1"
        style={{
          background: `linear-gradient(150deg, #ffffff, #ffffff)`,
          minHeight: "100vh",
          borderRadius: borderRadiusLG,
        }}
      >
        <div className="mb-4 flex justify-between items-center">
          <div className=" font-bold text-xl mb-4 mr-4">Stashed Bills</div>
          <div className="">
            <input
              type="text"
              placeholder="Search by Bill ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="border rounded p-2 mr-2"
            />
            <input
              type="text"
              placeholder="Search by Customer"
              value={searchCustomer}
              onChange={(e) => setSearchCustomer(e.target.value)}
              className="border rounded p-2 mr-2"
            />
            <Button
              className=" p-2"
              onClick={() => {
                handleReset();
              }}
            >
              Reset
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 pt-4 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredBills.length === 0 ? (
            <div className="flex text-gray-400 content-center justify-center">
              <DisconnectOutlined className="mx-2" />
              <div className="mx-2">No Stashed bills found.</div>
            </div>
          ) : (
            filteredBills.map((bill) => (
              <StashedContainer
                id={bill.id}
                customer={bill.customer}
                total={bill.total}
                timestamp={bill.timestamp}
                removeStashed={handleRemove}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Stashed;
