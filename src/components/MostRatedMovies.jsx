import React, { useEffect, useState } from "react";
import { getMostRatedMovies } from "../api/admin";
import { useNotificaion } from "../hooks";
import RatingStar from "./RatingStar";
import { convertReviewCount } from "../utils/helper";

export default function MostRatedMovies() {
  const [movies, setMovies] = useState([]);
  const { updateNotification } = useNotificaion();

  const fetchMostRatedMovies = async () => {
    const { error, movies } = await getMostRatedMovies();
    if (error) return updateNotification("error", error);
    setMovies([...movies]);
  };

  useEffect(() => {
    fetchMostRatedMovies();
  }, []);

  return (
    <div className="p-5 bg-white rounded shadow dark:bg-secondary">
      <h1 className="mb-2 text-2xl font-semibold text-primary dark:text-white">
        Most Rated Movies
      </h1>
      <ul className="space-y-3">
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <h1 className="font-semibold text-secondary dark:text-white">
                {movie.title}
              </h1>
              <div className="flex space-x-2">
                <RatingStar rating={movie.reviews?.ratingAvg} />
                <p className="text-light-subtle dark:text-dark-subtle">
                  {convertReviewCount(movie.reviews?.reviewCount)} Reviews
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
