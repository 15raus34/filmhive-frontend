import React from "react";

export default function GridContainer({ children, className }) {
  return (
    <div
      className={
        "grid grid-cols-1 gap-3 lg:grid-cols-5 md:grid-cols-2 " + className
      }
    >
      {children}
    </div>
  );
}
