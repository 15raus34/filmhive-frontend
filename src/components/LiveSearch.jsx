import React, { forwardRef, useEffect, useRef, useState } from "react";
import { commanInputClasses } from "../utils/Theme";

export default function LiveSearch({
  name,
  value = "",
  placeholder = "",
  results = [],
  selectedResultStyle,
  resultContainerStyle,
  inputStyle,
  renderItem = null,
  onChange = null,
  onSelect = null,
}) {
  const [displaySearch, setDisplaySearch] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleOnFocus = () => {
    if (results.length) setDisplaySearch(true);
  };

  const closeSearchPanel = () => {
    setDisplaySearch(false);
    setFocusedIndex(-1);
  };
  const handleOnBlur = () => {
    setTimeout(() => {
      closeSearchPanel();
    }, 100);
  };

  const handleSelection = (selectedItem) => {
    if (selectedItem) {
      onSelect(selectedItem);
      closeSearchPanel();
    }
  };

  const handleOnkeyDown = ({ key }) => {
    const keys = ["ArrowUp", "ArrowDown", "Escape", "Enter"];
    let nextCount;
    if (!keys.includes(key)) return;

    if (key === "ArrowDown") {
      nextCount = (focusedIndex + 1) % results.length;
    }
    if (key === "ArrowUp") {
      nextCount = (focusedIndex + results.length - 1) % results.length;
    }
    if (key === "Enter") {
      return handleSelection(results[focusedIndex]);
    }
    if (key === "Escape") {
      closeSearchPanel();
    }
    setFocusedIndex(nextCount);
  };

  const getInputStyle = () => {
    return inputStyle
      ? inputStyle
      : commanInputClasses + "rounded border-2 p-1 text-lg";
  };

  useEffect(() => {
    if (results.length) return setDisplaySearch(true);
    setDisplaySearch(false);
  }, [results.length]);
  return (
    <div className="relative">
      <input
        type="text"
        name={name}
        id={name}
        className={getInputStyle()}
        placeholder={placeholder}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleOnkeyDown}
        value={value}
        onChange={onChange}
      />
      <SearchResult
        visible={displaySearch}
        results={results}
        focusedIndex={focusedIndex}
        onSelect={handleSelection}
        renderItem={renderItem}
        resultContainerStyle={resultContainerStyle}
        selectedResultStyle={selectedResultStyle}
      />
    </div>
  );
}

const SearchResult = ({
  visible,
  results = [],
  focusedIndex,
  onSelect,
  renderItem,
  resultContainerStyle,
  selectedResultStyle,
}) => {
  const resultContainer = useRef();
  useEffect(() => {
    resultContainer.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [focusedIndex]);

  if (!visible) return null;
  return (
    <div className="absolute left-0 right-0 z-50 p-2 mt-2 space-y-2 overflow-auto bg-white shadow-md top-10 dark:bg-secondary max-h-64 dark:text-white custom-scroll-bar">
      {results.map((result, index) => {
        const getSelectedClass = () => {
          return selectedResultStyle
            ? selectedResultStyle
            : "dark:bg-dark-subtle bg-light-subtle";
        };

        return (
          <ResultCard
            ref={index === focusedIndex ? resultContainer : null}
            key={index.toString()}
            item={result}
            renderItem={renderItem}
            resultContainerStyle={resultContainerStyle}
            selectedResultStyle={
              index === focusedIndex ? getSelectedClass() : ""
            }
            onClick={() => onSelect(result)}
          />
        );
      })}
    </div>
  );
};

const ResultCard = forwardRef((props, ref) => {
  const {
    item,
    renderItem,
    resultContainerStyle,
    selectedResultStyle,
    onClick,
  } = props;

  const getClasses = () => {
    if (resultContainerStyle)
      return resultContainerStyle + " " + selectedResultStyle;
    return (
      selectedResultStyle +
      " overflow-hidden transition rounded cursor-pointer dark:hover:bg-dark-subtle hover:bg-light-subtle"
    );
  };
  return (
    <div onClick={onClick} ref={ref} className={getClasses()}>
      {renderItem(item)}
    </div>
  );
});
