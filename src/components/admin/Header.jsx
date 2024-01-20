import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";
import { useTheme } from "../../hooks";
import AppSearchForm from "../form/AppSearchForm";
import { useNavigate } from "react-router-dom";

export default function Header({ onAddMovieClick, onAddActorClick }) {
  const { ToggleTheme } = useTheme();
  const [ShowOption, setShowOption] = useState(false);

  const navigate = useNavigate();

  const Options = [
    { title: "Add Movie", onClick: onAddMovieClick },
    { title: "Add Actor", onClick: onAddActorClick },
  ];

  const handleSearchSubmit = (query) => {
    if (!query.trim()) return;
    navigate("/search?title=" + query);
  };

  return (
    <div className="relative flex items-center justify-between p-5">
      <AppSearchForm onSubmit={handleSearchSubmit} />
      <div className="flex items-center space-x-3">
        <button onClick={ToggleTheme} className="dark:text-white">
          <BsFillSunFill size={24} />
        </button>
        <button
          onClick={() => setShowOption(!ShowOption)}
          className="flex items-center px-3 py-1 space-x-2 text-lg font-semibold transition border-2 rounded border-secondary hover:border-primary text-secondary dark:text-white hover:opacity-80"
        >
          <span>Create</span>
          <AiOutlinePlus />
        </button>
      </div>
      <CreateOption
        visible={ShowOption}
        options={Options}
        onClose={() => {
          setShowOption(false);
        }}
      />
    </div>
  );
}

const CreateOption = ({ visible, options, onClose }) => {
  const handleClick = (fn) => {
    fn();
    onClose();
  };
  if (!visible) return null;

  return (
    <div className="absolute right-0 z-50 flex flex-col p-5 space-y-2 rounded top-12 bg-secondary animate-scale drop-shadow-lg">
      {options.map(({ title, onClick }) => {
        return (
          <ButtonOption key={title} onClick={() => handleClick(onClick)}>
            {title}
          </ButtonOption>
        );
      })}
    </div>
  );
};

const ButtonOption = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-white transition hover:opacity-80"
    >
      {children}
    </button>
  );
};
// TODO animation
