import { DatePicker, Select } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import SalesTable from "./SalesTable";

const { RangePicker } = DatePicker;

function SalesComponent() {
  const [isSelectStore, setIsSelectStore] = useState(false);
  const [store, setStore] = useState("All Stores");
  const [cashier, setCashier] = useState("All Cashiers");
  const [dateRange, setDateRange] = useState([null, null]);
  const [formattedDateRange, setFormattedDateRange] = useState([
    dayjs().subtract(7, "day").format("YYYY-MM-DD"),
    dayjs().format("YYYY-MM-DD"),
  ]);

  function handleDateChange(dates, dateStrings) {
    setDateRange(dates);
    setFormattedDateRange(dateStrings);
  }

  function handleChangeStore(value) {
    if (value === "All Stores") {
      setIsSelectStore(false);
    } else {
      setIsSelectStore(true);
    }
    setStore(value);
    setCashier("All Cashiers");
  }

  function handleChangeCashier(value) {
    setCashier(value);
  }

  const stores = [
    { value: "Store 1", label: "Store 1" },
    { value: "Store 2", label: "Store 2" },
    { value: "Store 3", label: "Store 3" },
  ];

  const cashiers = {
    "Store 1": ["Cashier 1", "Cashier 2", "Cashier 3"],
    "Store 2": ["Cashier 4", "Cashier 5", "Cashier 6"],
    "Store 3": ["Cashier 7", "Cashier 8", "Cashier 9"],
  };

  return (
    <div className="mx-auto w-full">
      <div
        className={`grid ${
          isSelectStore
            ? "grid-cols-1 md:grid-cols-3"
            : "grid-cols-1 md:grid-cols-2"
        } items-center justify-between w-full gap-4`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-4 w-full">
          <h4 className="font-semibold font-poppins text-sm">
            Select Date Range:
          </h4>
          <RangePicker onChange={handleDateChange} />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-4 w-full">
          <h4 className="font-semibold font-poppins text-sm">
            Search By Store:
          </h4>
          <Select
            defaultValue="All Stores"
            style={{ width: 120 }}
            onChange={handleChangeStore}
            options={[{ value: "All Stores", label: "All Stores" }, ...stores]}
          />
        </div>

        {isSelectStore && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-4 w-full">
            <h4 className="font-semibold font-poppins text-sm">
              Cashier Name:
            </h4>
            <Select
              value={cashier}
              style={{ width: 120 }}
              onChange={handleChangeCashier}
              options={[
                { value: "All Cashiers", label: "All Cashiers" },
                ...cashiers[store].map((cashier) => ({
                  value: cashier,
                  label: cashier,
                })),
              ]}
            />
          </div>
        )}
      </div>

      <div className="mt-8 w-full">
        <SalesTable />
      </div>
    </div>
  );
}

export default SalesComponent;
