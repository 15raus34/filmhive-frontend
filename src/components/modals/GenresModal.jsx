import React, { useEffect, useState } from "react";
import ModalContainer from "./ModalContainer";
import genres from "../../utils/genres";
import SubmitBtn from "../form/SubmitBtn";

export default function GenresModal({
  visible,
  onClose,
  previousGenres,
  onSubmit,
}) {
  const [selectedGenres, setSelectedgenres] = useState([]);

  const handleGenresSelector = (gen) => {
    let newGenres = [];
    if (selectedGenres.includes(gen)) {
      newGenres = selectedGenres.filter((genre) => genre !== gen);
    } else {
      newGenres = [...selectedGenres, gen];
    }
    setSelectedgenres([...newGenres]);
  };

  const handleSubmit = () => {
    onSubmit(selectedGenres);
    onClose();
  };

  const handleClose = () => {
    setSelectedgenres(previousGenres);
    onClose();
  };

  useEffect(() => {
    setSelectedgenres(previousGenres);
  }, []);

  return (
    <ModalContainer visible={visible} onClose={handleClose}>
      <div className="flex flex-col justify-between h-full">
        <div className="">
          <h1 className="text-2xl font-semibold text-center dark:text-white text-primary">
            Select Genres
          </h1>
          <div className="space-y-3">
            {genres.map((gen, index) => {
              return (
                <Genre
                  key={gen}
                  onClick={() => handleGenresSelector(gen)}
                  selected={selectedGenres.includes(gen)}
                >
                  {gen}
                </Genre>
              );
            })}
          </div>
        </div>
        <SubmitBtn submitValue="Done" type="button" onClick={handleSubmit} />
      </div>
    </ModalContainer>
  );
}

const Genre = ({ children, selected, onClick }) => {
  const getSelectedStyle = () => {
    return selected
      ? "dark:bg-white dark:text-black bg-light-subtle text-white"
      : "text-primary dark:text-white";
  };
  return (
    <button
      onClick={onClick}
      className={
        getSelectedStyle() +
        " p-1 mr-3 border-2 rounded dark:border-dark-subtle border-light-subtle"
      }
    >
      {children}
    </button>
  );
};
