import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import SubmitBtn from "./SubmitBtn";

const createArray = (count) => {
  return new Array(count).fill("");
};

const ratings = createArray(10);

export default function RatingForm({ busy, onSubmit, initialState }) {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [content, setContent] = useState("");

  const handleMouseEnter = (index) => {
    const ratings = createArray(index + 1);
    setSelectedRatings([...ratings]);
  };

  const handleOnChange = ({ target }) => {
    const { value } = target;
    setContent(value);
  };

  const handleSubmit = () => {
    if (!selectedRatings.length) return;
    const data = {
      rating: selectedRatings.length,
      content,
    };

    onSubmit(data);
  };

  useEffect(() => {
    if (initialState) {
      setContent(initialState.content);
      setSelectedRatings(createArray(initialState.rating));
    }
  }, [initialState]);

  return (
    <div>
      <div className="p-5 space-y-3 bg-white rounded dark:bg-primary">
        <div className="relative flex items-center text-highlight dark:text-highlight-dark">
          <StarsOutlined ratings={ratings} onMouseEnter={handleMouseEnter} />
          <div className="absolute flex items-center -translate-y-1/2 top-1/2">
            <StarsFilled
              ratings={selectedRatings}
              onMouseEnter={handleMouseEnter}
            />
          </div>
        </div>
        <textarea
          value={content}
          onChange={handleOnChange}
          className="w-full h-24 p-2 bg-transparent border-2 rounded outline-none resize-none dark:text-white text-primary"
        ></textarea>
        <SubmitBtn
          busy={busy}
          onClick={handleSubmit}
          submitValue=" Rate This Movie"
        />
      </div>
    </div>
  );
}

const StarsOutlined = ({ ratings, onMouseEnter }) => {
  return ratings.map((_, index) => {
    return (
      <AiOutlineStar
        className="cursor-pointer"
        onMouseEnter={() => onMouseEnter(index)}
        key={index}
        size={24}
      />
    );
  });
};

const StarsFilled = ({ ratings, onMouseEnter }) => {
  return ratings.map((_, index) => {
    return (
      <AiFillStar
        className="cursor-pointer"
        onMouseEnter={() => onMouseEnter(index)}
        key={index}
        size={24}
      />
    );
  });
};
