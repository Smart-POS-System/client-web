import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import axiosInstance from "../api/axiosConfig";
const { Option } = Select;

const Items = ({ errors, control, item }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsResponse = await axiosInstance.get(
          "http://localhost:49160/items"
        );
        setItems(itemsResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, []);

  return (
    <>
      <div>
        <label
          htmlFor="item_id"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Item
        </label>
        <Controller
          name="item_id"
          defaultValue={item}
          control={control}
          rules={{ required: "You must select an item." }}
          render={({ field }) => (
            <Select
              {...field}
              style={{
                width: "100%",
                borderColor: errors.product_id ? "red" : "green",
              }}
              placeholder="Select Item"
            >
              {items.map((item) => (
                <Option key={item?.item_id} value={item?.item_id}>
                  {/* {item?.product_name} */}
                </Option>
              ))}
            </Select>
          )}
        />
        {errors.item_id && (
          <p className="text-red-500 text-xs mt-1">{errors.item_id?.message}</p>
        )}
      </div>
    </>
  );
};

export default Items;
