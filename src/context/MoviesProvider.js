import React, { createContext, useState } from "react";
import { getMovies } from "../api/movie";
import { useNotificaion } from "../hooks";

export const MovieContext = createContext();

let currentPageNo = 0;
let limit = 5;

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [latestUploads, setLatestUploads] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);

  const { updateNotification } = useNotificaion();

  const fetchMovies = async (pageNo = currentPageNo) => {
    const { movies, error } = await getMovies(pageNo, limit);
    if (error) return updateNotification("error", error);
    if (!movies.length) {
      currentPageNo -= 1;
      return setReachedToEnd(true);
    }
    setMovies([...movies]);
  };

  const fetchLatestUpload = async (qty = 5) => {
    const { error, movies } = await getMovies(0, qty);
    if (error) return updateNotification("error", error);

    setLatestUploads([...movies]);
  };

  const fetchNextPage = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchMovies(currentPageNo);
  };

  const fetchPrevPage = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);
    currentPageNo -= 1;
    fetchMovies(currentPageNo);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        latestUploads,
        fetchLatestUpload,
        fetchMovies,
        fetchNextPage,
        fetchPrevPage,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
