import React, { useState } from "react";
import { useNotificaion } from "../../hooks";
import ModalContainer from "./ModalContainer";
import Actorform from "../form/Actorform";
import { updateActor } from "../../api/actor";

export default function UpdateActor({
  visible,
  onClose,
  initialState,
  onSuccess,
}) {
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotificaion();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { actor, error } = await updateActor(initialState.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    onSuccess(actor);
    updateNotification("success", "Actor Updated Sucessfully");
    onClose();
  };
  return (
    <ModalContainer onClose={onClose} visible={visible} ignoreContainer>
      <Actorform
        onSubmit={!busy ? handleSubmit : null}
        title="Update Actor"
        btnTitle="Update"
        initialState={initialState}
        busy={busy}
      />
    </ModalContainer>
  );
}
