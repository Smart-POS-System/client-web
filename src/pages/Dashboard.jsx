import AdminDashboard from "../components/AdminDashboard";
import { useUserData } from "../context/userContext";

function Dashboard() {
  const { user } = useUserData();
  return (
    <div>
      {user?.role !== "Cashier" ? (
        <AdminDashboard />
      ) : (
        <h1>Cashier Dashboard</h1>
      )}
    </div>
  );
}

export default Dashboard;
