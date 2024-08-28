import { Select } from "antd";
import { Controller } from "react-hook-form";

const { Option } = Select;

function Role({ errors, control, role }) {
  return (
    <>
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Role
        </label>
        <Controller
          name="role"
          defaultValue={role}
          control={control}
          rules={{ required: "Role is required" }}
          render={({ field }) => (
            <Select
              {...field}
              style={{
                width: "100%",
                borderColor: errors.role ? "red" : "green",
              }}
              placeholder="Select Role"
            >
              <Option value="Regional Manager">Regional Manager</Option>
              <Option value="Inventory Manager">Inventory Manager</Option>
              <Option value="Store Manager">Store Manager</Option>
              <Option value="Cashier">Cashier</Option>
            </Select>
          )}
        />
        {errors.role && (
          <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
        )}
      </div>
    </>
  );
}

export default Role;
