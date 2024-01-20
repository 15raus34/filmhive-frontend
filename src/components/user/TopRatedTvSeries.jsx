import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "../../api/movie";
import { useNotificaion } from "../../hooks";
import MovieList from "./MovieList";

export default function TopRatedTvSeries() {
  const [movies, setMovies] = useState([]);
  const { updateNotification } = useNotificaion();

  const fetchMovies = async (signal) => {
    const { error, movies } = await getTopRatedMovies("Web Series", signal);
    if (error) return updateNotification("error", error);
    setMovies([...movies]);
  };

  useEffect(() => {
    const ac = new AbortController();
    fetchMovies(ac.signal);

    return () => {
      ac.abort();
    };
  }, []);
  return <MovieList movies={movies} title="Viewers Choice (TV Series)" />;
}
