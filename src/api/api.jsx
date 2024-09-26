import axios from "axios";
import { handleError } from "../helpers/error";
import axiosInstance from "./axiosConfig";
import { PORT } from "../helpers/port";

export async function loginUser({ email, password }) {
  try {
    const response = await axiosInstance.post("/users/login", {
      email,
      password,
    });
    if (response?.data) {
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function getUsers(pageNumber, itemsPerPage, name = "", role = "") {
  console.log(pageNumber, itemsPerPage, name, role);

  try {
    const queryParams = new URLSearchParams({
      page: pageNumber,
      limit: itemsPerPage,
      ...(name && { name }),
      ...(role && { role }),
    }).toString();

    const response = await axiosInstance.get(`/users?${queryParams}`);

    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function getUser(id) {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    if (response?.data) {
      // console.log("fetched data", response.data.data);
      return response.data.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(id) {
  try {
    const response = await axiosInstance.delete(`/users/${id}`);
    if (response?.data) {
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function activateUser(id) {
  try {
    const response = await axiosInstance.patch(`/users/activate/${id}`);
    if (response?.data) {
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function addUser(data) {
  console.log("creating new user", data);
  try {
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("role", data?.role);
    formData.append("phone", data?.phone);

    if (data?.image) {
      const file = new File(
        [data.image],
        `employee_${data.name}_${data.email}_${Date.now()}.jpg`,
        { type: "image/jpeg" }
      );
      formData.append("image", file);
    }
    console.log("create formData", formData);
    const response = await axiosInstance({
      method: "post",
      url: `http://localhost:${PORT}/api/v1/users`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    if (response?.data) {
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(id, data) {
  try {
    console.log("update id", id);
    console.log("update api data", data);

    const response = await axiosInstance({
      method: "patch",
      url: data?.role
        ? `http://localhost:${PORT}/api/v1/users/${id}`
        : `http://localhost:${PORT}/api/v1/users/updateMe/${id}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response?.data) {
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function uploadImage(id, image) {
  try {
    console.log("upload image", image);
    const formData = new FormData();
    const file = new File([image], `employee_${id}_${Date.now()}.jpg`, {
      type: "image/jpeg",
    });
    formData.append("image", file);

    const response = await axiosInstance({
      method: "patch",
      url: `http://localhost:${PORT}/api/v1/users/updateImage/${id}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    if (response?.data) {
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function logoutUser() {
  try {
    console.log("logout user");
    const response = await axiosInstance.post("/users/logout");
    if (response?.data) {
      // console.log(response.data);
      return true;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function updateUserPassword(data) {
  try {
    console.log("update password data", data);
    const response = await axios.patch(
      `http://localhost:${PORT}/api/v1/users/updatePassword`,
      data,
      { withCredentials: true }
    );
    if (response?.data) {
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function forgotPassword(email) {
  try {
    const response = await axiosInstance.post("/users/forgotPassword", {
      email,
    });
    if (response?.data) {
      // console.log(response.data);
      return response.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function resetPassword(token, data) {
  console.log("reset password data", data);
  console.log("reset password token", token);
  try {
    const response = await axiosInstance.patch(
      `/users/resetPassword/${token}`,
      data
    );
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function addCustomer(data) {
  try {
    console.log("add customer data", data);
    const response = await axiosInstance.post(`/customers`, data);

    if (response?.data) {
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function checkMailAccess(email) {
  try {
    console.log("add customer data", email);
    const response = await axiosInstance.post(`/users/checkMail`, email);

    if (response?.data) {
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function getSummarySalesAndPurchases(startDate, endDate) {
  try {
    console.log("fetching data", startDate, endDate);
  } catch (error) {
    handleError(error);
  }
}

export async function getTransactions(dateRange, store, cashier) {
  try {
    const response = await axiosInstance.get(`/transactions`, {
      startDate: dateRange[0],
      endDate: dateRange[1],
      store,
      cashier,
    });

    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function getPurchase(dateRange, inventory) {
  try {
    const response = await axiosInstance.get(`/transactions`, {
      startDate: dateRange[0],
      endDate: dateRange[1],
      inventory,
    });

    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    handleError(error);
  }
}
