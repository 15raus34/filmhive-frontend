import React, { useState } from "react";
import LiveSearch from "../LiveSearch";
import { commanInputClasses } from "../../utils/Theme";
import { useNotificaion, useSearch } from "../../hooks";
import { renderItem } from "../../utils/helper";
import { searchActor } from "../../api/actor";

const defaultCastInfo = {
  profile: {},
  roleAs: "",
  leadActor: false,
};
export default function CastForm({ onSubmit }) {
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });
  const [profiles, setProfiles] = useState([]);

  const { updateNotification } = useNotificaion();
  const { handleSearch, resetSearch } = useSearch();

  const handleOnChange = ({ target }) => {
    const { checked, name, value } = target;
    if (name === "leadActor")
      return setCastInfo({ ...castInfo, leadActor: checked });

    setCastInfo({ ...castInfo, [name]: value });
  };

  const handleProfileSelect = (profile) => {
    setCastInfo({ ...castInfo, profile });
  };
  const handleSubmit = () => {
    const { profile, roleAs } = castInfo;
    if (!profile.name)
      return updateNotification("error", "Cast Profile is Missing");
    if (!roleAs) return updateNotification("error", "Cast Role is Missing");
    onSubmit(castInfo);
    setCastInfo({ ...defaultCastInfo, profile: { name: "" } });
    resetSearch();
    setProfiles([]);
  };

  const handleProfileChange = ({ target }) => {
    const { value } = target;
    const { profile } = castInfo;
    profile.name = value;
    setCastInfo({ ...castInfo, ...profile });
    handleSearch(searchActor, value, setProfiles);
  };
  const { profile, leadActor, roleAs } = castInfo;
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="leadActor"
        title="Set As Lead Actor"
        className="w-4 h-4"
        checked={leadActor}
        onChange={handleOnChange}
      />
      <LiveSearch
        placeholder="Search Profile"
        value={profile.name}
        results={profiles}
        onSelect={handleProfileSelect}
        renderItem={renderItem}
        onChange={handleProfileChange}
      />
      <span className="font-semibold dark:text-dark-subtle text-light-subtle">
        as
      </span>
      <div className="flex-grow">
        <input
          type="text"
          className={commanInputClasses + " rounded p-1 text-lg border-2"}
          placeholder="Role As"
          name="roleAs"
          value={roleAs}
          onChange={handleOnChange}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="p-1 text-white rounded dark:bg-white dark:text-primary bg-secondary"
      >
        Add
      </button>
    </div>
  );
}
