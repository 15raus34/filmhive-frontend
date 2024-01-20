import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNotificaion } from "../../hooks";
import { uploadMovie, uploadTrailer } from "../../api/movie";
import MovieForm from "./MovieForm";
import ModalContainer from "../modals/ModalContainer";

export default function MovieUpload({ visible, onClose }) {
  const [videoSelected, setVideoSelected] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoUploaded, setVideoUpload] = useState(false);
  const [videoInfo, setVideoInfo] = useState({});
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotificaion();

  const resetState = () => {
    setVideoSelected(false);
    setVideoUpload(false);
    setUploadProgress(0);
    setVideoInfo({});
  };

  const handleUpload = async (data) => {
    const { error, url, public_id } = await uploadTrailer(
      data,
      setUploadProgress
    );
    if (error) return updateNotification("error", error);
    setVideoUpload(true);
    setVideoInfo({ url, public_id });
  };
  const handleChange = (file) => {
    const formData = new FormData();
    formData.append("video", file);
    setVideoSelected(true);
    handleUpload(formData);
  };
  const handleTypeError = (error) => {
    updateNotification("error", error);
  };

  const getUploadProgressValue = () => {
    if (!videoUploaded && uploadProgress >= 100) {
      return "Processing";
    }
    return `Uploading ${uploadProgress}`;
  };

  const handleSubmit = async (data) => {
    if (!videoInfo.url || !videoInfo.public_id)
      return updateNotification("error", "Trailer Is Missing");
    setBusy(true);
    data.append("trailer", JSON.stringify(videoInfo));
    const { error, movie } = await uploadMovie(data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", "Movie Uploaded Successfully!");
    resetState();
    onClose();
  };

  return (
    <ModalContainer visible={visible}>
      <div className="mb-5">
        <UploadProgress
          width={uploadProgress}
          message={getUploadProgressValue()}
          visible={!videoUploaded && videoSelected}
        />
      </div>
      {!videoSelected ? (
        <TrailerSelector
          visible={!videoSelected}
          handleChange={handleChange}
          onTypeError={handleTypeError}
        />
      ) : (
        <MovieForm busy={busy} onSubmit={!busy ? handleSubmit : null} />
      )}
    </ModalContainer>
  );
}

const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
  if (!visible) return null;
  return (
    <div className="flex items-center justify-center h-full">
      <FileUploader
        handleChange={handleChange}
        types={["mp4", "avi"]}
        onTypeError={onTypeError}
      >
        <label className="flex flex-col items-center justify-center w-48 h-48 border border-dashed rounded-full cursor-pointer dark:text-white dark:border-dark-subtle border-primary">
          <AiOutlineCloudUpload size={80} />
          <p>Drop Your File Here!</p>
        </label>
      </FileUploader>
    </div>
  );
};

const UploadProgress = ({ width, message, visible }) => {
  if (!visible) return null;
  return (
    <div className="p-2">
      <div className="p-3 bg-white rounded dark:bg-secondary drop-shadow-lg">
        <div className="relative h-3 dark:bg-dark-subtle bg-light-subtle">
          <div
            style={{ width: width + "%" }}
            className="absolute h-full dark:bg-white bg-secondary"
          ></div>
        </div>
        <p className="mt-1 font-semibold dark:text-dark-subtle text-primary animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
};
