import {
  KeyOutlined,
  LoadingOutlined,
  LoginOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import { useUserData } from "../context/userContext";

function Step({ isValidated }) {
  const { email } = useUserData();
  console.log("isValidate", isValidated);
  return (
    <Steps
      items={[
        {
          title: "Email",
          status: !isValidated ? "process" : "finish",
          icon: !isValidated ? <LoadingOutlined /> : <MailOutlined />,
        },
        {
          title: "Password",
          status: email !== "" ? "process" : "wait",
          icon: email !== "" ? <LoadingOutlined /> : <KeyOutlined />,
        },
        {
          title: "Logged In",
          status: "wait",
          icon: <LoginOutlined />,
        },
      ]}
    />
  );
}

export default Step;
