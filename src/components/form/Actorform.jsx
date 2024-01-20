import React, { useEffect, useState } from "react";
import { commanInputClasses } from "../../utils/Theme";
import PosterSelector from "../PosterSelector";
import Selector from "../Selector";
import { useNotificaion } from "../../hooks";
import { ImSpinner5 } from "react-icons/im";

const defaultActorInfo = {
  name: "",
  about: "",
  gender: "",
  avatar: null,
};
const genderOptions = [
  { title: "Male", value: "male" },
  { title: "Female", value: "female" },
  { title: "Other", value: "other" },
];

const validate = ({ name, gender, about, avatar }) => {
  if (!name.trim()) return { error: "Actor Name is Missing" };
  if (!about.trim()) return { error: "Actor Info is Missing" };
  if (!gender.trim()) return { error: "Actor Gender is Missing" };
  if (avatar && !avatar.type?.startsWith("image"))
    return { error: "Invalid Image / Avatar File!!" };
  return { error: null };
};
export default function Actorform({
  title,
  btnTitle,
  onSubmit,
  initialState,
  busy,
}) {
  const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo });
  const [selectedAvatarForUI, setSelectedAvatarForUI] = useState("");
  const { updateNotification } = useNotificaion();

  const updatePosterForUI = (file) => {
    const urlForPoster = URL.createObjectURL(file);
    setSelectedAvatarForUI(urlForPoster);
  };

  const handleChange = ({ target }) => {
    const { value, files, name } = target;
    if (name === "avatar") {
      const file = files[0];
      updatePosterForUI(file);
      return setActorInfo({ ...actorInfo, avatar: file });
    }
    setActorInfo({ ...actorInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validate(actorInfo);
    if (error) return updateNotification("error", error);

    const formData = new FormData();

    for (let key in actorInfo) {
      if (key) formData.append(key, actorInfo[key]);
    }
    onSubmit(formData);
  };

  useEffect(() => {
    if (initialState) {
      setActorInfo({ ...initialState, avatar: null });
      setSelectedAvatarForUI(initialState.avatar)
    }
  }, [initialState]);

  const { name, about, gender } = actorInfo;
  return (
    <form
      className="bg-white dark:bg-primary p-3 w-[35rem] rounded"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl semi-bold dark:text-white text-primary">
          {title}
        </h1>
        <button
          className="flex items-center justify-center w-24 h-8 text-white transition rounded bg-primary dark:bg-white dark:text-primary hover:opacity-80"
          type="submit"
        >
          {busy ? <ImSpinner5 className="animate-spin" /> : btnTitle}
        </button>
      </div>
      <div className="flex space-x-2">
        <PosterSelector
          accept="image/jpg,image/png,image/jpeg"
          selectedPoster={selectedAvatarForUI}
          className="object-cover rounded w-36 h-36 aspect-square"
          name="avatar"
          onChange={handleChange}
          label="Select Avatar"
        />
        <div className="flex flex-col flex-grow space-y-2">
          <input
            placeholder="Enter name"
            type="text"
            className={commanInputClasses + " border-b-2"}
            name="name"
            value={name}
            onChange={handleChange}
          />
          <textarea
            placeholder="Enter Name"
            className={commanInputClasses + " border-b-2 resize-none h-full"}
            name="about"
            value={about}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
      <div className="mt-3">
        <Selector
          name="gender"
          id="gender"
          options={genderOptions}
          label="Gender"
          value={gender}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}
