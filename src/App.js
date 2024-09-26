import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./pages/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import { useEffect } from "react";
import { Tooltip, initTWE } from "tw-elements";
import UserProvider from "./context/userContext";
import AllUsers from "./pages/AllUsers";
import ActionProvider from "./context/actionContext";
import CreateUser from "./components/UserForm";
import UpdateUser from "./pages/UpdateUser";
import View from "./pages/View";
import Customers from "./pages/Customers";
import ResetPassword from "./pages/ResetPassword";
import CreateCustomer from "./pages/CreateCustomer";
import Cashier_Dash from "./pages/cashier_dash/Cashier_Dash";
import ShowStashedBills from "./components/cashier/ShowStashedBills";
import CashierLayout from "./pages/CashierLayout";

function App() {
  useEffect(() => {
    initTWE({ Tooltip });
  }, []);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <UserProvider>
      <ActionProvider>
        <QueryClientProvider client={queryClient}>
          {/* <Cashier_Dash /> */}
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <CashierLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="stashedBills" element={<ShowStashedBills />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<AllUsers />} />
                <Route path="create" element={<CreateUser />} />
                <Route path="update/:userId" element={<UpdateUser />} />
                <Route path="view" element={<View />} />
                <Route path="customers" element={<Customers />} />
                <Route path="customers/register" element={<CreateCustomer />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="reset/:token" element={<ResetPassword />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
                style: {
                  backgroundColor: "green",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "500",
                  maxWidth: "500px",
                  padding: "16px 24px",
                  borderRadius: "7px",
                  backdropFilter: "blur(10px)",
                },
              },

              error: {
                duration: 5000,
                style: {
                  backgroundColor: "red",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "500",
                  maxWidth: "500px",
                  padding: "16px 24px",
                  borderRadius: "7px",
                  backdropFilter: "blur(10px)",
                },
              },
              style: {
                fontSize: "16px",
                fontWeight: "500",
                maxWidth: "500px",
                padding: "16px 24px",
                borderRadius: "7px",
                backdropFilter: "blur(10px)",
              },
            }}
          />
        </QueryClientProvider>
      </ActionProvider>
    </UserProvider>
  );
}

export default App;
