import React from "react";

export default function FormContainer({children}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-primary -z-10">{children}</div>
  );
}
