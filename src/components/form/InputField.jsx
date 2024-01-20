import React from "react";

export default function InputField({label,name,placeholder,...rest}) {
  return (
    <div className="flex flex-col-reverse">
      <input
        id={name}
        name={name}
        type="text"
        className="w-full p-1 bg-transparent border-2 rounded outline-none dark:border-dark-subtle dark:text-white dark:focus:border-white peer"
        placeholder={placeholder}
        {...rest}
      />
      <label
        htmlFor="email"
        className="self-start font-semibold dark:text-dark-subtle dark:peer-focus:text-white"
      >
        {label}
      </label>
    </div>
  );
}
