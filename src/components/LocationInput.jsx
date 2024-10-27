import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { Controller } from "react-hook-form";
import { Select } from "antd";
const { Option } = Select;

const LocationInput = ({ errors, control, location }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsResponse = await axiosInstance.get(
          "http://localhost:49162/locations"
        );
        setLocations(locationsResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLocations();
  }, []);

  console.log(locations);

  return (
    <>
      <div>
        <label
          htmlFor="location_id"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Location
        </label>
        <Controller
          name="location_id"
          defaultValue={location}
          control={control}
          rules={{ required: "You must select a location." }}
          render={({ field }) => (
            <Select
              {...field}
              style={{
                width: "100%",
                borderColor: errors.location_id ? "red" : "green",
              }}
              placeholder="Select location"
            >
              {locations?.locations?.map((a_location) => (
                <Option
                  key={a_location?.location_id}
                  value={a_location?.location_id}
                >
                  {a_location?.name}
                </Option>
              ))}
            </Select>
          )}
        />
        {errors.location_id && (
          <p className="text-red-500 text-xs mt-1">
            {errors.location_id?.message}
          </p>
        )}
      </div>
    </>
  );
};

export default LocationInput;
