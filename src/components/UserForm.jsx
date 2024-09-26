import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "antd";
import Name from "./Name";
import Role from "./Role";
import Email from "./Email";
import Phone from "./Phone";
import UserImage from "./UserImage";
import useAddUser from "../hooks/useAddUser";
import HourGlass from "./HourGlass";
import { useAction } from "../context/actionContext";
import useUpdateUser from "../hooks/useUpdateUser";
import useImage from "../hooks/useImage";
import PasswordUpdate from "./PasswordUpdate";

function UserForm({
  user = {},
  isLoggedUser = false,
  handleProfileUpdate = () => {},
}) {
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
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const { isLoading, handleAddUser } = useAddUser();
  const { updatingUser } = useAction();
  const { isLoading: isUpdating, handleUpdateUser } = useUpdateUser();
  const { isLoading: isImageUploading, handleUpdateImage } = useImage();

  useEffect(() => {
    if (user && updatingUser) {
      reset({
        name: user.name || "",
        role: user.role || "",
        email: user.email || "",
        phone: user.mobile || "",
      });
      setImageFile(user.image || null);
    }
  }, [user, updatingUser, reset]);

  function onImageChange(file) {
    setImageFile(file);
    setIsImageRemoved(true);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setIsImageRemoved(true);
  }

  function handleClear() {
    reset({
      name: "",
      role: "",
      email: "",
      phone: "",
    });
    setImageFile(null);
    setResetImage(true);
    setTimeout(() => setResetImage(false), 0);
    setIsImageRemoved(false);
  }

  async function onSubmit(data) {
    const formattedPhoneNumber = data.phone.padStart(10, "0").slice(0, 10);
    console.log("Formatted phone number:", data);
    const newUser = {
      ...data,
      phone: formattedPhoneNumber,
    };

    console.log(updatingUser);

    if (updatingUser) {
      console.log("Updating user with data:", newUser);
      handleUpdateUser(newUser);
      if (isImageRemoved) {
        handleUpdateImage(imageFile); // Handle the image update
      }
    } else {
      console.log("Creating new user with data:", newUser);
      handleAddUser(newUser);
      if (imageFile) {
        handleUpdateImage(imageFile); // Handle the image upload
      }
    }
  }

  if (isLoading || isUpdating || isImageUploading) {
    return <HourGlass />;
  }

  return (
    <>
      {!isLoggedUser && (
        <h1 className="text-2xl font-bold font-poppins m-4 md:text-left text-center">
          <strong>
            {updatingUser ? "Update User Details" : "Add New User"}
          </strong>
        </h1>
      )}
      <div className="container mx-auto p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 min-w-[675px]:w-9/12"
        >
          {!isLoggedUser && (
            <Name errors={errors} control={control} role={user?.name} />
          )}
          {!isLoggedUser && (
            <Role errors={errors} control={control} role={user?.role} />
          )}
          {!isLoggedUser && (
            <Email errors={errors} control={control} role={user?.email} />
          )}
          <Phone
            errors={errors}
            control={control}
            phone={user?.mobile}
            isLoggedUser={isLoggedUser}
          />
          <UserImage
            onImageChange={onImageChange}
            reset={resetImage}
            image={imageFile}
          />
          {isLoggedUser && <PasswordUpdate />}

          <div className="flex justify-center gap-4 mt-4">
            {isLoggedUser ? (
              <Button onClick={handleProfileUpdate}>Cancel</Button>
            ) : (
              <Button type="default" htmlType="reset" onClick={handleClear}>
                Clear All
              </Button>
            )}

            <Button
              type="primary"
              htmlType="submit"
              disabled={!isValid || isLoading || isUpdating}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserForm;
