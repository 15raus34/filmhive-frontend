import React, { useEffect, useState } from "react";
import { getRelatedMovie } from "../api/movie";
import { useNotificaion } from "../hooks";
import MovieList from "./user/MovieList";

export default function RelatedMovies({ movieId }) {
  const [movies, setMovies] = useState([]);

  const { updateNotification } = useNotificaion();

  const fetchRelatedMovies = async () => {
    const { error, movies } = await getRelatedMovie(movieId);

    if (error) return updateNotification("error", error);
    setMovies([...movies]);
  };

  useEffect(() => {
    fetchRelatedMovies();
  }, [movieId]);

  return <MovieList title="Related Movies" movies={movies} />;
}
