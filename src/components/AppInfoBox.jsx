import React from "react";

export default function AppInfoBox({ title, subTitle }) {
  return (
    <div className="p-5 bg-white rounded shadow dark:bg-secondary">
      <h1 className="mb-2 text-2xl font-semibold text-primary dark:text-white">
        {title}
      </h1>
      <p className="text-xl text-primary dark:text-white">{subTitle}</p>
    </div>
  );
}
