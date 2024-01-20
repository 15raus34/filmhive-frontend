import React, { useEffect, useState } from "react";
import TagsInput from "../TagsInput";
import { commanInputClasses } from "../../utils/Theme";
import SubmitBtn from "../form/SubmitBtn";
import { useNotificaion } from "../../hooks";
import WritersModal from "../modals/WritersModal";
import CastForm from "../form/CastForm";
import CastModal from "../modals/CastModal";
import PosterSelector from "../PosterSelector";
import GenresSelector from "../GenresSelector";
import GenresModal from "../modals/GenresModal";
import Selector from "../Selector";
import {
  languageOptions,
  statusOptions,
  typeOptions,
} from "../../utils/options";
import Label from "../Label";
import DirectorSelector from "../DirectorSelector";
import WriterSelector from "../WriterSelector";
import ViewAllBtn from "../ViewAllButton";
import LabelWithBadge from "../LabelWithBadge";
import { validateMovie } from "../../utils/validator";

const defaultMovieInfo = {
  title: "",
  storyLine: "",
  tags: [],
  cast: [],
  director: {},
  writers: [],
  releaseDate: "",
  poster: null,
  genres: [],
  type: "",
  language: "",
  status: "",
};

export default function MovieForm({
  onSubmit,
  busy,
  initialState,
  btnTitle = "Upload",
}) {
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });

  const [showWritersModal, setShowWritersModal] = useState(false);
  const [showCastModal, setShowCastModal] = useState(false);
  const [showGenresModal, setShowGenresModal] = useState(false);
  const [selectedPosterForUI, setSelectedPosterForUI] = useState("");

  const { updateNotification } = useNotificaion();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateMovie(movieInfo);
    if (error) updateNotification("error", error);

    // cast, tags, genres, writers
    const { tags, genres, cast, writers, director, poster } = movieInfo;

    const formData = new FormData();
    const finalMovieInfo = {
      ...movieInfo,
    };

    finalMovieInfo.tags = JSON.stringify(tags);
    finalMovieInfo.genres = JSON.stringify(genres);

    // {
    //   actor: { type: mongoose.Schema.Types.ObjectId, ref: "Actor" },
    //   roleAs: String,
    //   leadActor: Boolean,
    // },

    const finalCast = cast.map((c) => ({
      actor: c.profile.id,
      roleAs: c.roleAs,
      leadActor: c.leadActor,
    }));
    finalMovieInfo.cast = JSON.stringify(finalCast);

    if (writers.length) {
      const finalWriters = writers.map((w) => w.id);
      finalMovieInfo.writers = JSON.stringify(finalWriters);
    }

    if (director.id) finalMovieInfo.director = director.id;
    if (poster) finalMovieInfo.poster = poster;

    for (let key in finalMovieInfo) {
      formData.append(key, finalMovieInfo[key]);
    }

    onSubmit(formData);
  };

  const updatePosterForUI = (file) => {
    const urlForPoster = URL.createObjectURL(file);
    setSelectedPosterForUI(urlForPoster);
  };

  const handleChange = ({ target }) => {
    const { value, name, files } = target;
    if (name === "poster") {
      const poster = files[0];
      updatePosterForUI(poster);
      return setMovieInfo({ ...movieInfo, poster });
    }

    setMovieInfo({ ...movieInfo, [name]: value });
  };

  const updateTags = (tags) => {
    setMovieInfo({ ...movieInfo, tags });
  };

  const updateDirector = (profile) => {
    setMovieInfo({ ...movieInfo, director: profile });
  };

  const updateWriters = (profile) => {
    const { writers } = movieInfo;
    for (let writer of writers) {
      if (writer.id === profile.id) {
        return updateNotification(
          "warning",
          "This Profile is Already Selected!!"
        );
      }
    }
    setMovieInfo({ ...movieInfo, writers: [...writers, profile] });
  };

  const displayWritersModal = () => {
    setShowWritersModal(true);
  };

  const hideWriterModal = () => {
    setShowWritersModal(false);
  };

  const handleWriterRemove = (profileId) => {
    const { writers } = movieInfo;
    const newWriters = writers.filter(({ id }) => id !== profileId);
    if (!newWriters.length) hideWriterModal();
    setMovieInfo({ ...movieInfo, writers: [...newWriters] });
  };

  const updateCast = (castInfo) => {
    const { cast } = movieInfo;
    setMovieInfo({ ...movieInfo, cast: [...cast, castInfo] });
  };

  const displayCastModal = () => {
    setShowCastModal(true);
  };

  const hideCastModal = () => {
    setShowCastModal(false);
  };

  const handleCastRemove = (profileId) => {
    const { cast } = movieInfo;
    const newCasts = cast.filter(({ profile }) => profile.id !== profileId);
    if (!newCasts.length) hideCastModal();
    setMovieInfo({ ...movieInfo, cast: [...newCasts] });
  };

  const displayGenresModal = () => {
    setShowGenresModal(true);
  };

  const hideGenresModal = () => {
    setShowGenresModal(false);
  };

  const updateGenres = (genres) => {
    setMovieInfo({ ...movieInfo, genres });
  };
  useEffect(() => {
    if (initialState) {
      setMovieInfo({
        ...initialState,
        releaseDate: initialState.releaseDate.split("T")[0],
        poster: null,
      });
      setSelectedPosterForUI(initialState.poster);
    }
  }, [initialState]);
  const {
    title,
    storyLine,
    writers,
    cast,
    tags,
    genres,
    type,
    language,
    status,
    releaseDate,
  } = movieInfo;

  return (
    <>
      <div className="flex space-x-3">
        <div className="w-[70%] space-y-5">
          <div>
            <Label htmlFor="title">Title</Label>
            <input
              name="title"
              value={title}
              onChange={handleChange}
              id="title"
              type="text"
              className={
                commanInputClasses + "border-b-2 font-semibold text-xl"
              }
              placeholder="Mero Hajur"
            />
          </div>

          <div>
            <Label htmlFor="storyLine">Story Line</Label>
            <textarea
              name="storyLine"
              value={storyLine}
              onChange={handleChange}
              id="storyLine"
              className={commanInputClasses + "h-24 border-b-2 resize-none"}
              placeholder="Movie Story Line"
            ></textarea>
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <TagsInput value={tags} name="tags" onChange={updateTags} />
          </div>

          <DirectorSelector onSelect={updateDirector} />

          <div>
            <div className="flex justify-between">
              <LabelWithBadge htmlFor="writers" badge={writers.length}>
                Writers
              </LabelWithBadge>
              <ViewAllBtn
                onClick={displayWritersModal}
                visible={writers.length}
              >
                View All
              </ViewAllBtn>
            </div>
            <WriterSelector onSelect={updateWriters} />
          </div>

          <div>
            <div className="flex justify-between">
              <LabelWithBadge htmlFor="writers" badge={cast.length}>
                Add Cast & Crew
              </LabelWithBadge>
              <ViewAllBtn visible={cast.length} onClick={displayCastModal}>
                View All
              </ViewAllBtn>
            </div>
            <CastForm onSubmit={updateCast} />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="releaseDate">Release Date</Label>
            <input
              type="date"
              className={commanInputClasses + "border-2 rounded w-auto p-1"}
              onChange={handleChange}
              name="releaseDate"
              value={releaseDate}
            />
          </div>
          <SubmitBtn
            busy={busy}
            onClick={handleSubmit}
            submitValue={btnTitle}
            type="button"
          />
        </div>

        <div className="w-[30%] space-y-5">
          <PosterSelector
            name="poster"
            accept="image/jpg,image/png,image/jpeg"
            onChange={handleChange}
            selectedPoster={selectedPosterForUI}
            label="Select Poster"
          />
          <GenresSelector onClick={displayGenresModal} badge={genres.length} />
          <Selector
            onChange={handleChange}
            label="Type"
            options={typeOptions}
            name="type"
            value={type}
          />
          <Selector
            name="language"
            onChange={handleChange}
            label="Language"
            options={languageOptions}
            value={language}
          />
          <Selector
            name="status"
            onChange={handleChange}
            label="Status"
            options={statusOptions}
            value={status}
          />
        </div>
      </div>

      <WritersModal
        visible={showWritersModal}
        profiles={writers}
        onClose={hideWriterModal}
        onRemoverClick={handleWriterRemove}
      />
      <CastModal
        visible={showCastModal}
        casts={cast}
        onClose={hideCastModal}
        onRemoverClick={handleCastRemove}
      />
      <GenresModal
        visible={showGenresModal}
        onClose={hideGenresModal}
        onSubmit={updateGenres}
        previousGenres={genres}
      />
    </>
  );
}
