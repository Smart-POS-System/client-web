import React from "react";
import { useUser } from "../hooks/useUser";
import HourGlass from "../components/HourGlass";
import UserForm from "../components/UserForm";

function UpdateUser() {
  const { isLoading: isFetching, user } = useUser();

  if (isFetching) {
    return <HourGlass />;
  }
  console.log("from fetched update", user);
  return <UserForm user={user} />;
}

export default UpdateUser;
