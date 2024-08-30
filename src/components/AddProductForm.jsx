import React, { useState } from "react";
import { Button } from "antd";
import ProductName from "./ProductName";
import UnitWeight from "./UnitWeight";
import { useForm } from "react-hook-form";
import axiosInstance from "../api/axiosConfig";

const AddProductForm = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });

  async function onSubmit(data) {
    try {
      // For now, add post to database logic here, but should be abstracted using api/api.js
      const formData = new FormData();
      formData.append("product_name", data?.product_name);
      formData.append("unit_weight", data?.unit_weight);

      // Log the contents of FormData
      // for (const [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }

      const response = await axiosInstance({
        method: "post",
        url: `http://localhost:3008/products`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.data) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      reset({
        product_name: "",
        unit_weight: "",
      });
    }
  }

  function handleClear() {
    reset({
      product_name: "",
      unit_weight: "",
    });
  }

  return (
    <>
      <h1 className="text-2xl font-bold font-poppins m-4 md:text-left text-center">
        <strong>Add New Product</strong>
      </h1>
      <div className="container mx-auto p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 min-w-[675px]:w-9/12"
        >
          <ProductName errors={errors} control={control} product_name={""} />
          <UnitWeight errors={errors} control={control} unit_weight={""} />
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
export default () => <AddProductForm />;
