import React, { useState } from "react";
import { BsTrash, BsPencilSquare, BsBoxArrowUpRight } from "react-icons/bs";
import { deleteMovie } from "../api/movie";
import { useNotificaion } from "../hooks";
import ConfirmModal from "./modals/ConfirmModal";
import UpdateMovie from "./modals/UpdateMovie";
import { getPoster } from "../utils/helper";

const MovieListItem = ({ movie, afterDelete, afterUpdate }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const { updateNotification } = useNotificaion();

  const handleOnDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteMovie(movie.id);
    setBusy(false);
    if (error) return updateNotification("error", error);
    hideConfirmModal(true);
    updateNotification("success", message);
    afterDelete(movie);
  };

  const handleOnUpdate = (movie) => {
    afterUpdate(movie);
    setShowUpdateModal(false);
  };

  const handleOnEditClick = () => {
    setSelectedMovieId(movie.id);
    setShowUpdateModal(true);
    // setSelectedMovieId(null);
  };

  const displayConfirmModal = () => setShowConfirmModal(true);

  const hideConfirmModal = () => setShowConfirmModal(false);

  return (
    <>
      <MovieCard
        movie={movie}
        onDeleteClick={displayConfirmModal}
        onEditClick={handleOnEditClick}
      />
      <div className="p-0">
        <ConfirmModal
          title="Are You Sure"
          subTitle="This action will remove this movie permanently!!"
          visible={showConfirmModal}
          onConfirm={handleOnDeleteConfirm}
          onCancel={hideConfirmModal}
          busy={busy}
        />
        <UpdateMovie
          movieId={selectedMovieId}
          visible={showUpdateModal}
          onSuccess={handleOnUpdate}
        />
      </div>
    </>
  );
};

const MovieCard = ({ movie, onDeleteClick, onEditClick, onOpenClick }) => {
  const { poster, title, genres = [], responsivePosters, status } = movie;
  return (
    <table className="w-full border-b ">
      <tbody>
        <tr>
          <td>
            <div className="w-24">
              <img
                className="w-full aspect-video"
                src={getPoster(responsivePosters) || poster}
                alt={title}
              />
            </div>
          </td>
          <td className="w-full pl-5">
            <div>
              <h1 className="text-lg font-semibold text-primary dark:text-white">
                {title}
              </h1>
              <div className="space-x-1">
                {genres.map((g, index) => {
                  return (
                    <span
                      key={g + index}
                      className="text-xs text-primary dark:text-white"
                    >
                      {g}
                    </span>
                  );
                })}
              </div>
            </div>
          </td>
          <td className="px-5">
            <p className="text-primary dark:text-white">{status}</p>
          </td>
          <td>
            <div className="flex items-center space-x-3 text-lg text-primary dark:text-white">
              <button onClick={onDeleteClick} type="button">
                <BsTrash />
              </button>
              <button onClick={onEditClick} type="button">
                <BsPencilSquare />
              </button>
              <button onClick={onOpenClick} type="button">
                <BsBoxArrowUpRight />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MovieListItem;
