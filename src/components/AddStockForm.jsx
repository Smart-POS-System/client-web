import React from "react";
import Products from "./Products";
import Batch from "./Batch";
import BuyingPrice from "./BuyingPrice";
import SellingPrice from "./SellingPrice";
import { useForm } from "react-hook-form";
import { Button } from "antd";
import MfdExp from "./MfdExp";
import axiosInstance from "../api/axiosConfig";
import toast from "react-hot-toast";
import Item from "./Item";
import Quantity from "./Quantity";
import BarcodeNo from "./BarcodeNo";

const AddStockForm = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm();

  async function onSubmit(data) {
    try {
      // For now, add post to database logic here, but should be abstracted using api/api.js
      const formData = new FormData();

      const formattedMFD = data?.mfdExp[0]?.toISOString().slice(0, 10);
      const formattedEXP = data?.mfdExp[1]?.toISOString().slice(0, 10);

      formData.append("product_id", data?.product_id);
      formData.append("buying_price", data?.buying_price);
      formData.append("selling_price", data?.selling_price);
      formData.append("mfd", formattedMFD);
      formData.append("exp", formattedEXP);

      if (data?.batch_no) {
        formData.append("batch_no", data.batch_no);
      }

      const savePromise = axiosInstance({
        method: "post",
        url: `http://localhost:49160/items`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      await toast.promise(
        savePromise,
        {
          loading: "Saving...",
          success: "Successfully saved!",
          error: "Couldn't save...",
        },
        {
          style: {
            minWidth: "250px",
          },
          success: {
            duration: 2000,
          },
        }
      );

      const response = await savePromise;

      reset({
        product_id: "",
        batch_no: "",
        buying_price: "",
        selling_price: "",
        mfdExp: ["", ""],
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleClear() {
    reset({
      item_id: "",
      quantity: "",
      barcode_no: "",
    });
  }

  return (
    <>
      <h1 className="text-2xl font-bold font-poppins mb-4 md:text-left text-center">
        <strong>Add Specific Stock</strong>
      </h1>
      <div className="container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="min-w-[675px]:w-9/12"
        >
          <div className="space-y-4">
            <Item errors={errors} control={control} item="" />
            <Quantity errors={errors} control={control} quantity="" />
            <BarcodeNo errors={errors} control={control} barcode_no="" />
          </div>
          <div className="flex gap-4 mt-8">
            <Button type="default" htmlType="reset" onClick={handleClear}>
              Clear All
            </Button>
            <Button type="primary" htmlType="submit" disabled={!isValid}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddStockForm;
