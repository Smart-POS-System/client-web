import { Dropdown } from "antd";
import UserHeader from "./UserHeader";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: <span onClick={() => navigate("/view")}>My Profile</span>,
    },
    {
      key: "2",
      label: <span>Logout</span>,
    },
  ];
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
