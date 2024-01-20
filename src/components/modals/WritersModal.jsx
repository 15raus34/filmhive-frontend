import React from "react";
import ModalContainer from "./ModalContainer";
import { AiOutlineClose } from "react-icons/ai";

export default function WritersModal({
  profiles = [],
  visible,
  onClose,
  onRemoverClick,
}) {
  return (
    <ModalContainer ignoreContainer visible={visible} onClose={onClose}>
      <div className="space-y-2 max-w-[45rem] max-h-[40rem] bg-white dark:bg-primary overflow-auto custom-scroll-bar p-2">
        {profiles.map(({ id, name, avatar }) => {
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
              <p className="w-full font-semibold dark:text-white text-primary">
                {name}
              </p>
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
