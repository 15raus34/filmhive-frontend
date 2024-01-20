import React from "react";
import ModalContainer from "./ModalContainer";
import { ImSpinner5 } from "react-icons/im";

export default function ConfirmModal({
  visible,
  busy,
  title,
  subTitle,
  onConfirm,
  onCancel,
}) {
  const commonClass = "px-3 py-1 text-white rounded";
  return (
    <ModalContainer visible={visible} ignoreContainer>
      <div className="p-3 bg-white rounded dark:bg-primary">
        <h1 className="text-xl font-semibold text-red-400">{title}</h1>
        <p className="text-sm text-secondary dark:text-white">{subTitle}</p>
        <div className="flex items-center mt-3 space-x-3">
          {busy ? (
            <p className="flex items-center space-x-2 text-primary dark:text-white">
              <ImSpinner5 className="animate-spin" />
              <span>Please Wait</span>
            </p>
          ) : (
            <>
              <button
                type="button"
                className={commonClass + " bg-red-400"}
                onClick={onConfirm}
              >
                Confirm
              </button>
              <button
                type="button"
                className={commonClass + " bg-blue-400"}
                onClick={onCancel}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </ModalContainer>
  );
}
