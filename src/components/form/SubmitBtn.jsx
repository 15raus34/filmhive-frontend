import React from "react";
import { ImSpinner5 } from "react-icons/im";

export default function SubmitBtn({ submitValue, busy, onClick, type }) {
  return (
    <button
      type={type || "submit"}
      onClick={onClick}
      value={submitValue}
      className="flex items-center justify-center w-full h-10 p-1 text-lg font-semibold text-white transition rounded cursor-pointer dark:bg-white bg-primary dark:text-secondary hover:bg-opacity-90"
    >
      {busy ? <ImSpinner5 className="animate-spin" /> : submitValue}
    </button>
  );
}
