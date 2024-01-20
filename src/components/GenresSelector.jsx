import React from "react";
import { ImTree } from "react-icons/im";

export default function GenresSelector({ badge, onClick }) {
  const renderBadge = () => {
    if (!badge) return null;
    return (
      <span className="absolute top-0 right-0 flex justify-center w-5 h-5 text-xs text-white translate-x-2 -translate-y-1 rounded-full dark:bg-dark-subtle bg-light-subtle items-cente">
        {badge}
      </span>
    );
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex items-center px-3 py-1 space-x-1 transition border-2 rounded dark:border-dark-subtle border-light-subtle dark:hover:border-white hover:border-primary dark:text-dark-subtle text-light-subtle dark:hover:text-white hover:text-primary"
    >
      <ImTree />
      <span>Select Genres</span>
      {renderBadge()}
    </button>
  );
}
