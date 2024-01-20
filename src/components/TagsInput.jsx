import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function TagsInput({ name, value, onChange }) {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const input = useRef();
  const tagsInput = useRef();

  const handleOnChange = ({ target }) => {
    const { value } = target;
    if (value !== ",") setTag(value);
    onChange(tags);
  };

  const handlekeyDown = ({ key }) => {
    if (key === "," || key === "Enter") {
      if (!tag) return;
      if (tags.includes(tag)) return setTag("");
      setTags([...tags, tag]);
      setTag("");
    }
    if (key === "Backspace" && !tag && tags.length) {
      const newTags = tags.filter((_, index) => index !== tags.length - 1);
      setTags([...newTags]);
    }
  };

  const removeTag = (tagToRemove) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags([...newTags]);
  };

  const handleOnFocus = () => {
    tagsInput.current.classList.remove(
      "dark:border-dark-subtle",
      "border-light-subtle"
    );
    tagsInput.current.classList.add("dark:border-white", "border-primary");
  };
  const handleOnBlur = () => {
    tagsInput.current.classList.add(
      "dark:border-dark-subtle",
      "border-light-subtle"
    );
    tagsInput.current.classList.remove("dark:border-white", "border-primary");
  };

  useEffect(() => {
    if (value.length) setTags(value);
  }, [value]);

  useEffect(() => {
    input.current?.scrollIntoView(false);
  }, [tag]);
  return (
    <div>
      <div
        ref={tagsInput}
        onKeyDown={handlekeyDown}
        className="flex items-center w-full h-10 px-2 space-x-2 overflow-x-auto transition border-2 rounded dark:text-white custom-scroll-bar dark:border-dark-subtle border-light-subtle"
      >
        {tags.map((t) => {
          return (
            <Tag onClick={() => removeTag(t)} key={t}>
              {t}
            </Tag>
          );
        })}
        <input
          ref={input}
          id={name}
          type="text"
          className="flex-grow h-full bg-transparent outline-none"
          value={tag}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
      </div>
    </div>
  );
}

const Tag = ({ children, onClick }) => {
  return (
    <span className="flex items-center px-1 space-x-1 text-sm text-white rounded dark:bg-white bg-primary dark:text-primary whitespace-nowrap">
      {children}
      <button type="button" onClick={onClick}>
        <AiOutlineClose size={12} />
      </button>
    </span>
  );
};
