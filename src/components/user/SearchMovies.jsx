import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPublicMovies } from "../../api/movie";
import { useNotificaion } from "../../hooks";
import NotFoundText from "../NotFoundText";
import MovieList from "./MovieList";
import Container from "../Container";

export default function SearchMovies() {
  const [movies, setMovies] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("title");

  const { updateNotification } = useNotificaion();

  const searchMovies = async (val) => {
    const { error, results } = await getPublicMovies(val);
    if (error) return updateNotification("error", error);
    if (!results.length) {
      setResultNotFound(true);
      return setMovies([]);
    }
    setResultNotFound(false);
    setMovies([...results]);
  };

  useEffect(() => {
    if (query.trim()) searchMovies(query);
  }, [query]);

  return (
    <div className="min-h-screen py-8 bg-white dark:bg-primary dark:text-white text-primary">
      <Container className="px-2 xl:p-0">
        <NotFoundText title="Movie Not Found" visible={resultNotFound} />
        <MovieList movies={movies} />
      </Container>
    </div>
  );
}
