import React from "react";

export default function Selector({ name, options, value, onChange, label }) {
  return (
    <select
      id={name}
      name={name}
      onChange={onChange}
      value={value}
      className="p-1 pr-10 transition bg-transparent bg-white border-2 rounded outline-none dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary text-light-subtle dark:text-dark-subtle dark:focus:text-white focus:text-primary dark:bg-primary "
    >
      <option value="">{label}</option>
      {options.map(({ title, value }) => {
        return (
          <option
            className="dark:bg-primary dark:text-white"
            key={title}
            value={value}
          >
            {title}
          </option>
        );
      })}
    </select>
  );
}
