import React from "react";
import ModalContainer from "./ModalContainer";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

export default function CastModal({
  casts = [],
  visible,
  onClose,
  onRemoverClick,
}) {
  return (
    <ModalContainer ignoreContainer visible={visible} onClose={onClose}>
      <div className="space-y-2 max-w-[45rem] max-h-[40rem] bg-white dark:bg-primary overflow-auto custom-scroll-bar p-2">
        {casts.map(({ profile, roleAs, leadActor }) => {
          const { name, avatar, id } = profile;
          return (
            <div
              key={id}
              className="flex space-x-3 bg-white rounded dark:bg-secondary drop-shadow-md"
            >
              <img
                className="object-cover w-16 h-16 rounded aspect-square"
                src={avatar}
                alt={name}
              />
              <div className="flex flex-col justify-between w-full">
                <div>
                  <p className="font-semibold dark:text-white text-primary">
                    {name}
                  </p>
                  <p className="text-sm dark:text-dark-subtle text-light-subtle">
                    {roleAs}
                  </p>
                  {leadActor && (
                    <AiOutlineCheck className="text-light-subtle dark:text-dark-subtle" />
                  )}
                </div>
              </div>
              <button
                onClick={() => onRemoverClick(id)}
                className="p-2 transition dark:text-white text-primary hover:opacity-80"
              >
                <AiOutlineClose />
              </button>
            </div>
          );
        })}
      </div>
    </ModalContainer>
  );
}
