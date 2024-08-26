import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "antd";
import Name from "./Name";
import Role from "./Role";
import Email from "./Email";
import Phone from "./Phone";
import UserImage from "./UserImage";
import HourGlass from "./HourGlass";
import { useAction } from "../context/actionContext";
import useAddUser from "../hooks/useAddUser";
import useUpdateUser from "../hooks/useUpdateUser";
import useImage from "../hooks/useImage";

function UserForm({ user = {}, isLoggedUser = false }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const [imageFile, setImageFile] = useState(null);
  const [resetImage, setResetImage] = useState(false);
  const { updatingUser } = useAction();
  const { isLoading: isUpdating, handleUpdateUser } = useUpdateUser();
  const { isLoading: isAdding, handleAddUser } = useAddUser();
  const { isLoading: isImageUploading, handleUpdateImage } = useImage();

  // Populate the form when in update mode
  useEffect(() => {
    if (user && updatingUser) {
      reset({
        name: user.name || "",
        role: user.role || "",
        email: user.email || "",
        phone: user.mobile || "",
      });
      if (user.image) {
        setImageFile(user.image);
      }
    }
  }, [user, updatingUser, reset]);

  const onImageChange = (file) => {
    setImageFile(file);
  };

  const onSubmit = async (data) => {
    const formattedPhoneNumber = data.phone.padStart(10, "0").slice(0, 10);
    const newUser = {
      ...data,
      phone: formattedPhoneNumber,
      image: imageFile ? imageFile : null,
    };

    if (updatingUser) {
      console.log("Updating user with data:", newUser);
      handleUpdateUser(newUser);
      if (imageFile !== null) {
        handleUpdateImage(imageFile);
      }
    } else {
      console.log("Creating new user with data:", newUser);
      handleAddUser(newUser);
      if (imageFile !== null) {
        handleUpdateImage(imageFile);
      }
    }

    if (isImageUploading || isUpdating || isAdding) {
      return <HourGlass />;
    }
  };

  const handleReset = () => {
    reset(); // Reset the form fields
    setImageFile(null); // Clear the image file state
    setResetImage(true); // Trigger reset in UserImage component
    setTimeout(() => setResetImage(false), 0); // Reset the resetImage state to allow re-triggering
  };

  return (
    <div className="container mx-auto p-4">
      {!isLoggedUser && (
        <h1 className="text-2xl font-bold font-poppins m-4 md:text-left text-center">
          <strong>
            {updatingUser ? "Update User Details" : "Add New User"}
          </strong>
        </h1>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 font-poppins min-[675px]:w-9/12"
      >
        {!isLoggedUser && <Name errors={errors} control={control} />}
        {!isLoggedUser && <Role errors={errors} control={control} />}
        {!isLoggedUser && <Email errors={errors} control={control} />}
        <Phone errors={errors} control={control} />
        <UserImage
          onImageChange={onImageChange}
          reset={resetImage}
          image={imageFile}
        />
        <div className="flex justify-center gap-4 mt-4">
          <Button type="default" htmlType="reset" onClick={handleReset}>
            Clear All
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!isValid || isUpdating || isAdding || isImageUploading}
          >
            {updatingUser ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
