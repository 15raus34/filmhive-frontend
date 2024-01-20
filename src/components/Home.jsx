import React from "react";
import NotVerified from "./user/NotVerified";
import Container from "./Container";
import TopRatedMovies from "./user/TopRatedMovies";
import TopRatedWebSeries from "./user/TopRatedWebSeries";
import TopRatedTvSeries from "./user/TopRatedTvSeries";
import HeroSlideShow from "./user/HeroSlideShow";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-primary dark:text-white text-primary">
      <Container className="px-2 xl:p-0">
        <NotVerified />

        <HeroSlideShow />
        <div className="py-8 space-y-3">
          <TopRatedMovies />
          <TopRatedWebSeries />
          <TopRatedTvSeries />
        </div>
      </Container>
    </div>
  );
}
