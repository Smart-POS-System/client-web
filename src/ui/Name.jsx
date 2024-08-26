import { Input } from "antd";
import { Controller } from "react-hook-form";

function Name({ errors, control, name }) {
  return (
    <>
      {" "}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Employee Name
        </label>
        <Controller
          name="name"
          defaultValue={name}
          control={control}
          rules={{
            required: "Employee Name is required",

            pattern: {
              value: /^[A-Za-z_ ]+$/,
              message:
                "Employee Name can only contain letters, spaces, or underscores",
            },
          }}
          render={({ field }) => (
            <Input {...field} id="name" placeholder="Enter Employee Name" />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>
    </>
  );
}

export default Name;
