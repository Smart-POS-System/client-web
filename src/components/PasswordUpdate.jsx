import React from "react";
import { useForm } from "react-hook-form";
import Password from "./Password";

function PasswordUpdate() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const newPassword = watch("newpassword");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-red-100 rounded-xl p-6 shadow-md"
    >
      <h1 className="text-sm font-poppins text-red-500 font-semibold mb-4">
        Note: If you update your password, you will have to log out from the
        system and log in with the new password.
      </h1>
      <div className="w-full md:w-1/2">
        <Password
          text="Current Password"
          register={register("currentpassword", {
            required: "Current Password is required",
          })}
          error={errors.currentpassword}
        />
        <Password
          text="New Password"
          register={register("newpassword", {
            required: "New Password is required",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
          error={errors.newpassword}
        />
        <Password
          text="Confirm Password"
          register={register("confirmpassword", {
            required: "Confirm Password is required",
            validate: (value) =>
              value === newPassword || "The passwords do not match",
          })}
          error={errors.confirmpassword}
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update Password
      </button>
    </form>
  );
}

export default PasswordUpdate;
