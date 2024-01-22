import React, { useState } from "react";
import ModalContainer from "./ModalContainer";
import Actorform from "../form/Actorform";
import { createActor } from "../../api/actor";
import { useNotificaion } from "../../hooks";

export default function ActorModal({ visible, onClose }) {
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotificaion();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error } = await createActor(data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", "Actor Uploaded Successfully");
    onClose();
  };
  return (
    <ModalContainer onClose={onClose} visible={visible} ignoreContainer>
      <Actorform
        onSubmit={!busy ? handleSubmit : null}
        title="Create New Actor"
        btnTitle="Create"
        busy={busy}
      />
    </ModalContainer>
  );
}
