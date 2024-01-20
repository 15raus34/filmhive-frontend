import React, { useEffect, useState } from "react";
import ModalContainer from "./ModalContainer";
import { getActorProfile } from "../../api/actor";
import { useNotificaion } from "../../hooks";

export default function ProfileModal({ visible, profileId, onClose }) {
  const [profile, setProfile] = useState({});

  const { updateNotification } = useNotificaion();

  const fetchActorProfile = async () => {
    const { error, actor } = await getActorProfile(profileId);
    if (error) return updateNotification("error", error);
    setProfile(actor);
  };
  useEffect(() => {
    if (profileId) fetchActorProfile();
  }, [profileId]);

  const { name, avatar, about } = profile;
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <div className="flex flex-col items-center p-5 space-y-3 bg-white rounded w-72 dark:bg-primary">
        <img className="rounded-full w-28 h-28 " src={avatar} alt={name} />
        <h1 className="font-semibold dark:text-white text-primary">{name}</h1>
        <p className="dark:text-white text-primary">{about}</p>
      </div>
    </ModalContainer>
  );
}
