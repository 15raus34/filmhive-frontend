import React from "react";

export default function NextAndPreviousButton({
  onNextClick,
  onPreviousClick,
  className = "",
}) {
  const getClasses = () => {
    return "flex items-center justify-end mt-5 space-x-3 ";
  };
  return (
    <div className={getClasses() + className}>
      <Button title="Prev" onClick={onPreviousClick} />
      <Button title="Next" onClick={onNextClick} />
    </div>
  );
}

const Button = ({ title, onClick }) => {
  return (
    <button
      type="button"
      className="text-primary dark:text-white hover:underline"
      onClick={onClick}
    >
      {title}
    </button>
  );
};
