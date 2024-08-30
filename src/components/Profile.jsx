import { Dropdown } from "antd";
import UserHeader from "./UserHeader";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import HourGlass from "./HourGlass";

function Profile() {
  const navigate = useNavigate();
  const { isLoading: isLoggingout, handleLogoutUser } = useLogout();
  const items = [
    {
      key: "1",
      label: <span onClick={() => navigate("/view")}>My Profile</span>,
    },
    {
      key: "2",
      label: <span onClick={handleLogoutUser}>Logout</span>,
    },
  ];

  if (isLoggingout) {
    return <HourGlass />;
  }

  return (
    <Dropdown
      autoFocus
      overlayClassName="absolute right-0"
      menu={{
        items,
      }}
      placement="bottomRight"
    >
      <button>
        <UserHeader />
      </button>
    </Dropdown>
  );
}

export default Profile;
