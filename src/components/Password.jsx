import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";

function Password({ text }) {
  return (
    <div className="flex flex-col mb-4">
      <label
        htmlFor="password"
        className="block text-sm font-medium ml-1 text-gray-700 mb-1"
      >
        {text}
      </label>
      <Input.Password
        placeholder={text}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
  );
}

export default Password;
