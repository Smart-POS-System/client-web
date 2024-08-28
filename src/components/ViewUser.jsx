import { Modal, Button } from "antd";
import { useUser } from "../hooks/useUser";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserData } from "../context/userContext";
import DeleteUser from "./DeleteUser";
import UserData from "./UserData";
import { useAction } from "../context/actionContext";

function ViewUser({ isModalOpen, handleModal }) {
  const { isLoading, user } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user: userData } = useUserData();
  const navigate = useNavigate();
  const { confirmDeleteActivate, handleDeleteActivate, handleUpdatingUser } =
    useAction();

  function handleUpdate() {
    handleUpdatingUser(true);
    handleModal((prev) => !prev);
    navigate(`/update/${user.employee_id}`);
  }

  function handleActivateDeleteClick(value) {
    handleDeleteActivate(value);
  }

  function handleReturn() {
    removeQueryParam("id");
    handleModal((prev) => !prev);
  }

  function removeQueryParam(param) {
    searchParams.delete(param);
    setSearchParams(searchParams);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-50vh">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="blue"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <>
      <Modal
        className="text-center"
        centered
        open={isModalOpen}
        onOk={handleModal}
        onCancel={handleModal}
        width="90%"
        style={{ maxWidth: "600px" }}
        bodyStyle={{ padding: "16px" }}
        footer={[
          <div className="flex flex-col sm:flex-row sm:justify-end justify-center gap-2 sm:w-full w-1/2 mx-auto">
            <Button
              key="back"
              onClick={handleReturn}
              className="w-full sm:w-auto"
            >
              Return
            </Button>

            <Button
              type="primary"
              onClick={handleUpdate}
              className="w-full sm:w-auto"
            >
              Update
            </Button>
            {userData.role === "General Manager" &&
              (!user?.is_active ? (
                <Button
                  type="primary"
                  onClick={() => handleActivateDeleteClick(true)}
                  className="w-full sm:w-auto"
                >
                  Activate
                </Button>
              ) : (
                <Button
                  danger
                  type="primary"
                  onClick={() => handleActivateDeleteClick(true)}
                  className="w-full sm:w-auto"
                >
                  Deactivate
                </Button>
              ))}
          </div>,
        ]}
      >
        <UserData user={user} isLoggedUser={false} />
      </Modal>
      {confirmDeleteActivate && (
        <DeleteUser
          isModalOpen={confirmDeleteActivate}
          handleModal={handleModal}
          isActive={user.is_active}
          id={user.employee_id}
          handleDeleteActivate={handleDeleteActivate}
        />
      )}
    </>
  );
}

export default ViewUser;
