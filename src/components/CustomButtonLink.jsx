import React from "react";

export default function CustomButtonLink({ label, clickAble = true, onClick }) {
  const className = clickAble
    ? "cursor-pointer text-highlight dark:text-highlight-dark hover:underline"
    : "cursor-default text-highlight dark:text-highlight-dark";
  return (
    <button onClick={onClick} className={className} type="button">
      {label}
    </button>
  );
}
