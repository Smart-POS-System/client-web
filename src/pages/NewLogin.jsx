import { useEffect, useState } from "react";
import FirstLogin from "../components/FirstLogin";
import SecondLogin from "../components/SecondLogin";
import { useUserData } from "../context/userContext";

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
        className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="h-full w-full absolute  z-20"></div>

      <div className="flex flex-col lg:flex-row items-center justify-center h-full w-full relative z-30">
        {!isValidated ? (
          <FirstLogin isValidated={isValidated} />
        ) : (
          <SecondLogin isValidated={isValidated} />
        )}
      </div>
    </div>
  );
}

export default NewLogin;
