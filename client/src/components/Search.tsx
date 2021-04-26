import React, { useState } from "react";

interface SearchProps {
  handleSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ handleSearch }) => {
  const [query, setQuery] = useState("");
  return (
    <form
      className="search"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(query);
      }}
    >
      <input
        placeholder="Search with Redis pattern"
        onChange={(e) => setQuery(e.target.value)}
        type="text"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
