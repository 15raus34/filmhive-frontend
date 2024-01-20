import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const addReview = async (movieId, reviewData) => {
  const token = getToken();
  try {
    const { data } = await client.post("/review/add/" + movieId, reviewData, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getReviewByMovie = async (movieId) => {
  try {
    const { data } = await client.get(
      "/review/get-reviews-by-movie/" + movieId
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const deleteReview = async (movieId) => {
  const token = getToken();
  try {
    const { data } = await client.delete("/review/" + movieId, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const updateReview = async (reviewId, reviewData) => {
  const token = getToken();
  try {
    const { data } = await client.patch("/review/" + reviewId, reviewData, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
