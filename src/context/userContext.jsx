import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const userContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [fullUser, setFullUser] = useState({});

  function setUserLogin(token) {
    localStorage.setItem("token", token);
    const decodedUser = jwtDecode(token);
    setUser((user) => decodedUser);
    console.log(user);
    console.log(Math.floor(Date.now() / 1000));
  }

  function storeFullUser(user) {
    setFullUser(user);
  }

  return (
    <userContext.Provider
      value={{ user, setUserLogin, fullUser, storeFullUser }}
    >
      {children}
    </userContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error("The User provider has used outside of its scope.");
  }
  return context;
}

export default UserProvider;
