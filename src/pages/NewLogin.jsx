import { useEffect, useState } from "react";
import { useUserData } from "../context/userContext";
import LoginComponent from "../components/LoginComponent";

function NewLogin() {
  const { email, role } = useUserData();
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    if (email !== "" && role !== "") {
      setIsValidated(true);
    } else {
      setIsValidated(false);
    }
  }, [email, role]);

  return (
    <div className="h-screen w-full overflow-hidden relative">
      <video
        autoPlay
        muted
        loop
        className="absolute z-10 w-full h-full object-cover"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="flex flex-col lg:flex-row items-center justify-center h-full w-full relative z-30 p-4 lg:p-0">
        <LoginComponent isValidated={isValidated} role={role} email={email} />
      </div>
    </div>
  );
}

export default NewLogin;
