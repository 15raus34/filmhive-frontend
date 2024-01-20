import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const defaultInputStyle =
  "dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary dark:text-primary text-lg ";
export default function AppSearchForm({
  showRestIcon,
  placeholder = "Search...",
  onSubmit,
  inputClassName = defaultInputStyle,
  onReset,
}) {
  const [value, setValue] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };

  const handleReset = () => {
    setValue("");
    onReset();
  };

  return (
    <form className="relative" onSubmit={handleOnSubmit}>
      <input
        type="text"
        className={
          "p-1 transition border-2 rounded outline-none bg-transparent " +
          inputClassName
        }
        placeholder={placeholder}
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      {showRestIcon ? (
        <button
          onClick={handleReset}
          type="button"
          className="absolute -translate-y-1/2 top-1/2 right-2 text-secondary dark:text-white"
        >
          <AiOutlineClose />
        </button>
      ) : null}
    </form>
  );
}
