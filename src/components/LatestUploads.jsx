import React, { useEffect, useState } from "react";
import MovieListItem from "./MovieListItem";
import { deleteMovie, getMovieForUpdate, getMovies } from "../api/movie";
import { useMovies, useNotificaion } from "../hooks";
import ConfirmModal from "./modals/ConfirmModal";
import UpdateMovie from "./modals/UpdateMovie";

const pageNo = 0;
const limit = 5;

export default function LatestUploads() {
  const { fetchLatestUpload, latestUploads } = useMovies();

  const handleUIUpdate = () => fetchLatestUpload();

  useEffect(() => {
    fetchLatestUpload();
  }, []);
  return (
    <>
      <div className="col-span-2 p-5 bg-white rounded shadow dark:bg-secondary">
        <h1 className="mb-2 text-2xl font-semibold text-primary dark:text-white">
          Recent Uploads
        </h1>
        <div className="space-y-3">
          {latestUploads.map((movie) => {
            return (
              <MovieListItem
                movie={movie}
                key={movie.id}
                afterDelete={handleUIUpdate}
                afterUpdate={handleUIUpdate}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
