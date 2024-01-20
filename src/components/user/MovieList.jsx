import React from "react";
import { AiFillStar } from "react-icons/ai";
import GridContainer from "../GridContainer";
import { Link } from "react-router-dom";
import RatingStar from "../RatingStar";
import { getPoster } from "../../utils/helper";

const trimTitle = (title = "") => {
  if (title.length <= 20) return title;
  return title.substring(0, 20) + "...";
};
export default function MovieList({ title, movies = [] }) {
  if (!movies.length) return null;

  return (
    <div>
      {title ? (
        <h1 className="mb-5 text-2xl font-semibold dark:text-white text-secondary">
          {title}
        </h1>
      ) : null}
      <GridContainer>
        {movies.map((movie) => {
          return <ListItem movie={movie} key={movie.id} />;
        })}
      </GridContainer>
    </div>
  );
}

const ListItem = ({ movie }) => {
  const { id, title, poster, responsivePosters, reviews } = movie;
  return (
    <Link to={"/movie/" + id}>
      <img
        className="object-cover w-full aspect-video"
        src={getPoster(responsivePosters) || poster}
        alt={title}
      />
      <h1 className="text-lg dark:text-white text-secondary" title={title}>
        {trimTitle(title)}
      </h1>
      <RatingStar rating={reviews.ratingAvg} />
    </Link>
  );
};
