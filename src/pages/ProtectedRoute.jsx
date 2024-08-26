import { useState, useEffect } from "react";
import { useUserData } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import HourGlass from "../ui/HourGlass";

function ProtectedRoute({ children }) {
  const { user } = useUserData();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("rgf", user);
    if (user.exp > Math.floor(Date.now() / 1000)) {
      setIsAuthenticated((isAuthenticated) => true);
    } else {
      setIsAuthenticated((isAuthenticated) => false);
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return <HourGlass />;
  }

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
