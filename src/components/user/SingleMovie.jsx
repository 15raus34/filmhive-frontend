import React, { useEffect, useState } from "react";
import { getSingleMovie } from "../../api/movie";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth, useNotificaion } from "../../hooks";
import Container from "../Container";
import RatingStar from "../RatingStar";
import RelatedMovies from "../RelatedMovies";
import AddRatingModal from "../modals/AddRatingModal";
import CustomButtonLink from "../CustomButtonLink";
import ProfileModal from "../modals/ProfileModal";
import { convertReviewCount } from "../../utils/helper";

const convertDate = (date) => {
  return date.split("T")[0];
};

export default function SingleMovie() {
  const [ready, setReady] = useState(false);
  const [movie, setMovie] = useState({});
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState({});
  const [showRatingModal, setShowRatingModal] = useState(false);

  const { movieId } = useParams();
  const navigate = useNavigate();

  const { updateNotification } = useNotificaion();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(movieId);
    if (error) return updateNotification("error", error);
    setMovie(movie);
    setReady(true);
  };

  const handleOnRateMovie = () => {
    if (!isLoggedIn) return navigate("/auth/signin");
    setShowRatingModal(true);
  };

  const hideRatingModal = () => setShowRatingModal(false);

  const handleOnRatingSuccess = (reviews) => {
    setMovie({ ...movie, reviews: { ...reviews } });
  };

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
    setShowProfileModal(true);
  };

  const hideProfileModal = () => {
    setShowProfileModal(false);
    setSelectedProfile({});
  };

  useEffect(() => {
    if (movieId) fetchMovie();
  }, [movieId]);

  if (!ready)
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-primary">
        <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
          Please Wait
        </p>
      </div>
    );
  const {
    id,
    trailer,
    poster,
    title,
    storyLine,
    director = {},
    reviews = {},
    writers = [],
    cast = [],
    genres = [],
    language,
    releaseDate,
    type,
  } = movie;

  return (
    <div className="min-h-screen pb-10 bg-white dark:bg-primary">
      <Container className="px-2 xl:px-0">
        <video src={trailer} controls poster={poster}></video>
        <div className="flex justify-between">
          <h1 className="text-2xl xl:text-4xl lg:text-3xl text-highlight dark:text-highlight-dark">
            {title}
          </h1>
          <div className="flex flex-col items-end">
            <RatingStar rating={reviews.ratingAvg} />
            <CustomButtonLink
              label={convertReviewCount(reviews.reviewCount) + " Reviews"}
              onClick={() => navigate("/movie/reviews/" + id)}
            />
            <CustomButtonLink
              label="Rate The Movie"
              onClick={handleOnRateMovie}
            />
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-light-subtle dark:text-dark-subtle">{storyLine}</p>

          <ListWithLabel label="Director:">
            <CustomButtonLink
              label={director.name}
              onClick={() => handleProfileClick(director)}
            />
          </ListWithLabel>

          <ListWithLabel label="Writers:">
            {writers.map((w) => {
              return (
                <CustomButtonLink
                  key={w.id}
                  label={w.name}
                  onClick={() => handleProfileClick(w)}
                />
              );
            })}
          </ListWithLabel>
          {/* 
          <ListWithLabel label="Cast:">
            {cast.map(({ id, profile, leadActor }) => {
              return leadActor ? (
                <CustomButtonLink label={profile.name} key={id} />
              ) : null;
            })}
          </ListWithLabel> */}

          <ListWithLabel label="Language:">
            <CustomButtonLink label={language} clickAble={false} />
          </ListWithLabel>

          <ListWithLabel label="Release Date:">
            <CustomButtonLink
              label={convertDate(releaseDate)}
              clickAble={false}
            />
          </ListWithLabel>

          <ListWithLabel label="Genres:">
            {genres.map((g) => (
              <CustomButtonLink label={g} key={g} clickAble={false} />
            ))}
          </ListWithLabel>

          <ListWithLabel label="Type:">
            <CustomButtonLink label={type} clickAble={false} />
          </ListWithLabel>

          <CastProfiles cast={cast} />
          <RelatedMovies movieId={movieId} />
        </div>
      </Container>

      <ProfileModal
        visible={showProfileModal}
        onClose={hideProfileModal}
        profileId={selectedProfile.id}
      />
      <AddRatingModal
        visible={showRatingModal}
        onClose={hideRatingModal}
        onSuccess={handleOnRatingSuccess}
      />
    </div>
  );
}

const ListWithLabel = ({ children, label }) => {
  return (
    <div className="flex space-x-2">
      <p className="font-semibold text-light-subtle dark:text-dark-subtle">
        {label}
      </p>
      {children}
    </div>
  );
};

const CastProfiles = ({ cast }) => {
  return (
    <div className="">
      <h1 className="mb-2 text-2xl font-semibold text-light-subtle dark:text-dark-subtle">
        Cast
      </h1>
      <div className="flex flex-wrap space-x-4">
        {cast.map(({ id, profile, roleAs }) => {
          return (
            <div
              key={id}
              className="flex flex-col items-center mb-4 text-center basis-28"
            >
              <img
                className="object-cover w-24 h-24 rounded-full aspect-square"
                src={profile?.avatar}
                alt=""
              />
              <CustomButtonLink label={profile.name} />

              <span className="text-sm text-light-subtle dark:text-dark-subtle">
                as
              </span>
              <p className="text-light-subtle dark:text-dark-subtle">
                {roleAs}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
