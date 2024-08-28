import { useState } from "react";
import Password from "./Password";

function PasswordUpdate() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="bg-red-100 rounded-xl p-6 shadow-md">
      <h1 className="text-sm font-poppins text-red-500 font-semibold mb-4">
        Note: If you update your password, you will have to log out from the
        system and log in with the new password.
      </h1>
      <div className="w-full md:w-1/2">
        <Password text="Current Password" />
        <Password text="New Password" />
        <Password text="Confirm Password" />
      </div>
    </div>
  );
}

export default PasswordUpdate;
