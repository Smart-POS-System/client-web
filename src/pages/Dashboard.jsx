import { useUserData } from "../context/userContext";
import Cashier from "./cashier_dash/Cashier";
import Cashier_Dash from "./cashier_dash/Cashier_Dash";

function Dashboard() {
  const { user } = useUserData();

  return (
    <div>
      {user.role === "General Manager" ? <Cashier /> : <h1>Not Dashboard</h1>}
    </div>
    <div>{user.role === "Cashier" ? <Cashier /> : <h1>Not Dashboard</h1>}</div>
  );
}

export default Dashboard;
