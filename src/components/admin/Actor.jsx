import React, { useState, useEffect } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { deleteActor, getActors, searchActor } from "../../api/actor";
import { useNotificaion, useSearch } from "../../hooks";
import NextAndPreviousButton from "../NextAndPreviousButton";
import UpdateActor from "../modals/UpdateActor";
import AppSearchForm from "../form/AppSearchForm";
import NotFoundText from "../NotFoundText";
import ConfirmModal from "../modals/ConfirmModal";

let currentPageNo = 0;
let limit = 16;

export default function Actor() {
  const [actors, setActors] = useState([]);
  const [results, setResults] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotificaion();
  const { handleSearch, resetSearch, resultNotFound } = useSearch();

  const fetchActor = async (pageNo) => {
    const { profiles, error } = await getActors(pageNo, limit);
    if (error) return updateNotification("error", error);

    if (!profiles.length) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }
    setActors([...profiles]);
  };

  const handleOnNextClick = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchActor(currentPageNo);
  };

  const handleOnPreviousClick = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);
    currentPageNo -= 1;
    fetchActor(currentPageNo);
  };

  const handleOnEditClick = (profile) => {
    setShowUpdateModal(true);
    setSelectedProfile(profile);
  };

  const hideUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleOnSearchSubmit = (value) => {
    handleSearch(searchActor, value, setResults);
  };

  const handleSearchFormReset = () => {
    resetSearch();
    setResults([]);
  };

  const handleOnUpdateActor = (profile) => {
    const updatedActor = actors.map((actor) => {
      if (profile.id == actor.id) {
        return profile;
      }
      return actor;
    });
    setActors([...updatedActor]);
  };

  const handleOnDeleteClick = (profile) => {
    setSelectedProfile(profile);
    setShowConfirmModal(true);
  };

  const handleOnDeleteConfirm = async () => {
    setBusy(true);
    console.log(selectedProfile.id);
    const { error, message } = await deleteActor(selectedProfile.id);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    hideConfirmModal();
    fetchActor(currentPageNo);
  };

  const hideConfirmModal = () => {
    setShowConfirmModal(false);
  };

  useEffect(() => {
    fetchActor(currentPageNo);
  }, []);

  return (
    <>
      <div className="p-5">
        <div className="flex justify-end mb-5">
          <AppSearchForm
            onSubmit={handleOnSearchSubmit}
            placeholder="Search Actor..."
            showRestIcon={results.length || resultNotFound}
            onReset={handleSearchFormReset}
          />
        </div>
        <NotFoundText visible={resultNotFound} />

        <div className="grid grid-cols-4 gap-5 p-5">
          {results.length || resultNotFound
            ? results.map((actor) => (
                <ActorProfile
                  profile={actor}
                  key={actor.id}
                  onEditClick={() => handleOnEditClick(actor)}
                  onDeleteClick={() => handleOnDeleteClick(actor)}
                />
              ))
            : actors.map((actor) => (
                <ActorProfile
                  profile={actor}
                  key={actor.id}
                  onEditClick={() => handleOnEditClick(actor)}
                  onDeleteClick={() => handleOnDeleteClick(actor)}
                />
              ))}
        </div>

        {!results.length && !resultNotFound ? (
          <NextAndPreviousButton
            className="mt-5"
            onNextClick={handleOnNextClick}
            onPreviousClick={handleOnPreviousClick}
          />
        ) : null}
      </div>

      <ConfirmModal
        title="Are You Sure?"
        subTitle="This Action will Remove this Profile Permanently"
        visible={showConfirmModal}
        busy={busy}
        onConfirm={handleOnDeleteConfirm}
        onCancel={hideConfirmModal}
      />

      <UpdateActor
        visible={showUpdateModal}
        onClose={hideUpdateModal}
        initialState={selectedProfile}
        onSuccess={handleOnUpdateActor}
      />
    </>
  );
}

const ActorProfile = ({ profile, onEditClick, onDeleteClick }) => {
  const acceptedNameLength = 15;
  const [showOptions, setShowOptions] = useState(false);

  const handleOnMouseEnter = () => {
    setShowOptions(true);
  };

  const handleOnMouseLeave = () => {
    setShowOptions(false);
  };

  if (!profile) return null;

  const getName = (name) => {
    if (name.length <= acceptedNameLength) return name;
    return name.substring(0, acceptedNameLength) + "..";
  };
  const { name, avatar, about = "" } = profile;

  return (
    <div className="h-20 overflow-hidden bg-white rounded shadow dark:bg-secondary">
      <div
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className="relative flex cursor-pointer"
      >
        <img
          src={avatar}
          alt={name}
          className="object-cover w-20 aspect-square"
        />
        <div className="px-2">
          <h1 className="text-xl font-semibold text-primary dark:text-white whitespace-nowrap">
            {getName(name)}
          </h1>
          <p className="text-primary dark:text-white opacity-70">
            {about.substring(0, 50)}
          </p>
        </div>
        <Options
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          visible={showOptions}
        />
      </div>
    </div>
  );
};

const Options = ({ visible, onDeleteClick, onEditClick }) => {
  if (!visible) return null;
  return (
    <div className="absolute inset-0 flex items-center justify-center space-x-5 bg-opacity-25 bg-primary backdrop-blur-sm">
      <button
        onClick={onDeleteClick}
        className="p-2 transition bg-white rounded-full text-pimary hover:opacity-80"
        type="button"
      >
        <BsTrash />
      </button>
      <button
        onClick={onEditClick}
        className="p-2 transition bg-white rounded-full text-pimary hover:opacity-80"
        type="button"
      >
        <BsPencilSquare />
      </button>
    </div>
  );
};
