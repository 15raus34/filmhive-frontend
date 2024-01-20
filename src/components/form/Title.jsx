import React from "react";

export default function Title({ children }) {
  return (
    <h1 className="text-xl font-semibold text-center dark:text-white text-primary">{children}</h1>
  );
}
