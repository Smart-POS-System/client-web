import { useUserData } from "../context/userContext";

function UserHeader() {
  const { fullUser: user } = useUserData();
  return (
    <div className="flex flex-row items-center justify-between bg-blue-50 p-2 rounded-2xl">
      <img
        className="rounded-full border-2 border-blue-600 w-14 h-14"
        src={user?.image ? user?.image : "default_user.png"}
        alt="avatar"
      />
      <div className="flex flex-col items-start ml-2">
        <h4 className="text-sm font-semibold font-poppins">{user?.name}</h4>
      </div>
    </div>
  );
}

export default UserHeader;
