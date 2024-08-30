import React from "react";
import Products from "./Products";
import Batch from "./Batch";
import BuyingPrice from "./BuyingPrice";
import SellingPrice from "./SellingPrice";
import { useForm } from "react-hook-form";
import { Button } from "antd";
import MfdExp from "./MfdExp";
import axiosInstance from "../api/axiosConfig";

const AddItemForm = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm();

  async function onSubmit(data) {
    console.log(data);

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
      } // Log the contents of FormData
      // for (const [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }

      const response = await axiosInstance({
        method: "post",
        url: `http://localhost:3008/items`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.data) {
        console.log(response.data);
      }
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
      product_id: "",
      batch_no: "",
      buying_price: "",
      selling_price: "",
      mfdExp: ["", ""],
    });
  }

  return (
    <>
      <h1 className="text-2xl font-bold font-poppins m-4 md:text-left text-center">
        <strong>Add Specific Item</strong>
      </h1>
      <div className="container mx-auto p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 min-w-[675px]:w-9/12"
        >
          <Products errors={errors} control={control} product="" />
          <Batch errors={errors} control={control} batch_no="" />
          <BuyingPrice errors={errors} control={control} buying_price="" />
          <SellingPrice errors={errors} control={control} selling_price="" />
          <MfdExp errors={errors} control={control} mfdExp="" />
          <div className="flex justify-center gap-4 mt-4">
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

export default AddItemForm;
