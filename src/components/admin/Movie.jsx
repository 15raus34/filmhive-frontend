import React, { useEffect, useState } from "react";
import MovieListItem from "../MovieListItem";
import { deleteMovie, getMovieForUpdate, getMovies } from "../../api/movie";
import { useMovies, useNotificaion } from "../../hooks";
import NextAndPreviousButton from "../NextAndPreviousButton";
import UpdateMovie from "../modals/UpdateMovie";
import ConfirmModal from "../modals/ConfirmModal";

let currentPageNo = 0;
let limit = 5;

export default function Movie() {
  const {
    fetchMovies,
    movies: newMovies,
    fetchNextPage,
    fetchPrevPage,
  } = useMovies();

  // const fetchMovies = async (pageNo) => {
  //   const { movies, error } = await getMovies(pageNo, limit);
  //   if (error) return updateNotification("error", error);
  //   if (!movies.length) {
  //     currentPageNo -= 1;
  //     return setReachedToEnd(true);
  //   }
  //   setMovies([...movies]);
  // };

  // const handleOnNextClick = () => {
  //   if (reachedToEnd) return;
  //   currentPageNo += 1;
  //   fetchMovies(currentPageNo);
  // };

  // const handleOnPreviousClick = () => {
  //   if (currentPageNo <= 0) return;
  //   if (reachedToEnd) setReachedToEnd(false);
  //   currentPageNo -= 1;
  //   fetchMovies(currentPageNo);
  // };

  // const handleOnEditClick = async ({ id }) => {
  //   const { error, movie } = await getMovieForUpdate(id);
  //   if (error) return updateNotification("error", error);
  //   setSelectedMovie(movie);
  //   setShowUpdateModal(true);
  // };

  // const handleOnDeleteClick = (movie) => {
  //   setSelectedMovie(movie);
  //   setShowConfirmModal(true);
  // };

  // const handleOnDeleteConfirm = async () => {
  //   setBusy(true);
  //   const { error, message } = await deleteMovie(selectedMovie.id);
  //   setBusy(false);
  //   if (error) return updateNotification("error", error);
  //   updateNotification("success", message);
  //   hideConfirmModal(true);
  //   fetchMovies(currentPageNo);
  // };

  // const handleOnUpdate = (movie) => {
  //   const updateMoviesList = movies.map((m) => {
  //     if (m.id === movie.id) return movie;
  //     return m;
  //   });
  //   setMovies([...updateMoviesList]);
  // };

  // const hideUpdateForm = () => setShowUpdateModal(false);

  // const hideConfirmModal = () => setShowConfirmModal(false);

  const handleUIUpdate = () => fetchMovies();

  useEffect(() => {
    fetchMovies(currentPageNo);
  }, []);

  return (
    <>
      <div className="p-5 space-y-3">
        {newMovies.map((movie) => {
          return (
            <MovieListItem
              movie={movie}
              key={movie.id}
              afterDelete={handleUIUpdate}
              afterUpdate={handleUIUpdate}
            />
          );
        })}
        {newMovies.length ? (
          <NextAndPreviousButton
            className="mt-5"
            onNextClick={fetchNextPage}
            onPreviousClick={fetchPrevPage}
          />
        ) : null}
      </div>
    </>
  );
}
