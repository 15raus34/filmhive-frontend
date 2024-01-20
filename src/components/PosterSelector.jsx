import React from "react";

const commonPosterUI =
  "flex items-center justify-center border border-dashed rounded cursor-pointer aspect-video dark:border-dark-subtle border-light-subtle ";
export default function PosterSelector({
  name,
  accept,
  onChange,
  selectedPoster,
  className,
  label,
}) {
  return (
    <div>
      <input
        accept={accept}
        type="file"
        name={name}
        id={name}
        onChange={onChange}
        hidden
      />
      <label htmlFor={name}>
        {selectedPoster ? (
          <img
            className={commonPosterUI + " object-cover " + " " + className}
            src={selectedPoster}
            alt=""
          />
        ) : (
          <PosterUI label={label} className={className} />
        )}
      </label>
    </div>
  );
}

const PosterUI = ({ label, className }) => {
  return (
    <div className={commonPosterUI + " " + className}>
      <span className="dark:text-dark-subtle text-light-subtle">{label}</span>
    </div>
  );
};
