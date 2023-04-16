import React from "react";

const CustomInputField = ({placeholder, name, onChange}) => {
  return (
    <div className="text-sm p-3 mb-3 bg-white border-slate-800 border-solid border rounded-lg ">
      <input
        id={name}
        onChange={onChange}
        name={name}
        className="w-full focus:ring-0 focus:ring-offset-0"
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
};

export default CustomInputField;
