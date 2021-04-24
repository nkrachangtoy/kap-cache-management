import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { InputAdornment, TextField } from "@material-ui/core";

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
      <TextField
        variant="filled"
        placeholder="search with Redis query"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
