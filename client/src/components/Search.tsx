import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CancelIcon from "@material-ui/icons/Cancel";

interface SearchProps {
  handleSearch: (query: string) => void;
  handleReset: () => void;
}

const Search: React.FC<SearchProps> = ({ handleSearch, handleReset }) => {
  const [query, setQuery] = useState("");

  const handleClearInput = () => {
    setQuery("");
    handleReset();
  };
  return (
    <>
      <form
        className="search"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
      >
        <button className="search__button" type="submit">
          <SearchIcon />
        </button>
        <input
          placeholder="Search with Redis pattern"
          onChange={(e) => setQuery(e.target.value)}
          className="search__input"
          type="text"
          value={query}
        />
        <CancelIcon className="search__icon" onClick={handleClearInput} />
      </form>
    </>
  );
};

export default Search;
