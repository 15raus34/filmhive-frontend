import React from "react";

export default function NotFoundText({ visible, text }) {
  if (!visible) return null;
  return (
    <h1 className="py-5 text-3xl font-semibold text-center text-secondary dark:text-white opacity-40">
      {text ? text : "Record Not Found"}
    </h1>
  );
}
