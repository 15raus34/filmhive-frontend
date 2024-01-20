import React, { useEffect, useState } from "react";
import Container from "../Container";
import CustomButtonLink from "../CustomButtonLink";
import RatingStar from "../RatingStar";
import { useParams } from "react-router-dom";
import { deleteReview, getReviewByMovie } from "../../api/review";
import { useAuth, useNotificaion } from "../../hooks";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import ConfirmModal from "../modals/ConfirmModal";
import NotFoundText from "../NotFoundText";
import EditRatingModal from "../modals/EditRatingModal";

const getNameInitial = (name = "") => {
  return name[0].toUpperCase();
};

export default function MovieReviews() {
  const [movieTitle, setMovieTitle] = useState("");
  const [reviews, setReviews] = useState([]);
  const [profileOwnerReviews, setProfileOwnerReviews] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [busy, setBusy] = useState(false);

  const { movieId } = useParams();
  const { updateNotification } = useNotificaion();
  const { authInfo } = useAuth();
  const profileId = authInfo.profile?.userID;

  const { isLoggedIn } = authInfo;

  const fetchReviews = async () => {
    const { error, movie } = await getReviewByMovie(movieId);
    if (error) return updateNotification("error", error);
    setReviews([...movie.reviews]);
    setMovieTitle(movie.title);
  };

  const findProfileOwnerReviews = () => {
    if (profileOwnerReviews) return setProfileOwnerReviews(null);

    const matched = reviews.find((review) => review.owner.id === profileId);
    if (!matched)
      return updateNotification("error", "You don't have any review");

    setProfileOwnerReviews(matched);
  };

  const handleDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteReview(profileOwnerReviews.id);
    setBusy(false);
    if (!error) return updateNotification("error", error);
    updateNotification("success", message);

    const updatedReviews = reviews.filter(
      (r) => r.id !== profileOwnerReviews.id
    );
    setReviews([...updatedReviews]);
    setProfileOwnerReviews(null);
    hideConfirmModal();
  };

  const handleOnEditClick = () => {
    const { id, content, rating } = profileOwnerReviews;
    setSelectedReview({ id, content, rating });
    setShowEditModal(true);
  };

  const handleOnReviewUpdate = (review) => {
    const updatedReview = {
      ...profileOwnerReviews,
      rating: review.rating,
      content: review.content,
    };
    setProfileOwnerReviews({ ...updatedReview });

    const newReviews = reviews.map((r) => {
      if (r.id === updatedReview.id) return updatedReview;
      return r;
    });
    setReviews([...newReviews]);
  };

  const displayConfirmModal = () => setShowConfirmModal(true);

  const hideConfirmModal = () => setShowConfirmModal(false);

  const hideEditModal = () => {
    setShowEditModal(false);
    setSelectedReview(null);
  };

  useEffect(() => {
    if (movieId) fetchReviews();
  }, [movieId]);

  return (
    <div className="min-h-screen pb-10 bg-white dark:bg-primary">
      <Container className="px-2 py-8 xl:px-0">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold dark:text-white text-secondary">
            <span className="font-normal text-light-subtle dark:text-dark-subtle">
              Reviews For :
            </span>
            {movieTitle}
          </h1>

          {isLoggedIn ? (
            <CustomButtonLink
              label={profileOwnerReviews ? "ViewAll" : "Find My Review"}
              onClick={findProfileOwnerReviews}
            />
          ) : null}
        </div>

        <NotFoundText visible={!reviews.length} text="No Reviews!" />

        {profileOwnerReviews ? (
          <div>
            <ReviewCard review={profileOwnerReviews} />
            <div className="flex p-3 space-x-3 text-xl dark:text-white text-primary">
              <button type="button" onClick={displayConfirmModal}>
                <BsTrash />
              </button>
              <button type="button" onClick={handleOnEditClick}>
                <BsPencilSquare />
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-3 space-y-3">
            {reviews.map((review) => {
              return <ReviewCard review={review} key={review.id} />;
            })}
          </div>
        )}
      </Container>
      <ConfirmModal
        visible={showConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={handleDeleteConfirm}
        busy={busy}
        title="Are Your Sure?"
        subTitle="This action will remove this review Permanently"
      />
      <EditRatingModal
        visible={showEditModal}
        initialState={selectedReview}
        onSuccess={handleOnReviewUpdate}
        onClose={hideEditModal}
      />
    </div>
  );
}

const ReviewCard = ({ review }) => {
  if (!review) return null;
  const { owner, content, rating } = review;
  return (
    <div className="flex space-x-3">
      <div className="flex items-center justify-center text-xl text-white rounded-full select-none w-14 h-14 bg-light-subtle dark:bg-dark-subtle">
        {getNameInitial(owner.name)}
      </div>
      <div className="">
        <h1 className="text-lg font-semibold dark:text-white text-secondary">
          {owner.name}
        </h1>
        <RatingStar rating={rating} />
        <p className="text-light-subtle dark:text-dark-subtle">{content}</p>
      </div>
    </div>
  );
};
