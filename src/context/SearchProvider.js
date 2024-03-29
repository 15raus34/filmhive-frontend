import React, { createContext, useState } from "react";
import { useNotificaion } from "../hooks";

export const SearchContext = createContext();

let timeoutId;
const debounce = (func, delay) => {
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

export default function SearchProvider({ children }) {
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);

  const { updateNotification } = useNotificaion();

  const search = async (method, query, updaterFun) => {
    const { error, results } = await method(query);
    if (error) return updateNotification("error", error);
    if (!results.length) {
      setResults([]);
      updaterFun && updaterFun([]);
      return setResultNotFound(true);
    }

    setResultNotFound(false);
    setResults(results);
    updaterFun && updaterFun([...results]);
  };

  const debounceFunction = debounce(search, 300);

  const handleSearch = (method, query, updaterFun) => {
    setSearching(true);
    query = query.trim();
    if (!query) {
      updaterFun && updaterFun([]);
      return resetSearch();
    }
    debounceFunction(method, query, updaterFun);
  };
  const resetSearch = () => {
    setSearching(false);
    setResultNotFound(false);
    setResults([]);
  };
  return (
    <SearchContext.Provider
      value={{ handleSearch, searching, resultNotFound, resetSearch, results }}
    >
      {children}
    </SearchContext.Provider>
  );
}
