import { useUser } from "../hooks/useUser";
import HourGlass from "./HourGlass";
import UserData from "./UserData";

function MyDetails() {
  const { isLoading, user } = useUser();
  console.log("loggeduser", user);

  if (isLoading) {
    return <HourGlass />;
  }
  return <UserData user={user} isLoggedUser={true} />;
}

export default MyDetails;
