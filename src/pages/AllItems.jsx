import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { useSearchParams } from "react-router-dom";
import ItemList from "../components/ItemList";

const { Search } = Input;

const AllItems = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [limit, setLimit] = useState(10);
  const { Search } = Input;
  const [searchSize, setSearchSize] = useState("medium");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 375) {
        setSearchSize("small");
      } else {
        setSearchSize("medium");
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchParams({ name: value });
  };

  return (
    <div className="mx-4 mt-4">
      <h1 className="text-2xl font-bold font-poppins m-4 md:text-left text-center">
        <strong>All Items</strong>
      </h1>
      <div className="w-full min-[768px]:w-10/12 xl:w-8/12 items-center justify-center">
        <div className="flex flex-col md:flex-row space-between items-center m-4 gap-x-6">
          <label className="text-sm font-semibold font-poppins whitespace-nowrap">
            <span>Search Item By Product Name</span>
          </label>
          <div className="w-full md:w-auto flex-grow">
            <Search
              className="w-full"
              placeholder="Search Item"
              enterButton="Search"
              size={searchSize}
              loading={false}
              // onSearch={onSearchItem}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div>
        <ItemList className="h-full" />
      </div>
    </div>
  );
};

export default AllItems;
