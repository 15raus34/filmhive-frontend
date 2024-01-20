import React, { useEffect, useState } from "react";
import ModalContainer from "./ModalContainer";
import MovieForm from "../admin/MovieForm";
import { getMovieForUpdate, updateMovie } from "../../api/movie";
import { useNotificaion } from "../../hooks";

export default function UpdateMovie({ visible, movieId, onSuccess }) {
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { updateNotification } = useNotificaion();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, movie, message } = await updateMovie(movieId, data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    onSuccess(movie);
  };

  const fetchMovieToUpdate = async () => {
    const { error, movie } = await getMovieForUpdate(movieId);
    if (error) return updateNotification("error", error);
    setSelectedMovie(movie);
    setReady(true);
  };

  useEffect(() => {
    if (movieId) fetchMovieToUpdate();
  }, [movieId]);

  return (
    <ModalContainer visible={visible}>
      {ready ? (
        <MovieForm
          initialState={selectedMovie}
          btnTitle="Update"
          onSubmit={!busy ? handleSubmit : null}
          busy={busy}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-xl first-letter:text-light-subtle dark:text-dark-subtle amimate-pulse">
            Please Wait...
          </p>
        </div>
      )}
    </ModalContainer>
  );
}
