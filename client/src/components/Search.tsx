import React, { useState } from "react";

interface SearchProps {
  handleSearch: (query: string) => void;
  handleReset: () => void;
}

const Search: React.FC<SearchProps> = ({ handleSearch, handleReset }) => {
  const [query, setQuery] = useState("");
  return (
    <>
      <form
        className="search"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
          setQuery("");
        }}
      >
        <input
          placeholder="Search with Redis pattern"
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          value={query}
        />
        <button type="submit">Search</button>
      </form>
      <button onClick={handleReset}>Reset</button>
    </>
  );
};

export default Search;
