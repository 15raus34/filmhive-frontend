import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/admin/Dashboard";
import Actor from "../components/admin/Actor";
import Movie from "../components/admin/Movie";
import NotFound from "../components/NotFound";
import Navbar from "../components/admin/Navbar";
import Header from "../components/admin/Header";
import MovieUpload from "../components/admin/MovieUpload";
import ActorModal from "../components/modals/ActorModal";
import SearchMovies from "../components/admin/SearchMovies";

export default function AdminNavigator() {
  const [showMovieUploadModal, setShowMovieUploadModal] = useState(false);
  const [showActorUploadModal, setShowActorUploadModal] = useState(false);

  const hideMovieUploadModal = () => {
    setShowMovieUploadModal(false);
  };
  const displayMovieUploadModal = () => {
    setShowMovieUploadModal(true);
  };
  const hideActorUploadModal = () => {
    setShowActorUploadModal(false);
  };
  const displayActorUploadModal = () => {
    setShowActorUploadModal(true);
  };
  return (
    <>
      <div className="flex bg-white dark:bg-primary">
        <Navbar />
        <div className="flex-1 max-w-screen-xl p-2">
          <Header
            onAddMovieClick={displayMovieUploadModal}
            onAddActorClick={displayActorUploadModal}
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/movies" element={<Movie />} />
            <Route path="/actors" element={<Actor />} />
            <Route path="/search" element={<SearchMovies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <MovieUpload
        visible={showMovieUploadModal}
        onClose={hideMovieUploadModal}
      />
      <ActorModal
        visible={showActorUploadModal}
        onClose={hideActorUploadModal}
      />
    </>
  );
}
